import { VideoTutorial, VideoFormData_Edit } from "../Shared/Interfaces";
import { MainObjectOperForCourse } from "./_MainObjectOperForCourse";
import { CommonFuncs } from "./SharedCoursesFuncs";

export class EditCourseVideoOper{
    private static formCount = 1;
    private static VideoUploadBtn = $("#Video_Edit");
    private static VideoUploadProgressbar = $("#VideoUploadProgressbar_Edit");
    private static EditedForm = $('#EditVideoForm');
    public static isVideoChangedInp = $('#IsVideoChanged');
    private static youtubeChoiceRadioBtn = $("#youtubeChoice") as JQuery<HTMLInputElement>;
    private static OnVideoInputChange(e: Event) {
        MainObjectOperForCourse.OnVideoInputChange.bind(MainObjectOperForCourse, e)();
        this.isVideoChangedInp.val('true');
    }
    private static HandleOnVideoUploadBtnClicked() {
        this.VideoUploadBtn.change(this.OnVideoInputChange.bind(this) as any);    
    };
    private static GetEditVideoFormData(): VideoFormData_Edit{
        let formData: VideoFormData_Edit = {} as VideoFormData_Edit;
        formData.Id_Edit = $("#Id_Edit").val() as string;
        formData.CourseId_Edit = MainObjectOperForCourse.courseId;
        formData.IsVideoChanged = this.isVideoChangedInp.val() as any as boolean;
        formData.Description_Edit = $("#Description_Edit").val() as string;
        formData.Title_Edit = $("#Title_Edit").val() as string;
        formData.Url_Edit = $("#Url_Edit").val() as string;
        formData.Video_Edit = MainObjectOperForCourse.LastUpoladedFile;
        formData.VideoNumber_Edit = $("#VideoNumber_Edit").val() as number;
        formData.IsYoutube_Edit = this.youtubeChoiceRadioBtn.is(":checked")
            ? true
            : false;
        if (formData.IsYoutube_Edit) formData.Video_Edit = null;
        else formData.Url_Edit = "";
        return formData;
    }
    private static SaveEditFormBtn: JQuery = $('#EditSubmitVideoTutorialBtn');
    public static GetEditVideoForm(formData: VideoTutorial) {
        let form = $('#EditVideo').show();
        form.find('#Id_Edit').val(formData.id).prop('');
        form.find('#CourseId_Edit').val(MainObjectOperForCourse.courseId);
        form.find('#Title_Edit').val(formData.title);
        form.find('#Description_Edit').val(formData.description);
        form.find('#Duration_Edit').val(formData.duration);
        form.find('#VideoNumber_Edit').val(formData.number);
        form.find('#Video_Edit').change(MainObjectOperForCourse.OnVideoInputChange.bind(MainObjectOperForCourse) as any);

        if (formData.isYoutube) {
            form.find('#youtubeChoice').prop('checked', 'checked')
            form.find('#notyoutubeChoice').removeProp('checked')
        } else {
            form.find('#notyoutubeChoice').prop('checked', 'checked')
            form.find('#youtubeChoice').removeProp('checked')
        }
        return form; 
    }
    public static ResetVideoInput() {
        this.isVideoChangedInp.val('false');
        (MainObjectOperForCourse.CourseDataController.Model as any)['VideoTextTitle'] = "قم باختيار ملف";
    }
    private static SendData(btn: JQuery, data: VideoFormData_Edit, duration: any, executeFuncOnDone:()=>void) {
        let formData = new FormData();
        formData.append("Id_Edit", data.Id_Edit);
        formData.append("CourseId_Edit", data.CourseId_Edit);
        formData.append("IsVideoChanged", data.IsVideoChanged as any as string);
        formData.append("Title_Edit", data.Title_Edit);
        formData.append("Description_Edit", data.Description_Edit);
        formData.append("IsYoutube_Edit", (data.IsYoutube_Edit as any) as string);
        formData.append("VideoNumber_Edit", (data.VideoNumber_Edit as any) as string);
        formData.append("Url_Edit", (data.Url_Edit as any) as string);
        formData.append("Duration_Edit", (duration as any) as string);
        formData.append("Video_Edit", (data.Video_Edit as any) as File);
        btn.pendingState(true, "fa-check-circle-o");
        $.ajax({
            url: CommonFuncs.EditVideoUrl,
            data: formData,
            method: "POST",
            processData: false,
            cache: false,
            contentType: false,
            xhr: $.AjaxXHRProgress(percentage => {
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
            .done(() => {
                $.notify({
                    message: "تم تعديل الفديو بنجاح"
                });
                MainObjectOperForCourse.LastUpoladedFile = {} as File;
                executeFuncOnDone();
            })
            .always(() => {
                btn.pendingState(false);
            })
            .catch(e => {
                $.notify({
                    message: "لم يتم تعديل الفديو,حدثت مشكلة فى السيرفر"
                });
            });
    }
    public static executeFuncOnDone: (btn: JQuery, newData: VideoFormData_Edit) => ()=>void;
    public static HandleOnVideoEdited() {
        let mainObject = this;
        this.SaveEditFormBtn.click(function () {
            let btn = $(this);
            mainObject.EditedForm = btn.parents('form');
            if (!mainObject.EditedForm.valid()) return;
            let data = mainObject.GetEditVideoFormData();            
            let duration = 0;
            if ((data.Video_Edit as File).name != undefined) {
                (data.Video_Edit as File).toHtmlVideoElement().onloadedmetadata = e => {
                    duration = Math.floor((e.target as HTMLVideoElement).duration);
                    data.Duration_Edit = duration;
                    mainObject.SendData(btn, data, duration, mainObject.executeFuncOnDone(btn,data));
                };
            } 
            else {
                data.Video_Edit = "" as any;
                mainObject.SendData(btn, data, duration, mainObject.executeFuncOnDone(btn,data));
             }          
        });
    }
    public static Main() {
        this.EditedForm.validate({
            ignore: '#Video_Edit,:hidden',
            //ignoreTitle: '#Video_Edit'
        });
        this.HandleOnVideoEdited();
        this.HandleOnVideoUploadBtnClicked();
    }
    private constructor() {
    }
}