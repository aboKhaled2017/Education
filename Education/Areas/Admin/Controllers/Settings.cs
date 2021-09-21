using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Education.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Education.Areas.Admin.Controllers {
    public class SettingsController : mainController {
        private readonly IHostingEnvironment _environment;
        public SettingsController (UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, EduEntities db,
            RoleManager<IdentityRole> roleManager, IHostingEnvironment environment) : base (userManager, signInManager, db, roleManager) {
            _environment = environment;
        }
        public IActionResult Index () {
            ViewBag.activeItem = "settingsPage";
            return View ();
        }
        #region //for images settings
        public async Task<IActionResult> ListBgImages () {
            var ImagesRecord = await _db.Settings.FirstOrDefaultAsync (s => s.Key == Variables.SettingsTable.BackgroundImages);
            string ImgStr = ImagesRecord == null ? null : ImagesRecord.Value;
            return Ok (ImgStr);
        }

        [HttpPost]
        private bool SaveBgImages (string value) {
            var ImagesRecord = _db.Settings.FindAsync (Variables.SettingsTable.BackgroundImages).Result;
            ImagesRecord.Value = value;
            _db.Entry (ImagesRecord).State = EntityState.Modified;
            return _db.SaveChangesAsync ().Result == 1;
        }

        [HttpPost]
        public ActionResult SaveImage (BgImageModel model) {

            if (model.Image == null || model.Image.Length == 0) {
                return BadRequest ();
            }
            string FileExtension = Path.GetExtension (model.Image.FileName);
            var supportedTypes = new string[] { "png", "jpg", "jpeg", "gif", "PNG", "JPG", "GIF", "JPEG" };
            var filepath = string.Empty;
            //not valid extension
            if (!supportedTypes.Contains (FileExtension.Replace (".", string.Empty))) return Forbid ();
            try { //delete old image if exists
                var file = model.Image.OpenReadStream ();
                if (file.Length > 0) {
                    filepath = Path.Combine (_environment.WebRootPath, Variables.BackgroundImagesPath) + model.Name;
                    using (FileStream fs = System.IO.File.Create (filepath)) {
                        file.CopyTo (fs);
                        fs.Flush ();

                    }
                    if (SaveBgImages (model.Value))
                        return Ok ();
                    else {
                        System.IO.File.Delete (filepath);
                        return BadRequest ();
                    }
                } else {
                    return BadRequest ();
                }
            } catch (Exception) {
                return BadRequest ();
            }
        }

        [HttpPost]
        public ActionResult DeleteImage (string[] imgsName, string value) {
            if (SaveBgImages (value)) {
                string filepath = string.Empty;
                foreach (var imgName in imgsName) {
                    filepath = Path.Combine (_environment.WebRootPath, Variables.BackgroundImagesPath) + imgName;
                    if (System.IO.File.Exists (filepath))
                        System.IO.File.Delete (filepath);
                }
                return Ok();
            }
            return BadRequest ();
        }
        #endregion
        #region //for membership settings
        public async Task<IActionResult> GetMembership () {
            var data = await _db.Teachers.FirstOrDefaultAsync ();
            return Ok (new { name = data.Name, title = data.Title });
        }

        [HttpPost]
        public async Task<IActionResult> SaveMembership (TeacherModel model) {
            if (ModelState.IsValid) {
                var teacher = await _db.Teachers.FirstOrDefaultAsync ();
                teacher.Name = model.Name;
                teacher.Title = model.Title;
                _db.Entry (teacher).State = EntityState.Modified;
                await _db.SaveChangesAsync ();
                return Ok ();
            }
            return BadRequest (new { message = "من فضلك ادخل بيانات صحيحة" });
        }
        #endregion
    }
}