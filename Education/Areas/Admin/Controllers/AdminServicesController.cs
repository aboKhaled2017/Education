using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Areas.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Education.Areas.Admin.Controllers
{
    //[Route("admin/[controller]/[action]")]
    public class AdminServicesController : mainController
    {
        public AdminServicesController(UserManager<ApplicationUser> userManager, 
        SignInManager<ApplicationUser> signInManager, EduEntities db,RoleManager<IdentityRole> roleManager) 
        : base(userManager, signInManager, db,roleManager)
        {
        }
        public bool isAdminUserExists(string UserName)
        {
            return _userManager.Users.Any(u => u.UserName == UserName);
        }
    }
}