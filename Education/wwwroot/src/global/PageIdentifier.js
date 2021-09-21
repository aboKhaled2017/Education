"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageType;
exports.pageIdentifier = {
    pagetype: pageType,
    start: function () {
        this.pagetype = $('body').data('page');
    }
};
exports.pageIdentifier.start();
//# sourceMappingURL=PageIdentifier.js.map