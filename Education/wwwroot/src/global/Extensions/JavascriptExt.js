"use strict";
File.prototype.toHtmlVideoElement = function () {
    window.URL = window.URL || window["webkitURL"];
    var video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function (ev) {
        window.URL.revokeObjectURL(video.src);
    };
    video.src = URL.createObjectURL(this);
    return video;
};
Array.prototype.UniqueValues = function () {
    var uniqueSet = new Set(this);
    var uniqueArr = [];
    uniqueSet.forEach(function (val) { return uniqueArr.push(val); });
    return uniqueArr;
};
Array.prototype.PushIfNotExists = function (value) {
    if (!this.includes(value))
        this.push(value);
};
//# sourceMappingURL=JavascriptExt.js.map