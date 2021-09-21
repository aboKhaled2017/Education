"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
$.ajaxSettings.contentType = "application/json";
$.ajaxSettings.error = function (jqXHR, errorType, execptionObj) {
    //handle on error occure
};
var ResquestStatus;
(function (ResquestStatus) {
    ResquestStatus[ResquestStatus["Error"] = 0] = "Error";
    ResquestStatus[ResquestStatus["NotFound"] = 1] = "NotFound";
    ResquestStatus[ResquestStatus["NoMean"] = 2] = "NoMean";
})(ResquestStatus || (ResquestStatus = {}));
//# sourceMappingURL=setting.js.map