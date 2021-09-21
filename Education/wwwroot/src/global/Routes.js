"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = {
    base: location.origin,
    get adminArea() {
        return this.base + "/Admin";
    },
    get AdminApi() {
        return this.base + "/AdminApi";
    },
    get UpdateAccountName() {
        return this.adminArea + "/UpdateName";
    },
    get UpdateAccount() {
        return this.adminArea + "/UpdateAccount";
    },
    makeUrlQuery: function (base) {
        var routeValues = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            routeValues[_i - 1] = arguments[_i];
        }
        var str = "" + base;
        for (var _a = 0, routeValues_1 = routeValues; _a < routeValues_1.length; _a++) {
            var prop = routeValues_1[_a];
            str += "?" + prop.prop + "=" + prop.val;
        }
        return str;
    }
};
//# sourceMappingURL=Routes.js.map