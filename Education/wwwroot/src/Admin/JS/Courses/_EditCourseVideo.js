"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _MainObjectOperForCourse_1 = require("./_MainObjectOperForCourse");
var SharedCoursesFuncs_1 = require("./SharedCoursesFuncs");
var EditCourseVideoOper = /** @class */ (function () {
    function EditCourseVideoOper() {
    }
    EditCourseVideoOper.OnVideoInputChange = function (e) {
        _MainObjectOperForCourse_1.MainObjectOperForCourse.OnVideoInputChange.bind(_MainObjectOperForCourse_1.MainObjectOperForCourse, e)();
        this.isVideoChangedInp.val('true');
    };
    EditCourseVideoOper.HandleOnVideoUploadBtnClicked = function () {
        this.VideoUploadBtn.change(this.OnVideoInputChange.bind(this));
    };
    ;
    EditCourseVideoOper.GetEditVideoFormData = function () {
        var formData = {};
        formData.Id_Edit = $("#Id_Edit").val();
        formData.CourseId_Edit = _MainObjectOperForCourse_1.MainObjectOperForCourse.courseId;
        formData.IsVideoChanged = this.isVideoChangedInp.val();
        formData.Description_Edit = $("#Description_Edit").val();
        formData.Title_Edit = $("#Title_Edit").val();
        formData.Url_Edit = $("#Url_Edit").val();
        formData.Video_Edit = _MainObjectOperForCourse_1.MainObjectOperForCourse.LastUpoladedFile;
        formData.VideoNumber_Edit = $("#VideoNumber_Edit").val();
        formData.IsYoutube_Edit = this.youtubeChoiceRadioBtn.is(":checked")
            ? true
            : false;
        if (formData.IsYoutube_Edit)
            formData.Video_Edit = null;
        else
            formData.Url_Edit = "";
        return formData;
    };
    EditCourseVideoOper.GetEditVideoForm = function (formData) {
        var form = $('#EditVideo').show();
        form.find('#Id_Edit').val(formData.id).prop('');
        form.find('#CourseId_Edit').val(_MainObjectOperForCourse_1.MainObjectOperForCourse.courseId);
        form.find('#Title_Edit').val(formData.title);
        form.find('#Description_Edit').val(formData.description);
        form.find('#Duration_Edit').val(formData.duration);
        form.find('#VideoNumber_Edit').val(formData.number);
        form.find('#Video_Edit').change(_MainObjectOperForCourse_1.MainObjectOperForCourse.OnVideoInputChange.bind(_MainObjectOperForCourse_1.MainObjectOperForCourse));
        if (formData.isYoutube) {
            form.find('#youtubeChoice').prop('checked', 'checked');
            form.find('#notyoutubeChoice').removeProp('checked');
        }
        else {
            form.find('#notyoutubeChoice').prop('checked', 'checked');
            form.find('#youtubeChoice').removeProp('checked');
        }
        return form;
    };
    EditCourseVideoOper.ResetVideoInput = function () {
        this.isVideoChangedInp.val('false');
        _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.Model['VideoTextTitle'] = "قم باختيار ملف";
    };
    EditCourseVideoOper.SendData = function (btn, data, duration, executeFuncOnDone) {
        var formData = new FormData();
        formData.append("Id_Edit", data.Id_Edit);
        formData.append("CourseId_Edit", data.CourseId_Edit);
        formData.append("IsVideoChanged", data.IsVideoChanged);
        formData.append("Title_Edit", data.Title_Edit);
        formData.append("Description_Edit", data.Description_Edit);
        formData.append("IsYoutube_Edit", data.IsYoutube_Edit);
        formData.append("VideoNumber_Edit", data.VideoNumber_Edit);
        formData.append("Url_Edit", data.Url_Edit);
        formData.append("Duration_Edit", duration);
        formData.append("Video_Edit", data.Video_Edit);
        btn.pendingState(true, "fa-check-circle-o");
        $.ajax({
            url: SharedCoursesFuncs_1.CommonFuncs.EditVideoUrl,
            data: formData,
            method: "POST",
            processData: false,
            cache: false,
            contentType: false,
            xhr: $.AjaxXHRProgress(function (percentage) {
                EditCourseVideoOper.VideoUploadProgressbar.show().progressbar({
                    value: percentage,
                    complete: function () {
                        $(this).fadeOut();
                    },
                    create: function () {
                        $(this).show();
                    }
                });
            })
        })
            .done(function () {
            $.notify({
                message: "تم تعديل الفديو بنجاح"
            });
            _MainObjectOperForCourse_1.MainObjectOperForCourse.LastUpoladedFile = {};
            executeFuncOnDone();
        })
            .always(function () {
            btn.pendingState(false);
        })
            .catch(function (e) {
            $.notify({
                message: "لم يتم تعديل الفديو,حدثت مشكلة فى السيرفر"
            });
        });
    };
    EditCourseVideoOper.HandleOnVideoEdited = function () {
        var mainObject = this;
        this.SaveEditFormBtn.click(function () {
            var btn = $(this);
            mainObject.EditedForm = btn.parents('form');
            if (!mainObject.EditedForm.valid())
                return;
            var data = mainObject.GetEditVideoFormData();
            var duration = 0;
            if (data.Video_Edit.name != undefined) {
                data.Video_Edit.toHtmlVideoElement().onloadedmetadata = function (e) {
                    duration = Math.floor(e.target.duration);
                    data.Duration_Edit = duration;
                    mainObject.SendData(btn, data, duration, mainObject.executeFuncOnDone(btn, data));
                };
            }
            else {
                data.Video_Edit = "";
                mainObject.SendData(btn, data, duration, mainObject.executeFuncOnDone(btn, data));
            }
        });
    };
    EditCourseVideoOper.Main = function () {
        this.EditedForm.validate({
            ignore: '#Video_Edit,:hidden',
        });
        this.HandleOnVideoEdited();
        this.HandleOnVideoUploadBtnClicked();
    };
    EditCourseVideoOper.formCount = 1;
    EditCourseVideoOper.VideoUploadBtn = $("#Video_Edit");
    EditCourseVideoOper.VideoUploadProgressbar = $("#VideoUploadProgressbar_Edit");
    EditCourseVideoOper.EditedForm = $('#EditVideoForm');
    EditCourseVideoOper.isVideoChangedInp = $('#IsVideoChanged');
    EditCourseVideoOper.youtubeChoiceRadioBtn = $("#youtubeChoice");
    EditCourseVideoOper.SaveEditFormBtn = $('#EditSubmitVideoTutorialBtn');
    return EditCourseVideoOper;
}());
exports.EditCourseVideoOper = EditCourseVideoOper;
//# sourceMappingURL=_EditCourseVideo.js.map