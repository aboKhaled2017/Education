using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Education.Data;
using Education.Data.Entities;
using Education.Models.ManageViewModels;
using Education.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Education.Student.Controllers
{
    public class TutorialController : mainController
    {
        public TutorialController(IConfiguration config, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender emailSender, EduEntities context) : base(config, roleManager, userManager, signInManager, emailSender, context)
        {
        }
        private IQueryable<CategoryData> getSubCategoryData(Guid mainCategoryId)
        {
            return _db.Categories.Where(c => c.SuperId == mainCategoryId).Enabled()
            .Select(c => new CategoryData
            {
                Id = c.Id,
                Name = c.Name,
            });
        }
        public async Task<IActionResult> MainCategory(Guid id, string mainCategory)
        {
            var data = (id == Guid.Empty)
            ? _db.Categories.Where(c => c.SuperId == Guid.Empty).Enabled()
            .Select(c => new CategoryData
            {
                Id = c.Id,
                Name = c.Name,
            })
            : getSubCategoryData(id);
            return View(await data.ToListAsync());
        }
        public async Task<IActionResult> SubCategory(Guid id, string mainCategory, string subCategory)
        {
            if (await _db.Categories.AnyAsync(c => c.Id == id && c.IsEnabled && c.SubCategories.Count > 0))
                await MainCategory(id, subCategory);
            if (!await _db.Categories.AnyAsync(c => c.Id == id && c.IsEnabled))
                return RedirectToLocal("/");
            var subjects = await _db.Courses.Where(c => c.CategoryId == id)
            .Select(c => new Tuple<Guid, string>(
                c.Id,
                c.Name
            )).ToListAsync();
            var data = new Tuple<Guid, string, string, List<Tuple<Guid, string>>>
            (id, mainCategory, subCategory, subjects);
            return View(data);
        }
        public async Task<IActionResult> Subject(Guid id, string mainCategory, string subCategory, string subjId, string subject)
        {
            if (id == null) id = Guid.Empty;
            await _db.SaveChangesAsync();
            return View();
        }
    }
}