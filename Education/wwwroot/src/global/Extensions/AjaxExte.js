"use strict";
$.AjaxXHRProgress = function (OnUploading) {
    return function () {
        var jqXHR = null;
        if (window["ActiveXObject"])
            jqXHR = new window["ActiveXObject"]("Microsoft.XMLHTTP");
        else
            jqXHR = new window["XMLHttpRequest"]();
        //uploadProgress
        jqXHR.upload.addEventListener("progress", function (ev) {
            if (ev.lengthComputable) {
                var percentageComplete = Math.round((ev.loaded * 100) / ev.total);
                OnUploading(percentageComplete);
            }
        }, false);
        //downloadProgress
        jqXHR.addEventListener("progress", function (ev) {
            if (ev.lengthComputable) {
                var percentageComplete = Math.round((ev.loaded * 100) / ev.total);
                console.log("downloaded " + percentageComplete);
            }
        }, false);
        return jqXHR;
    };
};
//# sourceMappingURL=AjaxExte.js.map