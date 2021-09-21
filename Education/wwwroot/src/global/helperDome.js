"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./declaration.d.ts" />
require("../Admin/Assests/BootstrapComponents/bootstrapNotify");
(function () {
    $.fn.pendingState = function (isPending, removedClass, animatingClass) {
        if (!animatingClass)
            animatingClass = "fa-spinner fa-spin";
        if (removedClass)
            this.data("class", removedClass);
        else
            removedClass = this.data("class");
        this.toggleClass("disabled").toggleAttr("disabled");
        if (isPending) {
            this.find("i")
                .removeClass(removedClass)
                .addClass(animatingClass);
        }
        else {
            this.find("i")
                .addClass(removedClass)
                .removeClass(animatingClass);
        }
        return this;
    };
    $.fn.switchPendingState = function (isPending, removedClass, animatingClass) {
        if (!animatingClass)
            animatingClass = "fa-spinner fa-spin";
        if (removedClass)
            this.data("class", removedClass);
        else
            removedClass = this.data("class");
        this.toggleClass("disabled").toggleAttr("disabled");
        if (isPending) {
            this.removeClass(removedClass).addClass(animatingClass);
        }
        else {
            this.addClass(removedClass).removeClass(animatingClass);
        }
        return this;
    };
    $.confirmNotify = (function () {
        var confirmTemplate = "\n            <div data-notify=\"container\" \n                class=\"col-xs-11 col-sm-4 alert alert-info alert-with-icon animated fadeInDown bootstrapNotify\"\n                role=\"alert\" data-notify-position=\"top-center\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\" data-notify=\"dismiss\">\u00D7</button>\n                <span data-notify=\"icon\" class=\"pe-7s-check\"></span>\n                <span data-notify=\"title\"></span> \n                <span data-notify=\"message\"></span>\n                <span class=\"text-center confirmControls\">\n                <button  class=\"btn btn-primary btn-sm\">\n                    <i class=\"fa fa-check\"></i>\n                    \u062A\u0623\u0643\u064A\u062F\n                </button>\n                <button class=\"btn btn-danger btn-sm\">\n                    <i class=\"fa fa-close\"></i>\n                    \u0627\u0644\u063A\u0627\u0621\n                </button>\n                </span>\n                <a href=\"#\" target=\"_blank\" data-notify=\"url\"></a>\n            </div>";
        return function (message, onConfirm) {
            var template = $(confirmTemplate);
            var controlsbtn = template.find(".confirmControls button");
            controlsbtn
                .eq(0)
                .data("result", true)
                .end()
                .eq(1)
                .data("result", false);
            template.find('span[data-notify="message"]').text(message);
            controlsbtn.click(function () {
                confirm.close(false);
                onConfirm($(this).data("result"));
            });
            var confirm = $.notify({}, {
                template: template,
                onClose: function (doAnyAction) {
                    if (doAnyAction === void 0) { doAnyAction = true; }
                    if (doAnyAction)
                        onConfirm(false);
                },
                timer: 400000
            });
        };
    })();
    $.fn.addPasswordShow = function () {
        var passwordInp = $(this);
        if (passwordInp.attr("type") != "password")
            return passwordInp;
        var eyeIcon = $('<i class="fa fa-eye fa-lg"></i>');
        passwordInp.after(eyeIcon);
        var topOffset = passwordInp.outerHeight() -
            passwordInp.height() / 2;
        eyeIcon
            .css({
            position: "absolute",
            left: "1%",
            top: "calc(100% - " + topOffset + "px)",
            color: "#337ab7",
            cursor: "pointer"
        })
            .parent()
            .css({
            position: "relative"
        })
            .end()
            .click(function () {
            passwordInp.attr("type") == "password"
                ? passwordInp.attr("type", "text")
                : passwordInp.attr("type", "password");
        });
        return passwordInp;
    };
    $.fn.ajaxSubmit = function (url, method, IsStringFiable, complete, beforeSend) {
        if (IsStringFiable === void 0) { IsStringFiable = true; }
        var objectData = {};
        if (!$(this).valid())
            return false;
        $(this)
            .find("input")
            .each(function (i, inp) {
            var input = $(inp);
            var value = input.val().trim();
            if (value === "true" || value == "false")
                value = (value == "true")
                    ? true
                    : value == "false" ? false : value;
            objectData[input.attr("name")] = value;
        });
        complete($.ajax({
            url: url,
            data: IsStringFiable ? JSON.stringify(objectData) : objectData,
            method: method,
            beforeSend: function () {
                beforeSend();
            }
        }), objectData);
        return this;
    };
    $.fn.resetPassword = function () {
        this.find('input[type="password"]').val("");
        return this;
    };
    $.fn.toggleAttr = function (attr) {
        this.prop(attr) ? this.removeAttr(attr) : this.prop(attr, attr);
        return this;
    };
    $.fn.formAlert = function () {
        var formAlert = this.find(".formAlert")
            .eq(0)
            .fadeToggle();
        this.find("input").focus(function () {
            formAlert.fadeOut();
        });
        return formAlert;
    };
    $.notifyCatch = function (model) {
        var message = "لم يتم تنفيذ العملية ,لوجودمشكلة فى الخادم,حاول مرة اخرى";
        var notifyMessage = model && model.message ? model.message : message;
        return $.notify({ message: notifyMessage, title: "لقد فشلت العملية" });
    };
    $.UploadImage = function (BtnHandler, OnGotImgFile) {
        var btnContext;
        var input = $("<input type='file' accept='image/*' id='uploadImg' class=\"hidden\"/>");
        $(document.body).append(input);
        BtnHandler.click(function (e) {
            input.click();
            btnContext = $(e.target).parents('.CourseCardTemplate:eq(0)');
        });
        input.change(function (e) {
            var file = e.target.files[0];
            var extension = "." + file.name.split(".").pop();
            if (file.type.indexOf("image") == -1) {
                $.notify({
                    message: "هذة النوعية من الصور غير مدعومة"
                });
                return;
            }
            OnGotImgFile.bind(btnContext)(file, extension);
        });
    };
    $.fn.ShownOnlyIfChecked = function (TargetCheckedInput) {
        var _this = this;
        TargetCheckedInput.is(':checked')
            ? this.show().parents('.form-group:eq(0)').show()
            : this.hide().parents('.form-group:eq(0)').hide();
        TargetCheckedInput.change(function () {
            _this.toggle().parents('.form-group:eq(0)').toggle();
        });
        return this;
    };
})();
//# sourceMappingURL=helperDome.js.map