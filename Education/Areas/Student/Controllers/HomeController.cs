using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Education.Areas.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Education.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using IEmailSender = Education.Services.IEmailSender;
using System.Security.Claims;
using Education.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace Education.Student.Controllers
{
    [AllowAnonymous]
    public class HomeController : mainController
    {
        public HomeController(IConfiguration config, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender emailSender, EduEntities db) : base(config, roleManager, userManager, signInManager, emailSender, db) { }

        public IActionResult Index(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] StudentRegisterModel model, [FromQuery] string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (returnUrl == null) returnUrl = "/Profile";
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.email, Email = model.email };
                var addingUser = await _userManager.CreateAsync(user, model.password);
                if (addingUser.Succeeded)
                {
                    var result = await _userManager.AddToRoleAsync(user, "Student");
                    if (result.Succeeded)
                    {
                        try
                        {
                            var newStudent = new Education.Data.Entities.Student
                            {
                                Id = user.Id,
                                Fname = model.fname,
                                Lname = model.lname
                            };
                            _db.Students.Add(newStudent);
                            var addingStudentResult = await _db.SaveChangesAsync();
                            if (addingStudentResult > 0)
                            {
                                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                                var callbackUrl = Url.EmailConfirmationLink(user.Id.ToString(), code, Request.Scheme);
                                await _emailSender.SendEmailConfirmationAsync(model.email, callbackUrl);
                                var registerResult = _SignStudentInAsync(user, model.email, model.RememberMe, newStudent.Fname);
                                registerResult.Wait();
                                if (registerResult.IsCompletedSuccessfully)
                                    return Json(returnUrl);
                                else return BadRequest("فشلت عملية التسجيل من فضلك حاول ثانية");
                            }
                            else
                            {
                                await _userManager.DeleteAsync(user);
                            }
                        }
                        catch
                        {
                            await _userManager.DeleteAsync(user);

                        }

                    }
                }

            }
            return BadRequest("فشلت عملية التسجيل من فضلك ادخل بيانات صحيحة");
        }

        public JsonResult isEmailExists(string email)
        {
            return Json(!_userManager.Users.Any(u => u.Email == email));
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] StudentLoginModel model, [FromQuery] string returnUrl = null)
        {
            if (returnUrl == null) returnUrl = "/Profile";
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {

                try
                {
                    var probs = new AuthenticationProperties
                    {
                        IsPersistent = model.RememberMe,
                        ExpiresUtc = DateTimeOffset.Now.AddYears(900)
                    };

                    var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == model.email);
                    if (appUser != null)
                    {
                        bool isValidPassword = await _userManager.CheckPasswordAsync(appUser, model.password);
                        if (isValidPassword)
                        {
                            string claimName = (await _db.Students.Select(s => new { s.Fname, s.Id }).FirstAsync(s => s.Id == appUser.Id)).Fname;
                            var signResult = _SignStudentInAsync(appUser, model.email, model.RememberMe, claimName);
                            signResult.Wait();
                            if (signResult.IsCompletedSuccessfully)
                                return Json(returnUrl);
                            else return BadRequest("فشلت عملية الدخول من فضلك حاول ثانية");
                        }

                    }
                    return BadRequest("اسم المستخدم او كلمة السر غير صحيحة");
                }
                catch
                {
                    return BadRequest("لقد فشلت عملية الدخول");
                }
            }
            // If we got this far, something failed, redisplay form
            return BadRequest("لقد فشلت عملية الدخول");
        }

        [Authorize(policy: "StudentPolicy")]
        public async Task<IActionResult> Logout()
        {
            await LogoutStudent();
            return Redirect("/");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "Index" : "Error");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}