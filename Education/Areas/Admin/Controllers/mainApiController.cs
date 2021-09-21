using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Areas.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Education.Areas.Admin.Controllers
{
    [Authorize(policy: "AdminPolicy")]
    [Route("AdminApi/[controller]")]
    [ApiController]
    public class mainApiController : ControllerBase
    {
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly SignInManager<ApplicationUser> _signInManager;
        protected readonly EduEntities _db;
        private AdminUser _currentuser;
        public mainApiController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EduEntities db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _db = db;
        }
        public AdminUser getCurrentUser()
        {
            if (_currentuser != null) return _currentuser;
            var data = _userManager.Users
                .Select(u => new { Id = u.Id, UserName = u.UserName })
                .Single(u => u.UserName == _signInManager.Context.User.Identity.Name);
            _currentuser = new AdminUser { Id =data.Id, UserName = data.UserName };
            return _currentuser;
        }
    }
}