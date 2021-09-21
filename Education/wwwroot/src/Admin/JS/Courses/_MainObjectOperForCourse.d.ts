/// <reference types="jquery.datatables" />
/// <reference types="datatables.net" />
import { ICourse } from '../Shared/Interfaces';
import { IBinding } from "../Shared/Bindings";
export declare class MainObjectOperForCourse {
    static courseId: string;
    static CourseDataController: IBinding<ICourse>;
    static LastUpoladedFile: File;
    private static VideoOperObject;
    static OnVideoInputChange(e: Event): void;
    static OnTableLoaded: Promise<DataTables.DataTable>;
    static TableOfVideos: DataTables.DataTable;
    static ImgBackOfCourse: JQuery;
    static VideosTutorialsTable: JQuery;
    private static RenderVideoForColumn;
    private static _tableColumns;
    static Tablecolumns(): DataTables.ColumnSettings[];
}
//# sourceMappingURL=_MainObjectOperForCourse.d.ts.map