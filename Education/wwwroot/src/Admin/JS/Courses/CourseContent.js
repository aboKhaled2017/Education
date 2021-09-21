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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../global/helperDome");
require("../../../global/Extensions/NumberExten");
require("../../../global/Extensions/JavascriptExt");
require("../../../global/Extensions/AjaxExte");
require("../../../global/Extensions/JqueryExten");
var CommonUI_1 = require("../Shared/CommonUI");
var Bindings_1 = require("../Shared/Bindings");
var SharedCoursesFuncs_1 = require("./SharedCoursesFuncs");
var _MainObjectOperForCourse_1 = require("./_MainObjectOperForCourse");
var _AddCourseVideo_1 = require("./_AddCourseVideo");
var _CourseVideosTable_1 = require("./_CourseVideosTable");
exports.ContentOfCourseOprs = {
    SelectCategoryDataList: [],
    get DropdownUi() {
        return new CommonUI_1.CommonUi(this.selectCategoryBtn, this.CategoryIdInp);
    },
    selectCategoryBtn: $("#Categories"),
    CategoryIdInp: $("#CategoryId"),
    EditCourseForm: $("#EditCourse form:eq(0)"),
    submitBtn: $("#EditCourseBtn"),
    NotNowBtn: $(".notNowBtn"),
    ChangeImgBtn: $("#changeImage"),
    VideoCountText: $("#videoCountText"),
    HandleToggleBtn: function () {
        var _this = this;
        this.EditCourseForm.find(".toogleBtn:eq(0)").click(function (e) {
            var iconbtn = $(e.target);
            iconbtn.toggleClass("fa-toggle-on fa-toggle-off");
            var text = "", isOpened = false;
            if (iconbtn.hasClass("fa-toggle-on")) {
                text = "الكورس متاح الان";
                isOpened = true;
            }
            else {
                text = "الكورس غير متاح الان";
                isOpened = false;
            }
            _this.EditCourseForm.find(".toggleText:eq(0)").text(text);
            $("#IsOpened")
                .val("" + isOpened)
                .triggerHandler("change");
        });
    },
    OnEditCourseFormSubmitted: function (Menu) {
        var _this = this;
        this.submitBtn.click(function () {
            if (!_this.EditCourseForm.valid())
                return;
            _this.EditCourseForm.ajaxSubmit("/Admin/Courses/Edit", "POST", false, function (def, model) {
                def
                    .done(function () {
                    var Model = {};
                    for (var prop in model) {
                        var Prop = prop.charAt(0).toLocaleLowerCase() + "" + prop.slice(1);
                        Model[Prop] = model[prop];
                    }
                    Model.categoryName = CommonUI_1.CommonUi.GetFullCategoryNameById(Model.categoryId, Menu.SelectCategoryDataList);
                    $.notify({ message: "تم تعديل الكورس بنجاح", target: "#EditCourse" }, { z_index: 999999999 });
                })
                    .catch(function (e) {
                    $.notifyCatch(e.responseJSON);
                })
                    .always(function (e) {
                    _this.submitBtn.pendingState(false);
                });
            }, function () {
                _this.submitBtn.pendingState(true, "fa-edit");
            });
        });
    },
    ExecuteBindings: function () {
        var _this = this;
        _MainObjectOperForCourse_1.MainObjectOperForCourse.a = "ali";
        _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController = Bindings_1.Binding.controller('courseData', function (scope) {
            scope.VideosCount = _this.VideoCountText.data('val');
        }, function (value, prop) {
            switch (prop) {
                case "CostOfCourse":
                    return value ? value + " \u062C\u0646\u064A\u0629" : "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F\u0629";
                case "Period":
                    return value ? "\u0645\u062F\u0629 \u0627\u0644\u0643\u0648\u0631\u0633 : " + value : "\u0645\u062F\u0629 \u0627\u0644\u0643\u0648\u0631\u0633 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F\u0629";
                case "StartDateOfBegin":
                    return value
                        ? "\u0628\u062F\u0627\u064A\u0629 \u0627\u0646\u0637\u0644\u0627\u0642 \u0627\u0644\u0643\u0648\u0631\u0633 \u0645\u0646 " + new Date(value).toDateString()
                        : "\u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0643\u0648\u0631\u0633 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F\u0629";
                case "IsOpened":
                    return value == "true"
                        ? "الكورس متاح حاليا"
                        : "الكورس غير متاح حتى الان";
                case "CategoryId":
                    return "\u0642\u0633\u0645 " + CommonUI_1.CommonUi.GetFullCategoryNameById(value, _this.SelectCategoryDataList);
                case "VideosCount":
                    return value > 0
                        ? "\u0639\u062F\u062F \u0627\u0644\u0641\u062F\u064A\u0648\u0647\u0627\u062A " + value
                        : "لا يوجد فديوهات مضافة لهذا الكورس";
                default:
                    return value;
            }
        });
    },
    HandleChangeImageBackOfCourse: function () {
        SharedCoursesFuncs_1.CommonFuncs.UploadCourseImage(this.ChangeImgBtn, _MainObjectOperForCourse_1.MainObjectOperForCourse.ImgBackOfCourse, $("#Id").val(), function (newUrl) {
            _MainObjectOperForCourse_1.MainObjectOperForCourse.CourseDataController.Model.BackgroundImgSrc = newUrl;
        });
    },
    DropdownMenuUi: function () {
        return __awaiter(this, void 0, void 0, function () {
            var DropdownMenuUi;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DropdownMenuUi = this.DropdownUi;
                        DropdownMenuUi.SetMenuTextForCategoryId(this.CategoryIdInp.val());
                        return [4 /*yield*/, DropdownMenuUi.CreateCategoryBtnList(function () {
                                _this.SelectCategoryDataList = DropdownMenuUi.SelectCategoryDataList;
                                _this.ExecuteBindings();
                            })];
                    case 1:
                        _a.sent();
                        DropdownMenuUi.OnCategorySelected = function () { };
                        return [2 /*return*/, DropdownMenuUi];
                }
            });
        });
    },
    Main: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        CommonUI_1.CommonUi.NotInputForBtnNow(this.NotNowBtn);
                        _a = this.OnEditCourseFormSubmitted;
                        return [4 /*yield*/, this.DropdownMenuUi()];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        this.HandleToggleBtn();
                        this.HandleChangeImageBackOfCourse();
                        return [2 /*return*/];
                }
            });
        });
    }
};
$(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.ContentOfCourseOprs.Main()];
                case 1:
                    _a.sent();
                    _CourseVideosTable_1.CourseVideosTableOper.Main();
                    _MainObjectOperForCourse_1.MainObjectOperForCourse.OnTableLoaded.then(function (table) {
                        _AddCourseVideo_1.AddCourseVideoTutorialsOper.Main();
                    });
                    return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=CourseContent.js.map