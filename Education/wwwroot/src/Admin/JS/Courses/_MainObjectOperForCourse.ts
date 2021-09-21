import { CommonButtons } from "../Shared/CommonUI";
import { VideoTutorial, ICourse } from '../Shared/Interfaces'; 
import { IBinding } from "../Shared/Bindings";
export class MainObjectOperForCourse {
    public static courseId: string= $("#Id").val() as string;
    public static CourseDataController: IBinding<ICourse> = {} as IBinding<ICourse>;
    public static LastUpoladedFile: File = {} as File;
    private static VideoOperObject = {
        default: "قم بتحميل ملف الفديو",
        VideoTextTitle: "قم بتحميل ملف الفديو",
        NotValideFile: "هذا النوع من الملف غير صالح"
    }
    public static OnVideoInputChange(e: Event) {
        let videoFile = ((<HTMLInputElement>e.target).files as FileList)[0];
        if (videoFile) this.LastUpoladedFile = videoFile;
        else videoFile = this.LastUpoladedFile;
        if (!videoFile) {
            (this.CourseDataController.Model as any)['VideoTextTitle'] = this.VideoOperObject.default;
            return;
        }
        if (videoFile.type.indexOf("video") == -1) {
            (this.CourseDataController.Model as any)['VideoTextTitle'] = this.VideoOperObject.NotValideFile;
            $.notify(
                {
                    message: "هذة النوعية من الفديوهات غير مدعومة",
                    target: "#AddVideoForm"
                },
                { z_index: 999999999999999 }
            );
            return;
        }
        (this.CourseDataController.Model as any)['VideoTextTitle'] = `تم اختيار ملف: ${videoFile.name}`;
    };
    public static OnTableLoaded: Promise<DataTables.DataTable>={ } as Promise<DataTables.DataTable>;
    public static TableOfVideos: DataTables.DataTable = {} as DataTables.DataTable;
    public static ImgBackOfCourse: JQuery = $("#courseImgBack");
    public static VideosTutorialsTable: JQuery = $('#VideosTable');
    private static RenderVideoForColumn: DataTables.FunctionColumnRender = function (value: any, type: any, record: VideoTutorial, colDom) {
        let VideoDiv = $(`<video-js id="video_${record.number}" controls preload="auto">
                            <source src="${record.url}">
                          </video-js>`).css('margin', 'auto');
        return VideoDiv.get(0).outerHTML;
    };
    private static _tableColumns: DataTables.ColumnSettings[] = [];
    public static Tablecolumns() {
        if (this._tableColumns.length) return this._tableColumns;
        this._tableColumns = [
            { data: "id", visible: false, orderable: false },
            { data: "number", width: '50', className: 'text-center' },
            { data: "title", className: 'text-center' },
            {
                data: "url", width: '250px',
                render: this.RenderVideoForColumn,
                orderable: false,
                searchable: false,
            },
            {
                orderable: false,
                className: 'text-center',
                render: function (value, type, record: VideoTutorial, colDom) {
                    var Details = $(`<div class="Details">
                                        <div class="badge">مدة الفديو ${record.duration.toHourFormat()}</div>
                                        <div class="badge">اخر تعديل ${new Date(record.date).toLocaleDateString()}</div>
                                        <div class="DescriptionTd">${record.description}</div>
                                      </div>`)
                    return Details.get(0).outerHTML;
                }
            },
            {
                orderable: false,
                searchable: false,
                width: "fit-content",
                className: 'text-center',
                render: function (value, type, record: VideoTutorial, colDom) {
                    var controls = $('<div class="controls"></div>')
                    controls.append(CommonButtons.DeleteBtn());
                    controls.append(CommonButtons.EditBtn());
                    return controls.get(0).outerHTML;
                }
            }
        ] as DataTables.ColumnSettings[];
        return this._tableColumns;
};
}