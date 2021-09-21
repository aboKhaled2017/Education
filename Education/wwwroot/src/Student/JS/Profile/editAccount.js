"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functionality_1 = require("../../../global/functionality");
exports.EditAccountHandlingObject = {
    EditAccountForm: $("#EditAccountForm"),
    get SubmitBtn() {
        return this.EditAccountForm.find("#AccountSubmitBtn");
    },
    changeUserName: function (newName) {
        $("#userNameElement").text(newName);
    },
    start: function () {
        var _this = this;
        exports.EditAccountHandlingObject.SubmitBtn.click(function () {
            if (exports.EditAccountHandlingObject.EditAccountForm.valid()) {
                _this.EditAccountForm.ajaxSubmit("/Profile/editAccount", "POST", function (Def, model) {
                    Def.done(function (data) {
                        _this.changeUserName(model["fname"]);
                        $.notify({
                            message: data
                        });
                    })
                        .always(function () {
                        _this.SubmitBtn.pendingState(false);
                    })
                        .catch(function (e) {
                        $.notify({
                            message: e.responseText
                        });
                    });
                }, 
                //before send
                function () {
                    _this.SubmitBtn.pendingState(true, "fa-edit");
                });
            }
        });
    }
};
exports.EditPasswordHandlingObject = {
    EditPasswordForm: $("#EditPasswordForm"),
    get SubmitBtn() {
        return this.EditPasswordForm.find("#PasswordSubmitBtn");
    },
    start: function () {
        var _this = this;
        exports.EditPasswordHandlingObject.SubmitBtn.click(function () {
            if (exports.EditPasswordHandlingObject.EditPasswordForm.valid()) {
                _this.EditPasswordForm.ajaxSubmit("/Profile/ChangePassword", "POST", function (Def, model) {
                    Def.done(function (data) {
                        $.notify({
                            message: data
                        });
                    })
                        .always(function () {
                        _this.SubmitBtn.pendingState(false);
                    })
                        .catch(function (e) {
                        if (e.status == functionality_1.requestStatus.NotFound)
                            _this.EditPasswordForm.resetPassword()
                                .formAlert()
                                .text(e.responseText)
                                .end();
                        $.notify({
                            message: e.responseText
                        });
                    });
                }, 
                //before send
                function () {
                    _this.SubmitBtn.pendingState(true, "fa-edit");
                });
            }
        });
    }
};
exports.EditMembershipHandlingObject = {
    membershipAccountSection: $("#membershipAccount"),
    MembershipForm: $("#MembershipForm"),
    get SubmitRegisBtn() {
        var btn = this.MembershipForm.find("#MemshipRegistBtn");
        btn.data("icon", "fa-user-circle");
        return btn;
    },
    get SubmitEditBtn() {
        var btn = this.MembershipForm.find("#MemshipEditBtn");
        btn.data("icon", "fa-user-circle");
        return btn;
    },
    get SubmitBtn() {
        return this.isMembershipRegistered
            ? this.SubmitEditBtn
            : this.SubmitRegisBtn;
    },
    get isMembershipRegistered() {
        return this.MembershipForm.data("isregistered") == "True";
    },
    formUrl: function () {
        return this.isMembershipRegistered
            ? "/Profile/Membership?type=edit"
            : "/Profile/Membership?type=register";
    },
    get formMemberSection() {
        return this.membershipAccountSection.find(".member");
    },
    get formNotMemberSection() {
        return this.membershipAccountSection.find(".notMember");
    },
    toggleFormAction: function () {
        this.formMemberSection.toggle();
        this.formNotMemberSection.toggle();
    },
    start: function () {
        var _this = this;
        var context = this;
        exports.EditMembershipHandlingObject.SubmitBtn.click(function () {
            if (exports.EditMembershipHandlingObject.MembershipForm.valid()) {
                _this.MembershipForm.ajaxSubmit(_this.formUrl(), "POST", function (Def, model) {
                    Def.done(function (data) {
                        $.notify({
                            message: data
                        }, {
                            onClose: function () {
                                if (!context.isMembershipRegistered) {
                                    context.toggleFormAction();
                                    context.MembershipForm.data("isregistered", "True");
                                }
                            }
                        });
                    })
                        .always(function () {
                        _this.SubmitBtn.pendingState(false);
                    })
                        .catch(function (e) {
                        $.notify({
                            message: e.responseText
                        });
                    });
                }, 
                //before send
                function () {
                    _this.SubmitBtn.pendingState(true, _this.SubmitBtn.data("icon"));
                });
            }
        });
    }
};
//# sourceMappingURL=editAccount.js.map