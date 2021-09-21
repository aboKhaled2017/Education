using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using IEmailSender = Education.Services.IEmailSender;

namespace Education.Student.Controllers {
    [Authorize (policy: "StudentPolicy")]
    [Area ("Student")]
    public class mainController : Controller {
        protected readonly IConfiguration _config;
        protected readonly EduEntities _db;
        protected readonly RoleManager<IdentityRole> _rolesManager;
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly SignInManager<ApplicationUser> _signInManager;
        protected readonly IEmailSender _emailSender;
        protected StudentAccount _currentStudent;
        protected StudentCookieData _studentCookieData;
        public mainController (
            IConfiguration config,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            EduEntities context) {
            this._config = config;
            this._db = context;
            this._rolesManager = roleManager;
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._emailSender = emailSender;
        }
        protected async Task<ApplicationUser> _currentuser () {
            return await _userManager.Users
                .FirstOrDefaultAsync (
                    u => u.UserName ==
                    User.Claims.FirstOrDefault (c => c.Type == ClaimTypes.NameIdentifier).Value);
        }
        public async Task<StudentAccount> getCurrentStudent () {
            if (_currentStudent != null) return _currentStudent;
            IQueryable<StudentIdentifier> studentIdentifiers = _userManager.Users
                .Select (u => new StudentIdentifier { id = u.Id, email = u.Email });
            string NameIdentifier = ClaimTypes.NameIdentifier;
            var identifier = await studentIdentifiers
                .FirstOrDefaultAsync (u => u.email == User.Claims.FirstOrDefault (c => c.Type == NameIdentifier).Value);
            var studentId =identifier.id;
            var student = _db.Students.First (s => s.Id == studentId);
            return new StudentAccount {
                Id = student.Id,
                    fname = student.Fname,
                    lname = student.Lname,
                    email = identifier.email
            };
        }
        protected IActionResult RedirectToLocal (string returnUrl) {
            if (Url.IsLocalUrl (returnUrl)) {
                return Redirect (returnUrl);
            } else {
                return RedirectToAction (nameof (HomeController.Index), "Home");
            }
        }
        protected void AddErrors (IdentityResult result) {
            foreach (var error in result.Errors) {
                ModelState.AddModelError (string.Empty, error.Description);
            }
        }
        protected ClaimsPrincipal StudentPrincipals (string IdentifierName, string name, string id) {
            var userData = JsonConvert.SerializeObject (new StudentCookieData { Id = id });
            var claims = new List<Claim> {
                new Claim (ClaimTypes.NameIdentifier, IdentifierName),
                new Claim (ClaimTypes.Name, name),
                new Claim (ClaimTypes.CookiePath, "/"),
                new Claim (ClaimTypes.Role, "Student"),
                new Claim (ClaimTypes.UserData, userData)

            };
            var identity = new ClaimsIdentity (claims, "StudentScheme");
            var principals = new ClaimsPrincipal (identity);
            return principals;
        }
        protected Task _SignStudentInAsync (ApplicationUser user, string email, bool isPresistent, string name) {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true

            var probs = new AuthenticationProperties {
                IsPersistent = isPresistent,
                ExpiresUtc = DateTimeOffset.Now.AddYears (1000)
            };
            /*await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions
            .SignInAsync(HttpContext, "StudentScheme", StudentPrincipals(email, name, id), probs);*/
            return HttpContext.SignInAsync ("StudentScheme", StudentPrincipals (email, name, user.Id), probs);
        }
        protected async Task _SignStudentInAgainAsync (ApplicationUser user) {
            var UserPrinicpals = new ClaimsPrincipal (User.Identity);
            var probs = new AuthenticationProperties {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.Now.AddYears (1000)
            };
            await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions
                .SignInAsync (HttpContext, "StudentScheme", UserPrinicpals, probs);
        }
        protected async Task LogoutStudent () {
            /* await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions
            .SignOutAsync(HttpContext, "StudentScheme");*/

            await HttpContext.SignOutAsync ("StudentScheme");
        }
        protected StudentCookieData StudentCookieData () {
            if (_studentCookieData != null) return _studentCookieData;
            string userDataCookieString = User.Claims.FirstOrDefault (c => c.Type == ClaimTypes.UserData).Value;
            StudentCookieData userData = JsonConvert.DeserializeObject<StudentCookieData> (userDataCookieString);
            _studentCookieData = userData;
            return userData;
        }
    }
}