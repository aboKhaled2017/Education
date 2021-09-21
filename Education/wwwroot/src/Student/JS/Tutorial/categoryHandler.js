"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryHandler = {
    mainCategoryPattern: '/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})',
    subCategoryPattern: String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})"], ["/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\\u0600-\\u06FF ]{3,})/([a-zA-Z ]{3,}|[\\u0600-\\u06FF ]{3,})"]))),
    subjectPattern: String.raw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})/([a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})"], ["/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\\u0600-\\u06FF ]{3,})/([a-zA-Z ]{3,}|[\\u0600-\\u06FF ]{3,})/([a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12})/([a-zA-Z ]{3,}|[\\u0600-\\u06FF ]{3,})"]))),
    handleUrlOperations: function () {
        var url = decodeURIComponent(location.href);
        var mainCategoryResult = new RegExp(this.mainCategoryPattern, "i").exec(url);
        var subCategoryResult = new RegExp(this.subCategoryPattern, "i").exec(url);
        var subjectResult = new RegExp(this.subjectPattern, "i").exec(url);
        var matchedResult = subjectResult || subCategoryResult || mainCategoryResult || {};
        if (matchedResult.length == 3)
            this.handleMainCategoryRequest(matchedResult);
        else if (matchedResult.length == 4)
            this.handleSubcategoryRequest(matchedResult);
        else if (matchedResult.length > 4)
            this.handleSubjectRequest(matchedResult);
        else
            return;
    },
    handleMainCategoryRequest: function (result) {
        var id = result[1], categoryName = result[2];
        var selectedCatEl = $(".tracks-wrapper li>a[data-id=\"" + id + "\"]:eq(0)");
        selectedCatEl.parent().addClass('active');
    },
    handleSubcategoryRequest: function (result) {
        var id = result[1], mainCategoryName = result[2], subCategoryName = result[3];
        var mainCategoryId = $(".tracks-wrapper li>a[data-id=\"" + id + "\"]:eq(0)").parents('ul').data('parentid');
        var selectedCatEl = $(".tracks-wrapper li>a[data-id=\"" + mainCategoryId + "\"]:eq(0)");
        console.log(selectedCatEl);
        var newElement = $(String.raw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            <ul class=\"subCategories\">\n                <li class=\"subCategory\">\n                    ", "\n                </li>\n                <li class=\"subCategory active\">\n                    ", "\n                </li>\n            </ul>            \n        "], ["\n            <ul class=\"subCategories\">\n                <li class=\"subCategory\">\n                    ", "\n                </li>\n                <li class=\"subCategory active\">\n                    ", "\n                </li>\n            </ul>            \n        "])), mainCategoryName, subCategoryName));
        selectedCatEl.text('').append(newElement);
        selectedCatEl.parent().addClass('superCategory');
    },
    handleSubjectRequest: function (result) {
        var id = result[1], mainCategoryName = result[2], subCategoryName = result[3], subjId = result[4], subjName = result[6];
        var mainCategoryId = $(".tracks-wrapper li>a[data-id=\"" + id + "\"]:eq(0)").parents('ul').data('parentid');
        var selectedCatEl = $(".tracks-wrapper li>a[data-id=\"" + mainCategoryId + "\"]:eq(0)");
        console.log(selectedCatEl);
        var newElement = $(String.raw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n            <ul class=\"subCategories\">\n                <li class=\"subCategory\">\n                    ", "\n                </li>\n                <li class=\"subCategory\">\n                    ", "\n                </li>\n                <li class=\"subCategory active\">\n                    ", "\n                </li>\n            </ul>            \n        "], ["\n            <ul class=\"subCategories\">\n                <li class=\"subCategory\">\n                    ", "\n                </li>\n                <li class=\"subCategory\">\n                    ", "\n                </li>\n                <li class=\"subCategory active\">\n                    ", "\n                </li>\n            </ul>            \n        "])), mainCategoryName, subCategoryName, subjName));
        selectedCatEl.text('').append(newElement);
        selectedCatEl.parent().addClass('superCategory');
    },
    startHandle: function () {
        this.handleUrlOperations();
    }
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=categoryHandler.js.map