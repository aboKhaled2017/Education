import "../../../global/helperDome";
import "../../../global/Extensions/NumberExten";
import "../../../global/Extensions/JavascriptExt";
import "../../../global/Extensions/AjaxExte";
import "../../../global/Extensions/JqueryExten";
import { CommonUi } from "../Shared/CommonUI";
import { CategoryListItem } from '../Shared/Interfaces';
export declare let ContentOfCourseOprs: {
    SelectCategoryDataList: CategoryListItem[];
    readonly DropdownUi: CommonUi;
    selectCategoryBtn: JQuery<HTMLElement>;
    CategoryIdInp: JQuery<HTMLElement>;
    EditCourseForm: JQuery<HTMLElement>;
    submitBtn: JQuery<HTMLElement>;
    NotNowBtn: JQuery<HTMLElement>;
    ChangeImgBtn: JQuery<HTMLElement>;
    VideoCountText: JQuery<HTMLElement>;
    HandleToggleBtn(): void;
    OnEditCourseFormSubmitted(Menu: any): void;
    ExecuteBindings(): void;
    HandleChangeImageBackOfCourse(): void;
    DropdownMenuUi(): Promise<CommonUi>;
    Main(): Promise<void>;
};
//# sourceMappingURL=CourseContent.d.ts.map