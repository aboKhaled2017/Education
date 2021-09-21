import "../../../global/helperDome";
import {CategoryListItem, Course } from '../Shared/Interfaces';
export interface IAddCourseOperations {
    SelectCategoryDataList: CategoryListItem[],
    selectCategoryBtn: JQuery,
    CategoryIdInp: JQuery,
    AddCourseBtn: JQuery,
    AddCourseForm: JQuery,
    NotNowBtn: JQuery,
    GetCategoryNameById(is: string): string
    MakeDropDownMenuForCategories(data: CategoryListItem[], SuperId?:null): JQuery<HTMLElement>,
    HandleDropDownMenu(): void,
    CreateCategoryBtnList(): void,
    HandleAddCourseSubmit(): void,
    ResetDropdownMenu(): void,
    ResetAddCourseForm(): void,
    HandleToggleBtn(): void,
    HandleSomeFormOperations(): void,
    main(): void
}
export interface IGetCoursesOperations {
    CurrentSelectedUpdatableCard: JQuery,
    CoursesCount: number,
    CoursesSection: JQuery,
    CourseCountText: JQuery,
    EditCourseModal: JQuery,
    GetCoursesUrl: string,
    DeleteCourseUrl: string,
    EditCourseUrl: string,
    CourseCardTemplate: JQuery,
    EditCourseImgBgUrl: string,
    CardImgBaseUrl: string,
    CourseCard: JQuery
    EditCourse: JQuery,
    EditCourseForm: JQuery,
    EditBgImgBtn: JQuery,
    EditCourseSubmitBtn: JQuery,
    loadingIcon: JQuery,
    HandleOnCardImgChange():void,
    DesignCourseCard(course: Course): JQuery,
    EditDesignCourseCard(course: Course, template: JQuery):void,
    DrawCourses(courses: Course[]) :void,
    GetCourses() :void,
    Refresh() :void,
    HandleDesignCardOperations() :void,
    ToggleFormForModal():void,
    FormatDateTo_yyyy_mm_dd(dateStr: string): string ,
    BindDataToTargetForm(TargetForm: JQuery < HTMLFormElement >, data: Course):void,
    HandleOnCourseUD() :void,
    HandleModals() :void,
    main():void
}
export class CommonFuncs {
    public static GetCoursesUrl: string= '/Admin/Courses/List';
    public static DeleteCourseUrl: string = '/Admin/Courses/Delete';
    public static EditCourseUrl: string = '/Admin/Courses/Edit';
    public static EditCourseImgBgUrl: string = '/Admin/Courses/EditBgImg';
    public static CardImgBaseUrl: string = '/images/admin/courses/';
    public static GetVideosListOfCourse: string = '/Admin/VideoTutorial/List';
    public static AddVideoUrl: string = '/Admin/VideoTutorial/Add';
    public static DeleteVideoUrl: string = '/Admin/VideoTutorial/Delete';
    public static EditVideoUrl: string = '/Admin/VideoTutorial/Edit';
    public static UploadCourseImage(BtnHandler: JQuery, ImgHandler: JQuery,id: string,OnDone:(Url:string)=>void) {
        let formData: FormData;
        $.UploadImage(BtnHandler, function (file: File, ext: string) {
            let Name = `${Date.now()}${ext}`;
            formData = new FormData();
            formData.append("Id", id);
            formData.append("Name", Name);
            formData.append("Image", file);
            let icon = BtnHandler.find('i:eq(0)');
            icon.switchPendingState(true, "fa-picture-o");
            $.ajax({
                url: CommonFuncs.EditCourseImgBgUrl,
                data: formData,
                method: "POST",
                processData: false,
                cache: false,
                contentType: false
            })
                .done(() => {
                    ImgHandler.prop('src', `${CommonFuncs.CardImgBaseUrl}${Name}`)
                    $.notify({
                        message: "تم حفظ الصورة بنجاح"
                    });
                    OnDone(`${CommonFuncs.CardImgBaseUrl}${Name}`);
                })
                .always(() => {
                    icon.switchPendingState(false);
                })
                .catch(e => {
                    $.notify({
                        message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
                    });
                });
        }); 
    }
}
 
