"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonUI_1 = require("../Shared/CommonUI");
var MainObjectOperForCourse = /** @class */ (function () {
    function MainObjectOperForCourse() {
    }
    MainObjectOperForCourse.OnVideoInputChange = function (e) {
        var videoFile = e.target.files[0];
        if (videoFile)
            this.LastUpoladedFile = videoFile;
        else
            videoFile = this.LastUpoladedFile;
        if (!videoFile) {
            this.CourseDataController.Model['VideoTextTitle'] = this.VideoOperObject.default;
            return;
        }
        if (videoFile.type.indexOf("video") == -1) {
            this.CourseDataController.Model['VideoTextTitle'] = this.VideoOperObject.NotValideFile;
            $.notify({
                message: "هذة النوعية من الفديوهات غير مدعومة",
                target: "#AddVideoForm"
            }, { z_index: 999999999999999 });
            return;
        }
        this.CourseDataController.Model['VideoTextTitle'] = "\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641: " + videoFile.name;
    };
    ;
    MainObjectOperForCourse.Tablecolumns = function () {
        if (this._tableColumns.length)
            return this._tableColumns;
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
                render: function (value, type, record, colDom) {
                    var Details = $("<div class=\"Details\">\n                                        <div class=\"badge\">\u0645\u062F\u0629 \u0627\u0644\u0641\u062F\u064A\u0648 " + record.duration.toHourFormat() + "</div>\n                                        <div class=\"badge\">\u0627\u062E\u0631 \u062A\u0639\u062F\u064A\u0644 " + new Date(record.date).toLocaleDateString() + "</div>\n                                        <div class=\"DescriptionTd\">" + record.description + "</div>\n                                      </div>");
                    return Details.get(0).outerHTML;
                }
            },
            {
                orderable: false,
                searchable: false,
                width: "fit-content",
                className: 'text-center',
                render: function (value, type, record, colDom) {
                    var controls = $('<div class="controls"></div>');
                    controls.append(CommonUI_1.CommonButtons.DeleteBtn());
                    controls.append(CommonUI_1.CommonButtons.EditBtn());
                    return controls.get(0).outerHTML;
                }
            }
        ];
        return this._tableColumns;
    };
    ;
    MainObjectOperForCourse.courseId = $("#Id").val();
    MainObjectOperForCourse.CourseDataController = {};
    MainObjectOperForCourse.LastUpoladedFile = {};
    MainObjectOperForCourse.VideoOperObject = {
        default: "قم بتحميل ملف الفديو",
        VideoTextTitle: "قم بتحميل ملف الفديو",
        NotValideFile: "هذا النوع من الملف غير صالح"
    };
    MainObjectOperForCourse.OnTableLoaded = {};
    MainObjectOperForCourse.TableOfVideos = {};
    MainObjectOperForCourse.ImgBackOfCourse = $("#courseImgBack");
    MainObjectOperForCourse.VideosTutorialsTable = $('#VideosTable');
    MainObjectOperForCourse.RenderVideoForColumn = function (value, type, record, colDom) {
        var VideoDiv = $("<video-js id=\"video_" + record.number + "\" controls preload=\"auto\">\n                            <source src=\"" + record.url + "\">\n                          </video-js>").css('margin', 'auto');
        return VideoDiv.get(0).outerHTML;
    };
    MainObjectOperForCourse._tableColumns = [];
    return MainObjectOperForCourse;
}());
exports.MainObjectOperForCourse = MainObjectOperForCourse;
//# sourceMappingURL=_MainObjectOperForCourse.js.map