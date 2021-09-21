"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHandlingObject = {
    RegisterForm: $("#internalRegisterForm"),
    get formAlertEl() {
        return exports.RegisterHandlingObject.RegisterForm.find(".formAlert");
    },
    submitBtn: $("#registerSubmitBtn"),
    HandleFormSubmit: function () {
        exports.RegisterHandlingObject.submitBtn.click(function (e) {
            if (exports.RegisterHandlingObject.RegisterForm.valid()) {
                exports.RegisterHandlingObject.RegisterForm.ajaxSubmit("/Register", "POST", function (defAjax, model) {
                    defAjax
                        .done(function (data) {
                        location.href = data;
                    })
                        .catch(function (data) {
                        exports.RegisterHandlingObject.formAlertEl
                            .text(data.responseText)
                            .fadeIn();
                    })
                        .always(function () {
                        exports.RegisterHandlingObject.submitBtn.pendingState(false);
                    });
                }, function () {
                    exports.RegisterHandlingObject.submitBtn.pendingState(true, "fa-send");
                });
            }
        });
    },
    HandleInputOperations: function () {
        exports.RegisterHandlingObject.RegisterForm.find("input").keyup(function () {
            exports.RegisterHandlingObject.formAlertEl.fadeOut();
        });
    },
    start: function () {
        this.HandleFormSubmit();
        this.HandleInputOperations();
    }
};
exports.LoginHandlingObject = {
    LoginForm: $("#internalLoginForm"),
    get formAlertEl() {
        return exports.LoginHandlingObject.LoginForm.find(".formAlert");
    },
    submitBtn: $("#loginSubmitBtn"),
    HandleFormSubmit: function () {
        exports.LoginHandlingObject.submitBtn.click(function (e) {
            if (exports.LoginHandlingObject.LoginForm.valid()) {
                exports.LoginHandlingObject.LoginForm.ajaxSubmit("/Login", "POST", function (defAjax, model) {
                    defAjax
                        .done(function (data) {
                        location.href = data;
                    })
                        .catch(function (data) {
                        exports.LoginHandlingObject.formAlertEl
                            .text(data.responseText)
                            .fadeIn();
                    })
                        .always(function () {
                        exports.LoginHandlingObject.submitBtn.pendingState(false);
                    });
                }, function () {
                    exports.LoginHandlingObject.submitBtn.pendingState(true, "fa-send");
                });
            }
        });
    },
    HandleInputOperations: function () {
        exports.LoginHandlingObject.LoginForm.find("input").keyup(function () {
            exports.LoginHandlingObject.formAlertEl.fadeOut();
        });
    },
    start: function () {
        this.HandleFormSubmit();
        this.HandleInputOperations();
    }
};
//# sourceMappingURL=_registerLoginOper.js.map