using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Education.Areas.Admin.Controllers
{
    public class HomeController : mainController
    {
        private ILogger<Startup> _logger;
        public HomeController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, 
            EduEntities db,RoleManager<IdentityRole> roleManager,
            ILogger<Startup> logger)
         : base(userManager, signInManager, db,roleManager)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            _logger.LogError("at index");
            return View();
        }
    }
}