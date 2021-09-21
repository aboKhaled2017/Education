import "../../../global/helperDome";
import { CategoryListItem, Course } from '../Shared/Interfaces';
export interface IAddCourseOperations {
    SelectCategoryDataList: CategoryListItem[];
    selectCategoryBtn: JQuery;
    CategoryIdInp: JQuery;
    AddCourseBtn: JQuery;
    AddCourseForm: JQuery;
    NotNowBtn: JQuery;
    GetCategoryNameById(is: string): string;
    MakeDropDownMenuForCategories(data: CategoryListItem[], SuperId?: null): JQuery<HTMLElement>;
    HandleDropDownMenu(): void;
    CreateCategoryBtnList(): void;
    HandleAddCourseSubmit(): void;
    ResetDropdownMenu(): void;
    ResetAddCourseForm(): void;
    HandleToggleBtn(): void;
    HandleSomeFormOperations(): void;
    main(): void;
}
export interface IGetCoursesOperations {
    CurrentSelectedUpdatableCard: JQuery;
    CoursesCount: number;
    CoursesSection: JQuery;
    CourseCountText: JQuery;
    EditCourseModal: JQuery;
    GetCoursesUrl: string;
    DeleteCourseUrl: string;
    EditCourseUrl: string;
    CourseCardTemplate: JQuery;
    EditCourseImgBgUrl: string;
    CardImgBaseUrl: string;
    CourseCard: JQuery;
    EditCourse: JQuery;
    EditCourseForm: JQuery;
    EditBgImgBtn: JQuery;
    EditCourseSubmitBtn: JQuery;
    loadingIcon: JQuery;
    HandleOnCardImgChange(): void;
    DesignCourseCard(course: Course): JQuery;
    EditDesignCourseCard(course: Course, template: JQuery): void;
    DrawCourses(courses: Course[]): void;
    GetCourses(): void;
    Refresh(): void;
    HandleDesignCardOperations(): void;
    ToggleFormForModal(): void;
    FormatDateTo_yyyy_mm_dd(dateStr: string): string;
    BindDataToTargetForm(TargetForm: JQuery<HTMLFormElement>, data: Course): void;
    HandleOnCourseUD(): void;
    HandleModals(): void;
    main(): void;
}
export declare class CommonFuncs {
    static GetCoursesUrl: string;
    static DeleteCourseUrl: string;
    static EditCourseUrl: string;
    static EditCourseImgBgUrl: string;
    static CardImgBaseUrl: string;
    static GetVideosListOfCourse: string;
    static AddVideoUrl: string;
    static DeleteVideoUrl: string;
    static EditVideoUrl: string;
    static UploadCourseImage(BtnHandler: JQuery, ImgHandler: JQuery, id: string, OnDone: (Url: string) => void): void;
}
//# sourceMappingURL=SharedCoursesFuncs.d.ts.map