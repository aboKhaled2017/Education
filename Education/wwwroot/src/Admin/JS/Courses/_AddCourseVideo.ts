import { VideoFormData } from '../Shared/Interfaces';
import { CommonFuncs } from "./SharedCoursesFuncs"; 
import { MainObjectOperForCourse } from './_MainObjectOperForCourse';
export let AddCourseVideoTutorialsOper = {
    AddVideoModal: $("#AddVideoModal"),
    AddVideoForm: $("#AddVideoForm"),
    VideoUploadProgressbar: $("#VideoUploadProgressbar"),
    AddSubmitVideoTutorialBtn: $("#AddSubmitVideoTutorialBtn"),
    VideoUploadBtn: $("#Video"),
    youtubeChoiceRadioBtn: $("#youtubeChoice") as JQuery<HTMLInputElement>,
    notyoutubeChoiceRadioBtn: $("#notyoutubeChoice") as JQuery<HTMLInputElement>,
    HandleOnToggleChoce() {
        this.youtubeChoiceRadioBtn.change(() => {
            $(".youtubeChoice:eq(0)")
                .toggle()
                .find("input")
                .toggle();
            $(".notyoutubeChoice:eq(0)")
                .toggle()
                .find("input")
                .toggle();
        });
        this.notyoutubeChoiceRadioBtn.change(() => {
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
    HandleOnVideoUploadBtnClicked() {
        let VideoOperObject = {
            default: "قم بتحميل ملف الفديو",
            VideoTextTitle: "قم بتحميل ملف الفديو",
            NotValideFile: "هذا النوع من الملف غير صالح"
        };
        this.VideoUploadBtn.change(MainObjectOperForCourse.OnVideoInputChange.bind(MainObjectOperForCourse) as any);
    },
    GetAntiForeignToken() {
        let token = $("input[name=__RequestVerificationToken]").val();
        return token;
    },
    HandleOnAddVideoSubmit(){
        this.AddSubmitVideoTutorialBtn.click(e => {
            if (!this.AddVideoForm.valid()) return;
            let data = this.GetAddVideoFormData();
            let duration = 0;           
            (data.Video as File).toHtmlVideoElement().onloadedmetadata = e => {
                duration = Math.floor((e.target as HTMLVideoElement).duration);
                let formData = new FormData();
                formData.append("CourseId", data.CourseId);
                formData.append("Title", data.Title);
                formData.append("Description", data.Description);
                formData.append("IsYoutube", (data.IsYoutube as any) as string);
                formData.append("VideoNumber", (data.VideoNumber as any) as string);
                formData.append("Url", (data.Url as any) as string);
                formData.append("Duration", (duration as any) as string);
                formData.append("Video", (data.Video as any) as File);
                this.AddSubmitVideoTutorialBtn.pendingState(true, "fa-plus");
                $.ajax({
                    url: CommonFuncs.AddVideoUrl,
                    data: formData,
                    method: "POST",
                    processData: false,
                    cache: false,
                    contentType: false,
                    headers: {
                        RequestVerificationToken: this.GetAntiForeignToken() as string
                    },
                    xhr: $.AjaxXHRProgress(percentage => {
                        this.VideoUploadProgressbar.show().progressbar({
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
                    .done(() => {
                        $.notify({
                            message: "تم اضافة الفديو بنجاح"
                        });
                        (this.AddVideoForm.get(0) as HTMLFormElement).reset();
                        $("input#CourseId").val($("#Id").val() as string);
                        this.AddVideoModal.modal("hide");
                        MainObjectOperForCourse.CourseDataController.Model.VideosCount += 1;
                        MainObjectOperForCourse.LastUpoladedFile = {} as File;
                    })
                    .always(() => {
                        this.AddSubmitVideoTutorialBtn.pendingState(false);
                    })
                    .catch(e => {
                        $.notify({
                            message: "لم يتم حفظ الفديو,حدثت مشكلة فى السيرفر"
                        });
                    });
            };
        });
        this.AddVideoForm.on("reset", e => {
            if (!this.notyoutubeChoiceRadioBtn.is(":checked"))
                this.notyoutubeChoiceRadioBtn.trigger("change");
            (MainObjectOperForCourse.CourseDataController.Model as any)['VideoTextTitle'] = "قم باختيار ملف";
        }).validate({
            rules: {
                onfocusout: (el, e) => { }
            } as JQueryValidation.ValidationOptions,
            focusCleanup: true
        });
        $("input#CourseId").val($("#Id").val() as string);
    },
    GetAddVideoFormData(): VideoFormData {
        let formData: VideoFormData = {} as VideoFormData;
        formData.CourseId = MainObjectOperForCourse.courseId;
        formData.Description = $("#Description").val() as string;
        formData.Title = $("#Title").val() as string;
        formData.Url = $("#Url").val() as string;
        formData.Video = MainObjectOperForCourse.LastUpoladedFile;
        formData.VideoNumber = $("#VideoNumber").val() as number;
        formData.IsYoutube = this.youtubeChoiceRadioBtn.is(":checked")
            ? true
            : false;
        if (formData.IsYoutube) formData.Video = null;
        else formData.Url = "";
        return formData;
    },
    HandleTextEditorForTextArea() {
        var descTextArea = $('#VideoDescr');
        let VideoDescrEditor = {} as CKEDITOR.editor;
        $.getScript('/lib/Editors/ckeditor/ckeditor.js').done(e => {
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
                        [CKEDITOR.CTRL + 76, 'link'], //L
                        [CKEDITOR.CTRL + CKEDITOR.ALT + 66, 'image'], //B
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 77, 'specialchar'], //M
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 188, 'subscript'], //COMMA
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 109, 'subscript'], //-
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 191, 'subscript'], //#
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 190, 'superscript'], //PERIOD
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 107, 'superscript'], //+
                        [CKEDITOR.CTRL + 66, 'bold'], //B
                        [CKEDITOR.CTRL + 73, 'italic'], //I
                        [CKEDITOR.CTRL + 85, 'underline'], //U
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 70, 'bold'], //F
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 75, 'italic'], //K
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 85, 'underline'], //U
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
    Main() {
        //this.HandleTextEditorForTextArea();
        this.HandleOnToggleChoce();
        this.HandleOnAddVideoSubmit();
        this.HandleOnVideoUploadBtnClicked();
    }
}