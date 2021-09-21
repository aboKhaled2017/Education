"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../global/declaration.d.ts"/>
require("../../../global/setting");
require("../../../global/helperDome");
require("../../Assests/BootstrapComponents/bootstrapNotify");
var Routes_1 = require("../../../global/Routes");
var messages_1 = require("../../../global/messages");
var changeNameOperation = {
    UpdateNameForm: $('#UpdateNameForm'),
    get NameSubmitBtn() {
        return this.UpdateNameForm.find('#NameSubmitBtn');
    },
    get NameInput() {
        return this.UpdateNameForm.find('#Name');
    },
    HandleOnNameUpdate: function () {
        var _this = this;
        this.UpdateNameForm.submit(function (e) {
            e.preventDefault();
            var SubmitBtn = _this.NameSubmitBtn;
            var Name = _this.NameInput.val().trim();
            ;
            if (_this.NameInput.valid()) {
                $.ajax({
                    url: Routes_1.Routes.makeUrlQuery(Routes_1.Routes.UpdateAccountName, { prop: "Name", val: Name }),
                    method: 'PUT',
                    beforeSend: function () {
                        SubmitBtn.pendingState(true, "fa-send");
                    }
                })
                    .always(function () {
                    SubmitBtn.pendingState(false);
                })
                    .done(function (data) {
                    $.notify({
                        message: "تم تغيير الاسم بنجاح"
                    }, {
                        type: 'success',
                        timer: 4000
                    });
                });
            }
        });
    },
};
var changeAccountOperation = {
    UpdateAccountForm: $('#UpdateAccountForm'),
    get AccountSubmitBtn() {
        return this.UpdateAccountForm.find('#accountSaveBtn');
    },
    get userNameInput() {
        return this.UpdateAccountForm.find('#UserName');
    },
    get passwordInput() {
        return this.UpdateAccountForm.find('#password');
    },
    confiremMessage: messages_1.messages.changeAccountAlertion,
    submitForm: function (UserName, Password, SubmitBtn) {
        $.ajax({
            url: Routes_1.Routes.UpdateAccount,
            method: 'POST',
            data: JSON.stringify({ UserName: UserName, Password: Password }),
            beforeSend: function () {
                SubmitBtn.pendingState(true, "fa-send");
            }
        })
            .always(function () {
            SubmitBtn.pendingState(false);
        })
            .done(function (data) {
            $.notify({
                message: messages_1.messages.redirectNotifing,
            }, {
                onClose: function () {
                    location.href = Routes_1.Routes.adminArea;
                }
            });
        });
    },
    HandleOnAccountUpadate: function () {
        var _this = this;
        this.passwordInput.addPasswordShow();
        this.UpdateAccountForm.submit(function (e) {
            e.preventDefault();
            var SubmitBtn = _this.AccountSubmitBtn;
            if (_this.userNameInput.valid() && _this.passwordInput.valid()) {
                var UserName_1 = _this.userNameInput.val().trim();
                var Password_1 = _this.passwordInput.val().trim();
                $.confirmNotify(_this.confiremMessage, function (isConfirmed) {
                    if (isConfirmed)
                        _this.submitForm(UserName_1, Password_1, SubmitBtn);
                });
            }
        });
    },
};
changeNameOperation.HandleOnNameUpdate();
changeAccountOperation.HandleOnAccountUpadate();
//# sourceMappingURL=Account.js.map