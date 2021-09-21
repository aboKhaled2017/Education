import { VideoTutorial, VideoFormData_Edit } from "../Shared/Interfaces";
export declare class EditCourseVideoOper {
    private static formCount;
    private static VideoUploadBtn;
    private static VideoUploadProgressbar;
    private static EditedForm;
    static isVideoChangedInp: JQuery<HTMLElement>;
    private static youtubeChoiceRadioBtn;
    private static OnVideoInputChange;
    private static HandleOnVideoUploadBtnClicked;
    private static GetEditVideoFormData;
    private static SaveEditFormBtn;
    static GetEditVideoForm(formData: VideoTutorial): JQuery<HTMLElement>;
    static ResetVideoInput(): void;
    private static SendData;
    static executeFuncOnDone: (btn: JQuery, newData: VideoFormData_Edit) => () => void;
    static HandleOnVideoEdited(): void;
    static Main(): void;
    private constructor();
}
//# sourceMappingURL=_EditCourseVideo.d.ts.map