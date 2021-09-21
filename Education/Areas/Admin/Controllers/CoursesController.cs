using System;
using System.Linq;
using System.Threading.Tasks;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Education.Admin.Data;
using Education.Admin.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Education.Areas.Admin.Controllers
{
    public class CoursesController : mainController
    {
        private readonly IHostingEnvironment _environment;
        public CoursesController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EduEntities db, RoleManager<IdentityRole> roleManager,
            IHostingEnvironment environment
        ) : base(userManager, signInManager, db, roleManager)
        {
            _environment = environment;
        }

        [TempData]
        public string ErrorMessage { get; set; }
        public IActionResult Index()
        {
            ViewBag.activeItem = "coursesPage";
            return View();
        }
        public async Task<ActionResult> List()
        {
            try
            {
                var data = await _db.Courses
                    //.Include(c=>c.Category)
                    //.Include(c=>c.VideosTutorials)
                    .Select(c => new CourseData
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        Period = c.Period,
                        CostOfCourse = c.CostOfCourse,
                        StartDateOfBegin = c.StartDateOfBegin,
                        CategoryId = c.CategoryId,
                        CategoryName = (c.Category.SuperId == null) ? c.Category.Name : c.Category.SuperCategory.Name + "/" + c.Category.Name,
                        backgroundImgSrc = c.backgroundImgSrc,
                        IsOpened = c.IsOpened,
                        VideosCount = c.VideosTutorials.Count
                    }).ToListAsync();
                return Ok(data);
            }
            catch
            {
                return BadRequest("error");
            }
        }
        [HttpPost]
        public ActionResult Add(CourseModel course)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_db.Courses.Any(c => c.Name == course.Name))
                        return BadRequest(new { Result = "ERROR", Message = "هذا الكورس موجود بالفعل" });
                    course.Id = Guid.NewGuid();
                    _db.Courses.Add(MapCourse(course));
                    _db.SaveChanges();
                    return Ok(course.Id);
                }
                return BadRequest(new
                {
                    Result = "ERROR",
                    Message = "من فضلك ادخل بيانات صحيحة",
                    c = ModelState.ErrorCount,
                    b = ModelState.Values
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Edit(CourseModel course)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Course updatable = MapCourse(course);
                    _db.Entry(updatable).State = EntityState.Modified;
                    await _db.SaveChangesAsync();
                    return Ok();
                }
                return BadRequest(new
                {
                    Result = "ERROR",
                    Message = "من فضلك ادخل بيانات صحيحة",
                    c = ModelState.ErrorCount,
                    b = ModelState.Values
                });
            }
            catch
            {
                return BadRequest("error");
            }
        }
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                Course course = await _db.Courses
                    .Include(c => c.VideosTutorials)
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (course.VideosTutorials.Count() > 0)
                {
                    _db.VideoTutorials.RemoveRange(_db.VideoTutorials.Where(c => c.CourseId == id));
                    await _db.SaveChangesAsync();
                }
                _db.Courses.Remove(course);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest("error");
            }
        }
        public async Task<ActionResult> Content(Guid id)
        {
            ViewBag.activeItem = "coursesPage";
            try
            {
                var data = await _db.Courses
                    //.Include(c=>c.Category)
                    //.Include(c=>c.VideosTutorials)
                    .Select(c => new CourseData
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        Period = c.Period,
                        CostOfCourse = c.CostOfCourse,
                        StartDateOfBegin = c.StartDateOfBegin,
                        CategoryId = c.CategoryId,
                        CategoryName = (c.Category.SuperId == null) ? c.Category.Name : c.Category.SuperCategory.Name + "/" + c.Category.Name,
                        backgroundImgSrc = c.backgroundImgSrc,
                        IsOpened = c.IsOpened,
                        VideosCount = c.VideosTutorials.Count
                    }).FirstOrDefaultAsync(c => c.Id == id);
                return View(data);
            }
            catch
            {
                return BadRequest("error");
            }
        }
        [HttpPost]
        private bool SaveEditedBgImages(Guid Id, string ImgSrc)
        {
            var Course = _db.Courses.FindAsync(Id).Result;
            Course.backgroundImgSrc = ImgSrc;
            _db.Entry(Course).State = EntityState.Modified;
            return _db.SaveChangesAsync().Result == 1;
        }
        [HttpPost]
        public ActionResult EditBgImg(CourseBgImage Model)
        {
            if (Model == null || Model.Image == null || Model.Image.Length == 0)
            {
                return Ok(new { message = "image not valid", o = Model });
            }
            try
            { //delete old image if exists
                string FileExtension = Path.GetExtension(Model.Image.FileName);
                var supportedTypes = new string[] { "png", "jpg", "jpeg", "gif", "PNG", "JPG", "GIF", "JPEG" };
                var filepath = string.Empty;
                //not valid extension
                if (!supportedTypes.Contains(FileExtension.Replace(".", string.Empty))) return Forbid("not vallid extension");
                var file = Model.Image.OpenReadStream();
                if (file.Length > 0)
                {
                    filepath = Path.Combine(_environment.WebRootPath, Variables.BackgroundCoursesImagesPath) + Model.Name;
                    using (FileStream fs = System.IO.File.Create(filepath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();

                    }
                    if (SaveEditedBgImages(Model.Id, Model.Name))
                        return Ok();
                    else
                    {
                        System.IO.File.Delete(filepath);
                        return BadRequest("database error");
                    }
                }
                else
                {
                    return BadRequest("image file not valid");
                }
            }
            catch
            {
                return BadRequest();
            }
        }
        private Course MapCourse(CourseModel model)
        {
            return new Course
            {
                Id = model.Id,
                Name = model.Name,
                Description = model.Description,
                IsOpened = model.IsOpened,
                CostOfCourse = model.CostOfCourse,
                Period = model.Period,
                StartDateOfBegin = model.StartDateOfBegin,
                CategoryId = model.CategoryId,
                TeacherId = _teacherId,
            };
        }
    }
}