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
var CommonUi = /** @class */ (function () {
    function CommonUi(selectCategoryBtn, CategoryIdInp, dataUrl) {
        if (dataUrl === void 0) { dataUrl = "/Admin/Category/ItemsList"; }
        this.selectCategoryBtn = selectCategoryBtn;
        this.CategoryIdInp = CategoryIdInp;
        this.dataUrl = dataUrl;
        this.SelectCategoryDataList = [];
        this.OnCategorySelected = function () { };
        this.DefaultMenuValues = {
            text: "اختر اسم القسم",
            id: ""
        };
    }
    CommonUi.NotInputForBtnNow = function (GeneralBtn) {
        GeneralBtn.click(function (e) {
            var btn = $(this);
            var input = btn.parents(".form-group:eq(0)").find("input:eq(0)");
            if (btn.is(":checked")) {
                input.data("value", input.val());
                input.attr("disabled", "disabled").val("");
                input.prop("placeholder", input.data("notnow"));
                if (input.is(".withDate")) {
                    input.attr("type", "text");
                }
            }
            else {
                var dataVal = input.data("value");
                input.removeAttr("disabled").prop("placeholder", input.data("prompt"));
                if (dataVal)
                    input.val(dataVal);
                if (input.is(".withDate")) {
                    input.attr("type", "date");
                }
            }
            input.triggerHandler("change");
        });
    };
    CommonUi.GetCategoryNameById = function (id, dataList) {
        return dataList.find(function (v) { return v.id == id; }).name;
    };
    CommonUi.GetFullCategoryNameById = function (id, dataList) {
        var superId = dataList.find(function (v) { return v.id == id; }).superId;
        return superId == null
            ? dataList.find(function (v) { return v.id == id; }).name
            : dataList.find(function (v) { return v.id == superId; }).name + "/\n               " + dataList.find(function (v) { return v.id == id; }).name;
    };
    CommonUi.prototype.MakeDropDownMenuForCategories = function (data, SuperId) {
        if (SuperId === void 0) { SuperId = null; }
        var ElsContainer = $();
        var _loop_1 = function (category) {
            if (category.superId != SuperId)
                return "continue";
            if (category.subs.length == 0) {
                var item = $("<li><a tabindex=\"-1\">" + category.name + "</a></li>");
                item.data("id", category.id).data("name", category.name);
                ElsContainer = ElsContainer.add(item);
            }
            else {
                var item = $("<li class=\"dropup\">\n                        <a class=\"sub dropdown-toggle\" data-toggle=\"dropdown\" tabindex=\"-1\">\n                            " + category.name + " <span class=\"caret\"></span>\n                        </a>\n                    </li>");
                var SubMenu = $("<ul class=\"dropdown-menu subMenu dropdown-menu-right\" role=\"menu\" style=\"display: none\">\n                        </ul>");
                var SubList = this_1.SelectCategoryDataList.filter(function (item, index) {
                    if (category.subs.indexOf(item.id) >= 0)
                        return item;
                });
                SubMenu.append(this_1.MakeDropDownMenuForCategories(SubList, category.id));
                item.append(SubMenu);
                item.data("id", category.id);
                ElsContainer = ElsContainer.add(item);
            }
        };
        var this_1 = this;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var category = data_1[_i];
            _loop_1(category);
        }
        return ElsContainer;
    };
    CommonUi.prototype.HandleDropDownMenu = function () {
        var mainObj = this;
        $(".dropdown a.sub,.dropup a.sub").on("click", function (e) {
            $(this)
                .next("ul")
                .toggle();
            e.stopPropagation();
            e.preventDefault();
        });
        this.selectCategoryBtn
            .data("text", this.DefaultMenuValues.text)
            .data("id", this.DefaultMenuValues.id)
            .find("li")
            .css("cursor", "pointer")
            .not(".dropdown")
            .on("click", function (e) {
            var el = $(this);
            var text = CommonUi.GetFullCategoryNameById(el.data("id"), mainObj.SelectCategoryDataList);
            mainObj.selectCategoryBtn.find("button .text").text(text);
            el.parents(".subMenu").hide();
            mainObj.CategoryIdInp.val(el.data("id")).trigger("change");
            mainObj.OnCategorySelected();
            e.stopPropagation();
        });
    };
    CommonUi.prototype.CreateCategoryBtnList = function (AfterCreated) {
        return __awaiter(this, void 0, void 0, function () {
            var ElsContainer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ElsContainer = $();
                        return [4 /*yield*/, $.get(this.dataUrl).done(function (result) {
                                _this.SelectCategoryDataList = result.data;
                                _this.SetMenuTextForCurrentId();
                                _this.selectCategoryBtn
                                    .find(".text")
                                    .text(_this.DefaultMenuValues.text)
                                    .end()
                                    .find(".dropdown-menu")
                                    .empty()
                                    .append(_this.MakeDropDownMenuForCategories(result.data));
                                _this.HandleDropDownMenu();
                                AfterCreated();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonUi.prototype.SetMenuTextForCurrentId = function () {
        if (this.DefaultMenuValues.id == "")
            return;
        this.DefaultMenuValues.text = CommonUi.GetFullCategoryNameById(this.DefaultMenuValues.id, this.SelectCategoryDataList);
    };
    CommonUi.prototype.SetMenuTextForCategoryId = function (id, text) {
        if (text)
            this.DefaultMenuValues.text = text;
        this.DefaultMenuValues.id = id;
        return this;
    };
    return CommonUi;
}());
exports.CommonUi = CommonUi;
var CommonButtons = /** @class */ (function () {
    function CommonButtons() {
    }
    CommonButtons.DeleteBtn = function () {
        return $("<button class=\"controlBtn delete  btn btn-danger\">\n              <span>\u062D\u0630\u0641 </span>\n              <i class=\"fa fa-remove\"></i>\n            </button>");
    };
    CommonButtons.SaveBtn = function () {
        return $("<button class=\"controlBtn save  btn btn-primary\">\n                <span>\u062D\u0641\u0638 </span>\n                <i class=\"fa fa-check-circle\"></i>\n            </button>");
    };
    CommonButtons.EditBtn = function () {
        return $("<button class=\"controlBtn edit  btn btn-info\">\n                <span>\u062A\u0639\u062F\u064A\u0644 </span>\n                <i class=\"fa fa-edit\"></i>\n            </button>");
    };
    CommonButtons.CustomBtn = function (label, iconClass) {
        return $("<button class=\"controlBtn edit  btn btn-info\">\n                <span>" + label + " </span>\n                <i class=\"fa " + iconClass + "\"></i>\n            </button>");
    };
    return CommonButtons;
}());
exports.CommonButtons = CommonButtons;
//# sourceMappingURL=CommonUI.js.map