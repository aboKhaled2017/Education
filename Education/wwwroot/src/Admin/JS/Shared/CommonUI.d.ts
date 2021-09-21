import { CategoryListItem } from './Interfaces';
export declare class CommonUi {
    private selectCategoryBtn;
    private CategoryIdInp;
    private dataUrl;
    static NotInputForBtnNow(GeneralBtn: JQuery): void;
    static GetCategoryNameById(id: string, dataList: CategoryListItem[]): string;
    static GetFullCategoryNameById(id: string, dataList: CategoryListItem[]): string;
    SelectCategoryDataList: CategoryListItem[];
    OnCategorySelected: () => void;
    DefaultMenuValues: {
        text: string;
        id: string;
    };
    constructor(selectCategoryBtn: JQuery, CategoryIdInp: JQuery, dataUrl?: string);
    private MakeDropDownMenuForCategories;
    private HandleDropDownMenu;
    CreateCategoryBtnList(AfterCreated: () => void): Promise<void>;
    private SetMenuTextForCurrentId;
    SetMenuTextForCategoryId(id: string, text?: string): CommonUi;
}
export declare class CommonButtons {
    static DeleteBtn: () => JQuery<HTMLElement>;
    static SaveBtn: () => JQuery<HTMLElement>;
    static EditBtn: () => JQuery<HTMLElement>;
    static CustomBtn: (label: string, iconClass: string) => JQuery<HTMLElement>;
}
//# sourceMappingURL=CommonUI.d.ts.map