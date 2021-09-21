using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Education.Admin.Data;
using Education.Admin.Models;
using Education.Data;
using Education.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Education.Areas.Admin.Controllers {
    //[RequestSizeLimit(1677721600)] //limit to particular size
    [DisableRequestSizeLimit]
    public class VideoTutorialController : mainController {
        private readonly IHostingEnvironment _environment;

        #region constructor
        public VideoTutorialController (UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EduEntities db, RoleManager<IdentityRole> roleManager,
            IHostingEnvironment environment
        ) : base (userManager, signInManager, db, roleManager) {
            _environment = environment;
        }
        #endregion
        #region Public methods
        public async Task<ActionResult> List (Guid id, int start = 0, int length = 10, int draw = 1) {
            try {
                var data = _db.VideoTutorials
                    .Where (v => v.CourseId == id)
                    .OrderBy (v => v.Number)
                    .Select (c => new {
                        c.Id,
                            c.Date,
                            c.Description,
                            c.Duration,
                            c.IsYoutube,
                            c.Number,
                            c.Title,
                            c.Url,
                    });
                return Ok (new {
                    Data = await data.Skip (start).Take (length).ToListAsync (),
                        RecordsTotal = data.Count (),
                        Draw = draw,
                        RecordsFiltered = data.Count ()
                });;
            } catch {
                return BadRequest ("error");
            }
        }

        [HttpPost]
        //[DisableFormValueModelBinding]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Add (VideoModel videoModel) {

            try {
                /* FormValueProvider formModel;
                string targetFilePath = Path.GetTempFileName();
                var tempPath = Path.Combine(_environment.WebRootPath, Variables.VideoTutorialsPath) + "\\file.mp4";
                using (var stream = System.IO.File.Create(targetFilePath))
                {
                    formModel = await Request.StreamFile(stream);
                }
                VideoModel videoModel = new VideoModel();
                var bindingSuccessful = await TryUpdateModelAsync(videoModel, prefix: "", valueProvider: formModel);
                */
                if (videoModel.IsYoutube) ModelState.Remove (nameof (videoModel.Video));
                else ModelState.Remove (nameof (videoModel.Url));
                if (ModelState.IsValid) {
                    videoModel.Id = Guid.NewGuid ();
                    string message, videoPath = string.Empty;
                    if (!videoModel.IsYoutube) {
                        bool isVideoSaved = SaveVideo (videoModel, out message, out videoPath);
                        if (isVideoSaved) videoModel.Url = videoPath;
                        else {
                            return BadRequest (message);
                        }
                    }
                    var video = MapVideoTutorial (videoModel);
                    _db.VideoTutorials.Add (video);
                    int result = await _db.SaveChangesAsync ();
                    if (result > 0)
                        return Ok (video);
                    else {
                        DeleteFile (videoPath);
                        return BadRequest ("جدثت مشكلة اثناء حفظ الفديو لدى السيرفر");
                    }
                }
                return BadRequest (new {
                    Result = "ERROR",
                        Message = "من فضلك ادخل بيانات صحيحة",
                        c = ModelState.ErrorCount,
                        b = ModelState.Values
                });
            } catch (Exception ex) {
                return BadRequest ();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Edit (VideoModel_Edit model) {
            var videoModel = MapToVideoModel (model);
            try {
                ModelState.Remove (nameof (model.Url_Edit));
                if (ModelState.IsValid) {
                    var oldNeededData = await _db.VideoTutorials
                        .Where(v=>v.Id== videoModel.Id)
                        .Select(d=>new {d.Url,d.Duration})
                        .FirstOrDefaultAsync();
                    string message, videoPath = string.Empty;
                    if (model.IsVideoChanged && !videoModel.IsYoutube) { //video is changed
                        bool isVideoSaved = SaveVideo (videoModel, out message, out videoPath);
                        if (isVideoSaved) videoModel.Url = videoPath;
                        else {
                            return BadRequest (message);
                        }
                    } else { //video not changed
                        videoModel.Url = oldNeededData.Url;
                        videoModel.Duration = oldNeededData.Duration;
                    }
                    var videoTutorial = MapVideoTutorial (videoModel);
                    _db.Entry (videoTutorial).State = EntityState.Modified;
                    int result = await _db.SaveChangesAsync ();
                    if (result > 0)
                        return Ok (videoTutorial);
                    else {
                        return BadRequest ("جدثت مشكلة اثناء حفظ الفديو لدى السيرفر");
                    }
                }
                return BadRequest (new {
                    Result = "ERROR",
                        Message = "من فضلك ادخل بيانات صحيحة",
                        c = ModelState.ErrorCount,
                        b = ModelState.Values
                });
            } catch (Exception e){
                return BadRequest (e);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Delete (Guid id) {
            try {
                VideoTutorial videoTutorial = await _db.VideoTutorials.FindAsync (id);
                if (videoTutorial != null) {
                    _db.VideoTutorials.Remove (videoTutorial);
                    await _db.SaveChangesAsync ();
                }
                return Ok ();
            } catch {
                return BadRequest (new { message = "لا يمكن حذف هذا الفديو" });
            }
        }
        public JsonResult isVideoNumberExists (short VideoNumber, Guid CourseId) {
            bool isExists = !_db.VideoTutorials.Where (v => v.CourseId == CourseId).Any (u => u.Number == VideoNumber);
            return Json (isExists);
        }
        public JsonResult isVideoNumberExists_Edit (short VideoNumber_Edit, Guid CourseId_Edit, Guid Id_Edit) {
            return Json (!_db.VideoTutorials.Where (v => v.CourseId == CourseId_Edit).Any (u => u.Number == VideoNumber_Edit && u.Id != Id_Edit));
        }
        public JsonResult isVideoTitleExists (string title, Guid CourseId) {
            return Json (!_db.VideoTutorials.Where (v => v.CourseId == CourseId).Any (u => u.Title == title));
        }
        public JsonResult isVideoTitleExists_Edit (string title_Edit, Guid CourseId_Edit, Guid Id_Edit) {
            return Json (!_db.VideoTutorials.Where (v => v.CourseId == CourseId_Edit).Any (u => u.Title == title_Edit && u.Id != Id_Edit));
        }
        #endregion
        #region private methods
        private VideoModel MapToVideoModel (VideoModel_Edit model) {
            return new VideoModel {
                    Id = model.Id_Edit,
                    CourseId = model.CourseId_Edit,
                    Description = model.Description_Edit,
                    Title = model.Title_Edit,
                    Duration = model.Duration_Edit,
                    IsYoutube = model.IsYoutube_Edit,
                    Url = model.Url_Edit,
                    Video = model.Video_Edit,
                    VideoNumber = model.VideoNumber_Edit
            };
        }
        private VideoTutorial MapVideoTutorial (VideoModel model) {
            return new VideoTutorial {
                Id = model.Id,
                    Title = model.Title,
                    Description = model.Description,
                    IsYoutube = model.IsYoutube,
                    Duration = model.Duration,
                    Number = model.VideoNumber,
                    Date = DateTime.Now,
                    CourseId = model.CourseId,
                    Url = model.Url
            };
        }

        [HttpPost]
        private bool SaveVideo (VideoModel Model, out string message, out string filepath) {
            filepath = string.Empty;
            message = string.Empty;
            if (Model.Video == null || Model.Video.Length <= 0) {
                message = "من فضلك قم بتحميل ملف الفديو";
                return false;
            }
            try { //delete old image if exists
                string FileExtension = Path.GetExtension (Model.Video.FileName);

                //not valid extension
                if (!Model.Video.ContentType.Contains ("video/")) {
                    message = "هذا النوع من الملفات غير مدعوم";
                    return false;
                }
                var file = Model.Video.OpenReadStream ();
                filepath = Path.Combine (_environment.WebRootPath, Variables.VideoTutorialsPath) + $"{Model.Id}{FileExtension}";
                DeleteFile (filepath);
                using (FileStream fs = System.IO.File.Create (filepath)) {
                    file.CopyToAsync (fs).Wait ();
                    fs.Flush ();
                }
                filepath = $@"\{Variables.VideoTutorialsPath}{Model.Id}{FileExtension}";
                return true;
            } catch {
                message = "حدثت مشكلة اثناء حفظ الفديو,من فضلك حاولمرة اخرى";
                return false;
            }
        }
        private void DeleteFile (string filePath) {
            if (System.IO.File.Exists (filePath))
                System.IO.File.Delete (filePath);
        }
        #endregion
    }
}