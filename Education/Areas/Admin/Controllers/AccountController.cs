using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Education.Areas.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using static Education.Variables;

namespace Education.Areas.Admin.Controllers
{
    public class AccountController : mainController
    {
        private ILogger<Startup> _logger;
        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EduEntities db,
            RoleManager<IdentityRole> roleManager,
            ILogger<Startup> logger
            ) : base(userManager, signInManager, db, roleManager)
        {
            _logger = logger;
        }
        [TempData]
        public string ErrorMessage { get; set; }
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(AdminLoginModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == model.Username);
                // var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);
                if (appUser != null 
                           && await _userManager.CheckPasswordAsync(appUser, model.Password)
                           &&await _userManager.IsInRoleAsync(appUser,"Admin"))
                {
                    var signInResult = _SignAdminInAsync(appUser, model.Username, model.RememberMe, model.Username);
                    signInResult.Wait();
                    if (signInResult.IsCompletedSuccessfully)
                    {
                        return RedirectToAction("Index","Home");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "حدثت مشكلة اثناء عملية الدخول من فضلك حاول مرة اخرى");
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "اسم المستخدم او كلمة السر غير صحيحة");
                    return View(model);
                }
            }
            // If we got this far, something failed, redisplay form
            return View(model);
        }
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            _logger.LogError("logouteed");
            await LogoutAdmin();
            //_logger.LogInformation("User logged out.");
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }
        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion
        public IActionResult MyAccount()
        {
            ViewBag.activeItem = "accountPage";
            return View(model: getCurrentAdminerModel());
        }
        [HttpPut]
        public async Task<IActionResult> UpdateName(string Name)
        {
            ViewBag.activeItem = "accountPage";
            try
            {
                string id = getCurrentUser().Id;
                var adminer = _db.Admins.Single(a => a.Id == id);
                adminer.Name = Name;
                _db.Entry(adminer).State = EntityState.Modified;
                var result = await _db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok();
                }

                else
                {
                    return BadRequest(ResquestStatus.Error);
                }
            }
            catch
            {
                return BadRequest(ResquestStatus.Error);
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateAccount([FromBody]AdminerAccountModel adminer)
        {
            ViewBag.activeItem = "accountPage";
            try
            {
                var id = getCurrentUser().Id;
                var UpdatedUserAccount = _userManager.Users.Single(u => u.Id == id.ToString());
                UpdatedUserAccount.UserName = adminer.UserName;
                UpdatedUserAccount.PasswordHash = _userManager.PasswordHasher.HashPassword(UpdatedUserAccount, adminer.password);
                var result = await _userManager.UpdateAsync(UpdatedUserAccount);
                if (result.Succeeded)
                {
                    await LogoutAdmin();
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch
            {
                return BadRequest(ResquestStatus.Error);
            }
        }

        [HttpPost]
        //[Route("/admin/Account/IsAdminUserNotFounded",Name="IsAdminUserNotFounded")]
        public IActionResult isUserNotNameExists(string UserName)
        {
            var result = !_userManager.Users.Any(u => u.UserName == UserName);
            return Json(true);
        }
    }
}