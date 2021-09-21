"use strict";
Number.prototype.digitCount = function () {
    return this.toString().length;
};
Number.prototype.toHourFormat = function () {
    var h = Math.floor(this / 3600);
    var m = Math.floor((this - h * 3600) / 60);
    var s = Math.floor(this - h * 3600 - m * 60);
    return (h.digitCount() > 1 ? h : "0" + h) + ":" + (m.digitCount() > 1 ? m : "0" + m) + ":" + (s.digitCount() > 1 ? s : "0" + s);
};
//# sourceMappingURL=NumberExten.js.map