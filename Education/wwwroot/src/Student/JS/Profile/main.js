"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editAccount_1 = require("./editAccount");
var PageIdentifier_1 = require("../../../global/PageIdentifier");
$(function () {
    if (PageIdentifier_1.pageIdentifier.pagetype != "profile")
        return;
    editAccount_1.EditAccountHandlingObject.start();
    editAccount_1.EditPasswordHandlingObject.start();
    editAccount_1.EditMembershipHandlingObject.start();
});
//# sourceMappingURL=main.js.map