"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../global/helperDome");
var CommonFuncs = /** @class */ (function () {
    function CommonFuncs() {
    }
    CommonFuncs.UploadCourseImage = function (BtnHandler, ImgHandler, id, OnDone) {
        var formData;
        $.UploadImage(BtnHandler, function (file, ext) {
            var Name = "" + Date.now() + ext;
            formData = new FormData();
            formData.append("Id", id);
            formData.append("Name", Name);
            formData.append("Image", file);
            var icon = BtnHandler.find('i:eq(0)');
            icon.switchPendingState(true, "fa-picture-o");
            $.ajax({
                url: CommonFuncs.EditCourseImgBgUrl,
                data: formData,
                method: "POST",
                processData: false,
                cache: false,
                contentType: false
            })
                .done(function () {
                ImgHandler.prop('src', "" + CommonFuncs.CardImgBaseUrl + Name);
                $.notify({
                    message: "تم حفظ الصورة بنجاح"
                });
                OnDone("" + CommonFuncs.CardImgBaseUrl + Name);
            })
                .always(function () {
                icon.switchPendingState(false);
            })
                .catch(function (e) {
                $.notify({
                    message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
                });
            });
        });
    };
    CommonFuncs.GetCoursesUrl = '/Admin/Courses/List';
    CommonFuncs.DeleteCourseUrl = '/Admin/Courses/Delete';
    CommonFuncs.EditCourseUrl = '/Admin/Courses/Edit';
    CommonFuncs.EditCourseImgBgUrl = '/Admin/Courses/EditBgImg';
    CommonFuncs.CardImgBaseUrl = '/images/admin/courses/';
    CommonFuncs.GetVideosListOfCourse = '/Admin/VideoTutorial/List';
    CommonFuncs.AddVideoUrl = '/Admin/VideoTutorial/Add';
    CommonFuncs.DeleteVideoUrl = '/Admin/VideoTutorial/Delete';
    CommonFuncs.EditVideoUrl = '/Admin/VideoTutorial/Edit';
    return CommonFuncs;
}());
exports.CommonFuncs = CommonFuncs;
//# sourceMappingURL=SharedCoursesFuncs.js.map