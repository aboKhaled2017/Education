"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SharedCoursesFuncs_1 = require("./SharedCoursesFuncs");
var CommonVariables_1 = require("../Shared/CommonVariables");
var customVideo_js_1 = __importDefault(require("../../../../lib/video/customVideo-js"));
var _MainObjectOperForCourse_1 = require("./_MainObjectOperForCourse");
var _EditCourseVideo_1 = require("./_EditCourseVideo");
exports.CourseVideosTableOper = {
    VideosData: [],
    HandleDataTableLoading: function () {
        _MainObjectOperForCourse_1.MainObjectOperForCourse.OnTableLoaded = (function (listUrl) {
            return new Promise(function (TableResolved) {
                var Table = _MainObjectOperForCourse_1.MainObjectOperForCourse.VideosTutorialsTable.DataTable({
                    ajax: {
                        url: SharedCoursesFuncs_1.CommonFuncs.GetVideosListOfCourse + "?id=" + _MainObjectOperForCourse_1.MainObjectOperForCourse.courseId,
                        dataType: "json",
                        type: "GET",
                        contentType: "application/json"
                    },
                    columns: _MainObjectOperForCourse_1.MainObjectOperForCourse.Tablecolumns(),
                    language: CommonVariables_1.TableArLang,
                    pageLength: 3,
                    lengthMenu: [3, 5, 10, 15, 20, 50, 100],
                    info: true,
                    serverSide: true,
                    preDrawCallback: function () {
                        $('body').append($('#EditVideo'));
                    },
                    drawCallback: function (setting) {
                        setting.aoData.forEach(function (value, i, array) {
                            var player = customVideo_js_1.default($("#video_" + value._aData.number)
                                .get(0), {
                                width: 300,
                                fluid: true,
                                poster: _MainObjectOperForCourse_1.MainObjectOperForCourse.ImgBackOfCourse.attr('src')
                            });
                        });
                        var TablePosters = $('#VideosTable .vjs-poster');
                        setTimeout(function () {
                            TablePosters.attr('style', "background-image:url(\"{{BackgroundImgSrc}}\")");
                            _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.UpdateTheNewllyAddedBinding();
                            _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.Model.BackgroundImgSrc = _MainObjectOperForCourse_1.MainObjectOperForCourse.ImgBackOfCourse.prop('src');
                        }, 500);
                        TableResolved(Table);
                    }
                });
            });
        })();
    },
    HideSliblingTrHasEditing: function (tr) {
        var EditedTr = tr.parent('tbody').find('tr.hasEditing:eq(0)');
        $('body').append($('#EditVideo'));
        if (EditedTr.length == 0)
            return;
        EditedTr.removeClass('hasEditing');
        var RawData = EditedTr.data('RawData');
        var record = RawData.data();
        var rawNode = RawData.node();
        this.ReconfigureVideoJsForColumn(record.number);
        _EditCourseVideo_1.EditCourseVideoOper.ResetVideoInput();
        $(rawNode.children).eq(0).prop('colspan', 1)
            .end().not(':eq(0)').toggle();
    },
    ReconfigureVideoJsForColumn: function (id) {
        customVideo_js_1.default($("#video_" + id)
            .get(0), {
            width: 300,
            fluid: true,
            poster: _MainObjectOperForCourse_1.MainObjectOperForCourse.ImgBackOfCourse.attr('src')
        });
    },
    HandleControlsBtns: function () {
        var mainObject = this;
        _MainObjectOperForCourse_1.MainObjectOperForCourse.VideosTutorialsTable.on("click", ".delete  ", function () {
            var _this = this;
            $.confirmNotify('هل انت متأكد من حذف الفديو', function (isConfirmed) {
                if (!isConfirmed)
                    return;
                var btn = $(_this);
                var tr = btn.closest("tr");
                var RowDataTable = btn.GetDatatableRow(_MainObjectOperForCourse_1.MainObjectOperForCourse.TableOfVideos);
                var rowData = RowDataTable.data();
                btn.pendingState(true, "fa-remove");
                $.post(SharedCoursesFuncs_1.CommonFuncs.DeleteVideoUrl + "?id=" + rowData.id)
                    .done(function (d) {
                    $(RowDataTable.node()).fadeOut();
                    _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.Model.VideosCount -= 1;
                })
                    .always(function (d) {
                    btn.pendingState(false);
                })
                    .catch(function (model) {
                    $.notifyCatch(model);
                });
            });
        });
        _MainObjectOperForCourse_1.MainObjectOperForCourse.VideosTutorialsTable.on("click", ".edit  ", function () {
            var btn = $(this);
            var tr = btn.closest("tr");
            var RawData = btn.GetDatatableRow(_MainObjectOperForCourse_1.MainObjectOperForCourse.TableOfVideos);
            var record = RawData.data();
            var rawNode = RawData.node();
            mainObject.HideSliblingTrHasEditing(tr);
            var form = _EditCourseVideo_1.EditCourseVideoOper.GetEditVideoForm(record);
            tr.addClass('hasEditing')
                .data('RawData', RawData);
            $(rawNode.children).eq(0).prop('colspan', 5)
                .empty().append(form)
                .end().not(':eq(0)').toggle();
        });
    },
    UpdateVideoRecord: function (record, newdata) {
        record.description = newdata.Description_Edit;
        record.title = newdata.Title_Edit;
        record.duration = newdata.Duration_Edit ? newdata.Duration_Edit : record.duration;
        record.number = newdata.VideoNumber_Edit;
        record.isYoutube = newdata.IsYoutube_Edit;
        record.url = newdata.Url_Edit ? newdata.Url_Edit : record.url;
        return record;
    },
    Main: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.HandleDataTableLoading();
                _MainObjectOperForCourse_1.MainObjectOperForCourse.OnTableLoaded.then(function (table) {
                    _MainObjectOperForCourse_1.MainObjectOperForCourse.TableOfVideos = table;
                    _this.HandleControlsBtns();
                    _EditCourseVideo_1.EditCourseVideoOper.executeFuncOnDone = function (btn, newData) {
                        return function () {
                            $('body').append($('#EditVideo'));
                            var tr = btn.closest('tr');
                            var RawData = tr.data('RawData');
                            var record = RawData.data();
                            var rawNode = RawData.node();
                            tr.removeClass('hasEditing');
                            record = _this.UpdateVideoRecord(record, newData);
                            RawData.data(record);
                            _this.ReconfigureVideoJsForColumn(record.number);
                            _EditCourseVideo_1.EditCourseVideoOper.ResetVideoInput();
                            $(rawNode.children).eq(0).prop('colspan', 1)
                                .end().not(':eq(0)').toggle();
                        };
                    };
                    _EditCourseVideo_1.EditCourseVideoOper.Main();
                });
                return [2 /*return*/];
            });
        });
    }
};
//# sourceMappingURL=_CourseVideosTable.js.map