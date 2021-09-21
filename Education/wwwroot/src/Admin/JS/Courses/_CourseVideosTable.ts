import { CommonFuncs } from "./SharedCoursesFuncs";
import { VideoTutorial, VideoFormData_Edit } from '../Shared/Interfaces';
import { TableArLang } from "../Shared/CommonVariables";
import videojs from '../../../../lib/video/customVideo-js';
import { MainObjectOperForCourse } from "./_MainObjectOperForCourse";
import { EditCourseVideoOper } from "./_EditCourseVideo";
export let CourseVideosTableOper = {
    VideosData: [] as VideoTutorial[],  
    HandleDataTableLoading() {
        MainObjectOperForCourse.OnTableLoaded = (function (listUrl) {
            return new Promise<DataTables.DataTable>(TableResolved => {
                let Table = MainObjectOperForCourse.VideosTutorialsTable.DataTable({
                    ajax: {
                        url: `${CommonFuncs.GetVideosListOfCourse}?id=${MainObjectOperForCourse.courseId}`,
                        dataType: "json",
                        type: "GET",
                        contentType: "application/json"
                    },
                    columns: MainObjectOperForCourse.Tablecolumns(),
                    language: TableArLang,
                    pageLength: 3,
                    lengthMenu: [3, 5, 10, 15, 20, 50, 100],
                    info: true,
                    serverSide: true,
                    preDrawCallback: () => {
                        $('body').append($('#EditVideo'));
                    },
                    drawCallback: (setting: DataTables.SettingsLegacy) => {
                        setting.aoData.forEach((value: DataTables.RowLegacy, i: number, array: DataTables.RowLegacy[]) => {
                            let player = videojs($(`#video_${(value._aData as VideoTutorial).number}`)
                                .get(0), {
                                    width: 300,
                                    fluid: true,
                                    poster: MainObjectOperForCourse.ImgBackOfCourse.attr('src')
                                });
                        });
                        let TablePosters = $('#VideosTable .vjs-poster');
                        setTimeout(() => {
                            TablePosters.attr('style', `background-image:url("{{BackgroundImgSrc}}")`);
                            MainObjectOperForCourse.CourseDataController.UpdateTheNewllyAddedBinding();
                            MainObjectOperForCourse.CourseDataController.Model.BackgroundImgSrc = MainObjectOperForCourse.ImgBackOfCourse.prop('src');
                        }, 500);
                        TableResolved(Table);
                    }
                });
            });
        })();
    },
    HideSliblingTrHasEditing(tr: JQuery) {
        let EditedTr = tr.parent('tbody').find('tr.hasEditing:eq(0)');
        $('body').append($('#EditVideo'));
        if (EditedTr.length == 0) return;
        EditedTr.removeClass('hasEditing');
        let RawData = EditedTr.data('RawData')
        let record = RawData.data() as VideoTutorial
        let rawNode = RawData.node() as HTMLTableRowElement;
        this.ReconfigureVideoJsForColumn(record.number);
        EditCourseVideoOper.ResetVideoInput();
        $(rawNode.children).eq(0).prop('colspan', 1)
            .end().not(':eq(0)').toggle();
    },
    ReconfigureVideoJsForColumn(id: number) {
        videojs($(`#video_${id}`)
            .get(0), {
                width: 300,
                fluid: true,
                poster: MainObjectOperForCourse.ImgBackOfCourse.attr('src')
            });
    },
    HandleControlsBtns() {
        let mainObject = this;
        MainObjectOperForCourse.VideosTutorialsTable.on("click", ".delete  ", function () {
            $.confirmNotify('هل انت متأكد من حذف الفديو', isConfirmed => {
                if (!isConfirmed) return;
                var btn = $(this);
                let tr = btn.closest("tr");
                let RowDataTable = btn.GetDatatableRow(MainObjectOperForCourse.TableOfVideos);
                let rowData = RowDataTable.data() as VideoTutorial;
                btn.pendingState(true, "fa-remove");
                $.post(`${CommonFuncs.DeleteVideoUrl}?id=${rowData.id}`)
                    .done(d => {
                        $(RowDataTable.node()).fadeOut();
                        MainObjectOperForCourse.CourseDataController.Model.VideosCount -= 1;
                    })
                    .always(d => {
                        btn.pendingState(false);
                    })
                    .catch(model => {
                        $.notifyCatch(model);
                    });
            });
        });
        MainObjectOperForCourse.VideosTutorialsTable.on("click", ".edit  ", function () {
            var btn = $(this);  
            let tr = btn.closest("tr");            
            let RawData = btn.GetDatatableRow(MainObjectOperForCourse.TableOfVideos);
            let record = RawData.data() as VideoTutorial
            let rawNode = RawData.node() as HTMLTableRowElement;        
            mainObject.HideSliblingTrHasEditing(tr);       
            let form = EditCourseVideoOper.GetEditVideoForm(record);
            tr.addClass('hasEditing')
                .data('RawData',RawData );
            $(rawNode.children).eq(0).prop('colspan', 5)
                .empty().append(form)
                .end().not(':eq(0)').toggle();
        });
    },
    UpdateVideoRecord(record: VideoTutorial, newdata: VideoFormData_Edit) {
        record.description = newdata.Description_Edit;
        record.title = newdata.Title_Edit;
        record.duration = newdata.Duration_Edit ? newdata.Duration_Edit : record.duration;
        record.number = newdata.VideoNumber_Edit;
        record.isYoutube = newdata.IsYoutube_Edit;
        record.url = newdata.Url_Edit ? newdata.Url_Edit as string : record.url;
        return record;
    },
    async Main() {
        this.HandleDataTableLoading();
        MainObjectOperForCourse.OnTableLoaded.then(table => {
            MainObjectOperForCourse.TableOfVideos = table;    
            this.HandleControlsBtns();
            EditCourseVideoOper.executeFuncOnDone = (btn: JQuery, newData: VideoFormData_Edit) => {
                return () => {
                    $('body').append($('#EditVideo'));
                    let tr = btn.closest('tr');
                    let RawData = tr.data('RawData')
                    let record = RawData.data() as VideoTutorial
                    let rawNode = RawData.node() as HTMLTableRowElement;
                    tr.removeClass('hasEditing');
                    record = this.UpdateVideoRecord(record, newData);
                    RawData.data(record);
                    this.ReconfigureVideoJsForColumn(record.number);
                    EditCourseVideoOper.ResetVideoInput();             
                    $(rawNode.children).eq(0).prop('colspan', 1)
                        .end().not(':eq(0)').toggle();
                }
            }
            EditCourseVideoOper.Main();
        })  
    }
}