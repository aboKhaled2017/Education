using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Education.Areas.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Education.Areas.Admin.Controllers
{
    [Authorize(policy:"AdminPolicy")]
    [Area("Admin")]
   public class mainController : Controller
    {
        protected readonly RoleManager<IdentityRole> _roleManager;
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly SignInManager<ApplicationUser> _signInManager;
        protected readonly EduEntities _db;
        private AdminUser _currentuser;
        protected static string _teacherId;
        private AdminerModel _currentAdminerModel;
        public mainController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EduEntities db,RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _db = db;
            _roleManager=roleManager;
            setTeacherId();
        }
        private void setTeacherId()
        {
            _teacherId = _db.Teachers.FirstOrDefault().Id;
        }
        public AdminUser getCurrentUser()
        {
            if (_currentuser != null) return _currentuser;
            var data = _userManager.Users
                .Select(u => new { Id = u.Id, UserName = u.UserName })
                .Single(u => u.UserName ==_signInManager.Context.User.Identity.Name);
            _currentuser=new AdminUser { Id = data.Id, UserName = data.UserName };
            return _currentuser;
        }
        public AdminerModel getCurrentAdminerModel()
        {
            if (_currentAdminerModel != null) return _currentAdminerModel;
            var userId = getCurrentUser().Id;
            string UserName = _db.Admins.Where(a => a.Id == userId).Select(a => a.Name).First();          
            _currentAdminerModel = new AdminerModel
            { Id =getCurrentUser().Id, UserName = getCurrentUser().UserName,Name=UserName};
            return _currentAdminerModel;
        }
        protected ClaimsPrincipal AdminPrincipals(string IdentifierName, string name, string id)
        {
            var userData = JsonConvert.SerializeObject(new { Id = id });
            var claims = new List<Claim> {
                new Claim (ClaimTypes.NameIdentifier, IdentifierName),
                new Claim (ClaimTypes.Name, name),
                new Claim (ClaimTypes.CookiePath, "/admin"),
                new Claim (ClaimTypes.Role, "Admin"),
                new Claim (ClaimTypes.UserData, userData)

            };
            var identity = new ClaimsIdentity(claims, "AdminScheme");
            var principals = new ClaimsPrincipal(identity);
            return principals;
        }
        protected  Task _SignAdminInAsync(ApplicationUser user, string username, bool isPresistent, string name)
        {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var probs = new AuthenticationProperties
            {
                IsPersistent = isPresistent,
                ExpiresUtc = DateTimeOffset.Now.AddYears(1000)
            };
            /*await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions
            .SignInAsync(HttpContext, "StudentScheme", StudentPrincipals(email, name, id), probs);*/
            LogoutAdmin().Wait();
            return HttpContext.SignInAsync("AdminScheme", AdminPrincipals(username, name, user.Id), probs);
        }
        protected async Task _SignAdminInAgainAsync(ApplicationUser user)
        {
            var UserPrinicpals = new ClaimsPrincipal(User.Identity);
            var probs = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.Now.AddYears(1000)
            };
            await HttpContext.SignInAsync("AdminScheme", UserPrinicpals, probs);
        }
        protected async Task LogoutAdmin()
        {
            /* await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions
            .SignOutAsync(HttpContext, "StudentScheme");*/

            await HttpContext.SignOutAsync("AdminScheme");
        }
    }

 
}