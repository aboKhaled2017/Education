"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SharedCoursesFuncs_1 = require("./SharedCoursesFuncs");
var _MainObjectOperForCourse_1 = require("./_MainObjectOperForCourse");
exports.AddCourseVideoTutorialsOper = {
    AddVideoModal: $("#AddVideoModal"),
    AddVideoForm: $("#AddVideoForm"),
    VideoUploadProgressbar: $("#VideoUploadProgressbar"),
    AddSubmitVideoTutorialBtn: $("#AddSubmitVideoTutorialBtn"),
    VideoUploadBtn: $("#Video"),
    youtubeChoiceRadioBtn: $("#youtubeChoice"),
    notyoutubeChoiceRadioBtn: $("#notyoutubeChoice"),
    HandleOnToggleChoce: function () {
        this.youtubeChoiceRadioBtn.change(function () {
            $(".youtubeChoice:eq(0)")
                .toggle()
                .find("input")
                .toggle();
            $(".notyoutubeChoice:eq(0)")
                .toggle()
                .find("input")
                .toggle();
        });
        this.notyoutubeChoiceRadioBtn.change(function () {
            $(".notyoutubeChoice:eq(0)")
                .toggle()
                .find("input")
                .toggle();
            $(".youtubeChoice:eq(0)")
                .toggle()
                .find("input")
                .toggle();
        });
    },
    HandleOnVideoUploadBtnClicked: function () {
        var VideoOperObject = {
            default: "قم بتحميل ملف الفديو",
            VideoTextTitle: "قم بتحميل ملف الفديو",
            NotValideFile: "هذا النوع من الملف غير صالح"
        };
        this.VideoUploadBtn.change(_MainObjectOperForCourse_1.MainObjectOperForCourse.OnVideoInputChange.bind(_MainObjectOperForCourse_1.MainObjectOperForCourse));
    },
    GetAntiForeignToken: function () {
        var token = $("input[name=__RequestVerificationToken]").val();
        return token;
    },
    HandleOnAddVideoSubmit: function () {
        var _this = this;
        this.AddSubmitVideoTutorialBtn.click(function (e) {
            if (!_this.AddVideoForm.valid())
                return;
            var data = _this.GetAddVideoFormData();
            var duration = 0;
            data.Video.toHtmlVideoElement().onloadedmetadata = function (e) {
                duration = Math.floor(e.target.duration);
                var formData = new FormData();
                formData.append("CourseId", data.CourseId);
                formData.append("Title", data.Title);
                formData.append("Description", data.Description);
                formData.append("IsYoutube", data.IsYoutube);
                formData.append("VideoNumber", data.VideoNumber);
                formData.append("Url", data.Url);
                formData.append("Duration", duration);
                formData.append("Video", data.Video);
                _this.AddSubmitVideoTutorialBtn.pendingState(true, "fa-plus");
                $.ajax({
                    url: SharedCoursesFuncs_1.CommonFuncs.AddVideoUrl,
                    data: formData,
                    method: "POST",
                    processData: false,
                    cache: false,
                    contentType: false,
                    headers: {
                        RequestVerificationToken: _this.GetAntiForeignToken()
                    },
                    xhr: $.AjaxXHRProgress(function (percentage) {
                        _this.VideoUploadProgressbar.show().progressbar({
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
                        message: "تم اضافة الفديو بنجاح"
                    });
                    _this.AddVideoForm.get(0).reset();
                    $("input#CourseId").val($("#Id").val());
                    _this.AddVideoModal.modal("hide");
                    _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.Model.VideosCount += 1;
                    _MainObjectOperForCourse_1.MainObjectOperForCourse.LastUpoladedFile = {};
                })
                    .always(function () {
                    _this.AddSubmitVideoTutorialBtn.pendingState(false);
                })
                    .catch(function (e) {
                    $.notify({
                        message: "لم يتم حفظ الفديو,حدثت مشكلة فى السيرفر"
                    });
                });
            };
        });
        this.AddVideoForm.on("reset", function (e) {
            if (!_this.notyoutubeChoiceRadioBtn.is(":checked"))
                _this.notyoutubeChoiceRadioBtn.trigger("change");
            _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.Model['VideoTextTitle'] = "قم باختيار ملف";
        }).validate({
            rules: {
                onfocusout: function (el, e) { }
            },
            focusCleanup: true
        });
        $("input#CourseId").val($("#Id").val());
    },
    GetAddVideoFormData: function () {
        var formData = {};
        formData.CourseId = _MainObjectOperForCourse_1.MainObjectOperForCourse.courseId;
        formData.Description = $("#Description").val();
        formData.Title = $("#Title").val();
        formData.Url = $("#Url").val();
        formData.Video = _MainObjectOperForCourse_1.MainObjectOperForCourse.LastUpoladedFile;
        formData.VideoNumber = $("#VideoNumber").val();
        formData.IsYoutube = this.youtubeChoiceRadioBtn.is(":checked")
            ? true
            : false;
        if (formData.IsYoutube)
            formData.Video = null;
        else
            formData.Url = "";
        return formData;
    },
    HandleTextEditorForTextArea: function () {
        var descTextArea = $('#VideoDescr');
        var VideoDescrEditor = {};
        $.getScript('/lib/Editors/ckeditor/ckeditor.js').done(function (e) {
            CKEDITOR.editorConfig = function (config) {
                // Define changes to default configuration here. For example:
                config.language = 'ar';
                config.extraPlugins = 'colordialog';
                // config.extraPlugins = 'matheeditor';
                // config.uiColor = '#AADC6E';
                // config.image_previewText = CKEDITOR.tools.repeat('Custom lorem ipsum text here', 8 );
                // config.contentsLanguage = 'de';
                config.linkShowAdvancedTab = false;
                config.linkShowTargetTab = false;
                config.height = 350;
                config.width = 680;
                // change color palette
                config.colorButton_colors = 'F00,11C11D,00F,B700B7,FF8C00,008080,808080,D3D3D3';
                config.colorButton_enableMore = false;
                // smaller editor-width for mobile devices
                if (/iPhone|iPod/i.test(navigator.userAgent)) {
                    config.width = 300;
                }
                // for resizing the editor window
                config.resize_minHeight = 350;
                config.resize_maxHeight = 880;
                config.resize_maxWidth = 910;
                // remove all formatting from pasted text
                config.forcePasteAsPlainText = true;
                // remove font size, family, bg color from pasted text
                config.pasteFromWordRemoveFontStyles = true;
                // allow browser's spell checker
                config.disableNativeSpellChecker = false;
                // disable ckeditor context menu to allow native context menu (works on holding CTRL)
                // open: http://stackoverflow.com/questions/2246631/how-to-disable-ckeditor-context-menu/12477378
                // shortcuts for firefox and chrome (editor breaks if assigned in IE9)
                // if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                if (!(/MSIE (\d+\.\d+);/.test(navigator.userAgent))) {
                    config.keystrokes = [
                        // [ CKEDITOR.SHIFT + 45, 'pastefromword' ], //INS
                        [CKEDITOR.CTRL + 76, 'link'],
                        [CKEDITOR.CTRL + CKEDITOR.ALT + 66, 'image'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 77, 'specialchar'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 188, 'subscript'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 109, 'subscript'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 191, 'subscript'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 190, 'superscript'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 107, 'superscript'],
                        [CKEDITOR.CTRL + 66, 'bold'],
                        [CKEDITOR.CTRL + 73, 'italic'],
                        [CKEDITOR.CTRL + 85, 'underline'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 70, 'bold'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 75, 'italic'],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 85, 'underline'],
                    ];
                }
            };
            CKEDITOR.on('dialogDefinition', function (ev) {
                // take the dialog name and its definition from the event data
                var dialogName = ev.data.name;
                var dialogDefinition = ev.data.definition;
                //var dialog = CKEDITOR.dialog.getCurrent(); 
                //alert( dialog.getName() );
                // check if the definition is from the dialog we are interested in (the 'link' dialog).
                if (dialogName == 'link') {
                    dialogDefinition.onShow = function () {
                        var dialog = CKEDITOR.dialog.getCurrent();
                        //dialog.hidePage( 'target' ); // via config 
                        //dialog.hidePage( 'advanced' ); // via config 
                        elem = dialog.getContentElement('info', 'anchorOptions');
                        elem.getElement().hide();
                        elem = dialog.getContentElement('info', 'emailOptions');
                        elem.getElement().hide();
                        var elem = dialog.getContentElement('info', 'linkType');
                        elem.getElement().hide();
                        elem = dialog.getContentElement('info', 'protocol');
                        elem.disable();
                    };
                }
                else if (dialogName == 'image') {
                    // get a reference to the 'Link Info' tab.
                    var infoTab = dialogDefinition.getContents('info');
                    // remove unnecessary fields
                    infoTab.remove('ratioLock');
                    infoTab.remove('txtHeight');
                    infoTab.remove('txtWidth');
                    infoTab.remove('txtBorder');
                    infoTab.remove('txtHSpace');
                    infoTab.remove('txtVSpace');
                    infoTab.remove('cmbAlign');
                    //hide image preview (v2)
                    //field = infoTab.get( 'htmlPreview' );
                    //field.style = 'display:none';
                    // memo: dialogDefinition.onShow = ... throws JS error (C.preview not defined) 
                    dialogDefinition.onLoad = function () {
                        var dialog = CKEDITOR.dialog.getCurrent();
                        // hide image preview
                        var elem = dialog.getContentElement('info', 'htmlPreview');
                        elem.getElement().hide();
                        // hide tabs and show only upload
                        dialog.hidePage('Link');
                        dialog.hidePage('advanced');
                        this.selectPage('Upload');
                        // hide url on start up, prevent user input external image URLs 
                        // goes in onShow of image.js: dialog.hidePage('info'); 
                        // hide ok button so that upload button can only be used
                        // goes in onShow of image.js: document.getElementById(this.getButton('ok').domId).style.display='none';
                        // on tab switching or automatic after upload
                        this.on('selectPage', function (e) {
                            // show okay button of ckeditor dialog
                            document.getElementById(this.getButton('ok').domId).style.display = 'inline';
                            // after upload the selectPage is fired, show Bild-Info then
                            dialog.showPage('info');
                        });
                    };
                }
                else if (dialogName == 'table') {
                    dialogDefinition.removeContents('advanced');
                }
            });
            CKEDITOR.basePath = "/lib/Editors/ckeditor/";
            VideoDescrEditor = CKEDITOR.replace('VideoDescription', {
                language: 'ar',
            });
            window['VideoDescrEditor'] = VideoDescrEditor;
        });
    },
    Main: function () {
        //this.HandleTextEditorForTextArea();
        this.HandleOnToggleChoce();
        this.HandleOnAddVideoSubmit();
        this.HandleOnVideoUploadBtnClicked();
    }
};
//# sourceMappingURL=_AddCourseVideo.js.map