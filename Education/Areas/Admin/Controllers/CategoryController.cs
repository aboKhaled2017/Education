using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Education.Areas.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Education.Models.AccountViewModels;
using Education.Student.Controllers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Education.Variables;
using Education.Admin.Data;

namespace Education.Areas.Admin.Controllers {
    public class CategoryController : mainController {
        public CategoryController (UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EduEntities db, RoleManager<IdentityRole> roleManager
        ) : base (userManager, signInManager, db, roleManager) { }

        [TempData]
        public string ErrorMessage { get; set; }
        public IActionResult Index () {
            ViewBag.activeItem = "categoryPage";
            return View ();
        }
        public ActionResult List (int start = 0, int length = 10, int draw = 1) {
            var search_value_query = Request.Query.FirstOrDefault (q => q.Key == "search[value]");
            var search_value = search_value_query.Key != null ? search_value_query.Value.ToString () : null;
            byte OrderColumnNumber = byte.Parse (Request.Query.FirstOrDefault (q => q.Key == "order[0][column]").Value);
            Direction direction = (Request.Query.FirstOrDefault (q => q.Key == "order[0][dir]").Value == "asc") ?
                Direction.ASC : Direction.Desc;
            var data = _db.Categories
                .mainCategories ()
                .Orderable (OrderColumnNumber, direction)
                .Search (search_value)
                .Select (c => new CategoryData { Id = c.Id, Name = c.Name, IsEnabled = c.IsEnabled, subs = c.SubCategories.Count });
            int total = data.Count ();
            data = data.Skip (start)
                .Take (length);
            try {
                return Json (new {
                    Data = data,
                        RecordsTotal = total,
                        Draw = draw,
                        RecordsFiltered = total
                });
            } catch {
                return BadRequest ("error");
            }
        }
        public ActionResult subCategories (Guid id, int start = 0, int length = 10) {

            var category = _db.Categories.Include (c => c.SubCategories).FirstOrDefault (c => c.Id == id);
            foreach (var item in category.SubCategories) {
                _db.Entry (item).Collection (x => x.SubCategories).Load ();
            }
            var data = category
                .SubCategories
                .Select (c => new CategoryData {
                    Id = c.Id,
                        Name = c.Name,
                        IsEnabled = c.IsEnabled,
                        subs = c.SubCategories.Count
                })
                .Skip (start)
                .Take (length);
            try {
                return Json (new { data = data });
            } catch {
                return BadRequest ("error");
            }
        }

        [HttpPost]
        public ActionResult Add ([Bind (include: "IsEnabled,Name,SuperId")] Category category) {
            if (category.SuperId == Guid.Empty) category.SuperId = null;
            try {
                if (ModelState.IsValid) {
                    if (_db.Categories.Any (c => c.Name == category.Name))
                        return BadRequest (new { Result = "ERROR", Message = "هذا القسم موجود بالفعل" });
                    category.Id = Guid.NewGuid ();
                    _db.Categories.Add (category);
                    _db.SaveChanges ();
                    return Ok (new {
                        id = category.Id,
                            name = category.Name,
                            superId = category.SuperId,
                            isEnabled = category.IsEnabled,
                            subs = category.SubCategories.Count
                    });
                }
                return NotFound (new { Result = "ERROR", Message = "من فضلك ادخل بيانات صحيحة" });
            } catch {
                return BadRequest ("error");
            }
        }

        [HttpPost]
        public ActionResult Update ([Bind (include: "Id,Name")] Category category) {
            try {
                if (ModelState.IsValid) {
                    Category updatable = _db.Categories.Find (category.Id);
                    if (updatable == null)
                        return NotFound ("error");
                    updatable.Name = category.Name;
                    _db.Entry (updatable).State = EntityState.Modified;
                    _db.SaveChanges ();
                    return Ok ();
                }
                return NotFound ("error");
            } catch {
                return BadRequest ();
            }
        }
        public async Task<ActionResult> Delete (Guid id) {
            try {
                Category category = await _db.Categories.Include (c => c.SubCategories).FirstOrDefaultAsync (c => c.Id == id);
                if (category.SubCategories.Count () > 0) {
                    _db.Categories.RemoveRange (_db.Categories.Where (c => c.SuperId == id));
                    await _db.SaveChangesAsync ();
                }
                _db.Categories.Remove (category);
                await _db.SaveChangesAsync ();
                return Ok ();
            } catch {
                return BadRequest ("error");
            }
        }

        [HttpPost]
        public ActionResult ToggleActive (Guid id) {
            try {
                Category category = _db.Categories.Find (id);
                category.IsEnabled = !category.IsEnabled;
                _db.Entry (category).State = EntityState.Modified;
                _db.SaveChanges ();
                return Ok ();
            } catch {
                return BadRequest ("error");
            }
        }
        public ActionResult ItemsList () {
            List<SelectCategoryItem> data = _db.Categories.Include (c => c.SubCategories)
                .Select (c => new SelectCategoryItem {
                    Id = c.Id,
                        Name = c.Name,
                        SuperId = c.SuperId,
                        subs = c.SubCategories
                        .Select (subCategories => subCategories.Id).ToList ()
                })
                .ToList ();
            try {
                return Ok (new { data = data });
            } catch {
                return BadRequest ();
            }
        }
    }
}