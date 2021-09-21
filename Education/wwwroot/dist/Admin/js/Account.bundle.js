/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Admin/JS/Account/Account.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Admin/Assests/BootstrapComponents/bootstrapNotify.js":
/*!******************************************************************!*\
  !*** ./src/Admin/Assests/BootstrapComponents/bootstrapNotify.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./bootstrapNotify.d.ts" />
var notifyTemplate = "\n <div data-notify=\"container\" class=\"col-xs-11 col-sm-4 alert bootstrapNotify alert-{0}\" role=\"alert\">\n    <button type=\"button\" aria-hidden=\"true\" class=\"close\" data-notify=\"dismiss\">&times;</button>\n    <span data-notify=\"icon\"></span> <span data-notify=\"title\">{1}</span>\n    <span data-notify=\"message\">{2}</span>\n    <div class=\"progress\" data-notify=\"progressbar\">\n      <div class=\"progress-bar progress-bar-{0}\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\">\n      </div>\n    </div>\n    <a href=\"{3}\" target=\"{4}\" data-notify=\"url\"></a>\n</div>\n";
var defaults = {
    element: 'body',
    position: null,
    type: "info",
    allow_dismiss: true,
    allow_duplicates: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
        from: "top",
        align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 9999999999999,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: notifyTemplate
};
String.format = function (params) {
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
    }
    return str;
};
function isDuplicateNotification(notification) {
    var isDupe = false;
    $('[data-notify="container"]').each(function (i, el) {
        var $el = $(el);
        var title = $el.find('[data-notify="title"]').text().trim();
        var message = $el.find('[data-notify="message"]').html().trim();
        // The input string might be different than the actual parsed HTML string!
        // (<br> vs <br /> for example)
        // So we have to force-parse this as HTML here!
        var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
        var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
        var isSameType = $el.hasClass('alert-' + notification.settings.type);
        if (isSameTitle && isSameMsg && isSameType) {
            //we found the dupe. Set the var and stop checking.
            isDupe = true;
        }
        return !isDupe;
    });
    return isDupe;
}
var Notify = /** @class */ (function () {
    function Notify(element, content, options) {
        this.element = element;
        this.content = content;
        this.options = options;
        this.contentObj = {
            content: {
                message: typeof content === 'object' ? content.message : content,
                title: content.title ? content.title : '',
                icon: content.icon ? content.icon : 'pe-7s-bell',
                url: content.url ? content.url : '#',
                target: content.target ? content.target : '-'
            }
        };
        this.notify = null;
        this.$ele = $();
        options = $.extend(true, {}, this.contentObj, options);
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        if (this.settings.content.target === "-") {
            this.settings.content.target = this.settings.url_target;
        }
        this.animations = {
            start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
            end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
        };
        if (typeof this.settings.offset === 'number') {
            this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            };
        }
        //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
        if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
            this.init();
        }
    }
    Notify.prototype.init = function () {
        var self = this;
        this.buildNotify();
        if (this.settings.content.icon) {
            this.setIcon();
        }
        if (this.settings.content.url != "#") {
            this.styleURL();
        }
        this.styleDismiss();
        this.placement();
        this.bind();
        this.notify = {
            $ele: this.$ele,
            update: function (command, update) {
                var commands = {};
                if (typeof command === "string") {
                    commands[command] = update;
                }
                else {
                    commands = command;
                }
                for (var cmd in commands) {
                    switch (cmd) {
                        case "type":
                            this.$ele.removeClass('alert-' + self.settings.type);
                            this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                            self.settings.type = commands[cmd];
                            this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                            break;
                        case "icon":
                            var $icon = this.$ele.find('[data-notify="icon"]');
                            if (self.settings.icon_type.toLowerCase() === 'class') {
                                $icon.removeClass(self.settings.content.icon).addClass(commands[cmd]);
                            }
                            else {
                                if (!$icon.is('img')) {
                                    $icon.find('img');
                                }
                                $icon.attr('src', commands[cmd]);
                            }
                            break;
                        case "progress":
                            var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                            this.$ele.data('notify-delay', newDelay);
                            this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                            break;
                        case "url":
                            this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                            break;
                        case "target":
                            this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
                    }
                }
                var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y.toString());
                self.reposition(posX);
            },
            close: function (doAnyAction) {
                self.close(doAnyAction);
            }
        };
    };
    Notify.prototype.buildNotify = function () {
        var content = this.settings.content;
        this.$ele = (typeof this.settings.template == "string")
            ? $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target))
            : this.settings.template;
        this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
        if (!this.settings.allow_dismiss) {
            this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
        }
        if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
            this.$ele.find('[data-notify="progressbar"]').remove();
        }
    };
    Notify.prototype.setIcon = function () {
        this.$ele.addClass('alert-with-icon');
        if (this.settings.icon_type.toLowerCase() === 'class') {
            this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon);
        }
        else {
            if (this.$ele.find('[data-notify="icon"]').is('img')) {
                this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
            }
            else {
                this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
            }
        }
    };
    Notify.prototype.styleDismiss = function () {
        this.$ele.find('[data-notify="dismiss"]').css({
            position: 'absolute',
            left: '10px',
            top: '50%',
            marginTop: '-13px',
            zIndex: this.settings.z_index + 2
        });
    };
    Notify.prototype.styleURL = function () {
        this.$ele.find('[data-notify="url"]').css({
            backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: this.settings.z_index + 1
        });
    };
    Notify.prototype.placement = function () {
        var _this = this;
        var self = this, offsetAmt = this.settings.offset.y, css = {
            display: 'inline-block',
            margin: '0px auto',
            position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
            transition: 'all .5s ease-in-out',
            zIndex: this.settings.z_index
        }, hasAnimation = false, settings = this.settings;
        $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])')
            .each(function () {
            var h = $(this).outerHeight();
            offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + h + parseInt(settings.spacing));
        });
        if (this.settings.newest_on_top === true) {
            offsetAmt = this.settings.offset.y;
        }
        css[(this.settings.placement.from)] = offsetAmt + 'px';
        switch (this.settings.placement.align) {
            case "left":
            case "right":
                css[this.settings.placement.align] = this.settings.offset.x + 'px';
                break;
            case "center":
                css.left = 0;
                css.right = 0;
                break;
        }
        this.$ele.css(css).addClass(this.settings.animate.enter);
        $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index, prefix) {
            self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
        });
        if (typeof this.settings.element == "string")
            $(this.settings.element).append(this.$ele);
        else
            this.settings.element.append(this.$ele);
        if (this.settings.newest_on_top === true) {
            offsetAmt = (offsetAmt + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
            this.reposition(offsetAmt);
        }
        if ($.isFunction(self.settings.onShow)) {
            self.settings.onShow.call(this.$ele);
        }
        this.$ele.one(this.animations.start, function () {
            hasAnimation = true;
        }).one(this.animations.end, function () {
            if ($.isFunction(self.settings.onShown)) {
                self.settings.onShown.call(this);
            }
        });
        setTimeout(function () {
            if (!hasAnimation) {
                if ($.isFunction(self.settings.onShown)) {
                    self.settings.onShown.call(_this.$ele);
                }
            }
        }, 600);
    };
    Notify.prototype.bind = function () {
        var self = this;
        this.$ele.find('[data-notify="dismiss"]').on('click', function () {
            self.close();
        });
        this.$ele.mouseover(function () {
            $(this).data('data-hover', "true");
        }).mouseout(function () {
            $(this).data('data-hover', "false");
        });
        this.$ele.data('data-hover', "false");
        if (this.settings.delay > 0) {
            self.$ele.data('notify-delay', self.settings.delay);
            var timer = setInterval(function () {
                var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
                if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
                    var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
                    self.$ele.data('notify-delay', delay);
                    self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
                }
                if (delay <= -(self.settings.timer)) {
                    clearInterval(timer);
                    self.close();
                }
            }, self.settings.timer);
        }
    };
    Notify.prototype.close = function (doAnyAction) {
        var self = this, posX = parseInt(this.$ele.css(this.settings.placement.from)), hasAnimation = false;
        this.$ele.data('closing', 'true').addClass(this.settings.animate.exit);
        self.reposition(posX);
        if ($.isFunction(self.settings.onClose)) {
            self.settings.onClose.call(this.$ele, doAnyAction);
        }
        this.$ele.one(this.animations.start, function () {
            hasAnimation = true;
        }).one(this.animations.end, function () {
            $(this).remove();
            if ($.isFunction(self.settings.onClosed)) {
                self.settings.onClosed.call(this);
            }
        });
        setTimeout(function () {
            if (!hasAnimation) {
                self.$ele.remove();
                if (self.settings.onClosed) {
                    self.settings.onClosed(self.$ele);
                }
            }
        }, 600);
    };
    Notify.prototype.reposition = function (posX) {
        var self = this, notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])', $elements = this.$ele.nextAll(notifies);
        if (this.settings.newest_on_top === true) {
            $elements = this.$ele.prevAll(notifies);
        }
        $elements.each(function () {
            $(this).css(self.settings.placement.from, posX);
            var h = $(this).outerHeight();
            posX = (parseInt(posX.toString()) + parseInt(self.settings.spacing)) + h;
        });
    };
    return Notify;
}());
$.notify = function (content, options) {
    var plugin = new Notify(this, content, options);
    return plugin.notify;
};
$.notifyDefaults = function (options) {
    defaults = $.extend(true, {}, defaults, options);
    return defaults;
};
$.notifyClose = function (command) {
    if (typeof command === "undefined" || command === "all") {
        $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    }
    else {
        $('[data-notify-position="' + command + '"]').find('[data-notify="dismiss"]').trigger('click');
    }
};
//# sourceMappingURL=bootstrapNotify.js.map

/***/ }),

/***/ "./src/Admin/JS/Account/Account.js":
/*!*****************************************!*\
  !*** ./src/Admin/JS/Account/Account.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../global/declaration.d.ts"/>
__webpack_require__(/*! ../../../global/setting */ "./src/global/setting.js");
__webpack_require__(/*! ../../../global/helperDome */ "./src/global/helperDome.js");
__webpack_require__(/*! ../../Assests/BootstrapComponents/bootstrapNotify */ "./src/Admin/Assests/BootstrapComponents/bootstrapNotify.js");
var Routes_1 = __webpack_require__(/*! ../../../global/Routes */ "./src/global/Routes.js");
var messages_1 = __webpack_require__(/*! ../../../global/messages */ "./src/global/messages.js");
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

/***/ }),

/***/ "./src/global/Routes.js":
/*!******************************!*\
  !*** ./src/global/Routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),

/***/ "./src/global/helperDome.js":
/*!**********************************!*\
  !*** ./src/global/helperDome.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./declaration.d.ts" />
__webpack_require__(/*! ../Admin/Assests/BootstrapComponents/bootstrapNotify */ "./src/Admin/Assests/BootstrapComponents/bootstrapNotify.js");
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

/***/ }),

/***/ "./src/global/messages.js":
/*!********************************!*\
  !*** ./src/global/messages.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = {
    serverError: "حدثت مشكلة اثناء معالجة الطلب من فضلك حاول مرة اخرى",
    error: "لا يمكن تنفيذ العملية بسبب وجود مشكلة زحاول ثانية",
    successOperation: "تم تنفيذ العملية بنجاح",
    changeAccountAlertion: 'تغيير بيانات حسابك سوف يؤدى بك الى تسجيل الخروج تقوم بالدخول مرة اخرى. هل انت متأكد من التغيير وتسجيل الخروج؟',
    redirectNotifing: 'سوف يتم تحويلك الى صفحة الدخول '
};
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ "./src/global/setting.js":
/*!*******************************!*\
  !*** ./src/global/setting.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0Fzc2VzdHMvQm9vdHN0cmFwQ29tcG9uZW50cy9ib290c3RyYXBOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0pTL0FjY291bnQvQWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsL1JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsL2hlbHBlckRvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC9tZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsL3NldHRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsZ0hBQWdILEVBQUUsb0hBQW9ILCtFQUErRSxFQUFFLDRDQUE0QyxFQUFFLGlIQUFpSCxFQUFFLHdHQUF3Ryw4Q0FBOEMsRUFBRSxhQUFhLEVBQUU7QUFDL25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QyxxQ0FBcUMsa0JBQWtCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7Ozs7Ozs7QUMzVmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG1CQUFPLENBQUMsd0RBQXlCO0FBQ2pDLG1CQUFPLENBQUMsOERBQTRCO0FBQ3BDLG1CQUFPLENBQUMscUhBQW1EO0FBQzNELGVBQWUsbUJBQU8sQ0FBQyxzREFBd0I7QUFDL0MsaUJBQWlCLG1CQUFPLENBQUMsMERBQTBCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLDBCQUEwQjtBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5Q0FBeUM7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7OztBQ25HYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCwyQkFBMkI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7OztBQzdCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsbUJBQU8sQ0FBQyx3SEFBc0Q7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyx1QkFBdUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxzQzs7Ozs7Ozs7Ozs7O0FDL0thO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7O0FDVGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QztBQUN6QyxtQyIsImZpbGUiOiIuL0FkbWluL2pzL0FjY291bnQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvQWRtaW4vSlMvQWNjb3VudC9BY2NvdW50LmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2Jvb3RzdHJhcE5vdGlmeS5kLnRzXCIgLz5cclxudmFyIG5vdGlmeVRlbXBsYXRlID0gXCJcXG4gPGRpdiBkYXRhLW5vdGlmeT1cXFwiY29udGFpbmVyXFxcIiBjbGFzcz1cXFwiY29sLXhzLTExIGNvbC1zbS00IGFsZXJ0IGJvb3RzdHJhcE5vdGlmeSBhbGVydC17MH1cXFwiIHJvbGU9XFxcImFsZXJ0XFxcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtbm90aWZ5PVxcXCJkaXNtaXNzXFxcIj4mdGltZXM7PC9idXR0b24+XFxuICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJpY29uXFxcIj48L3NwYW4+IDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJ0aXRsZVxcXCI+ezF9PC9zcGFuPlxcbiAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwibWVzc2FnZVxcXCI+ezJ9PC9zcGFuPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzc1xcXCIgZGF0YS1ub3RpZnk9XFxcInByb2dyZXNzYmFyXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXswfVxcXCIgcm9sZT1cXFwicHJvZ3Jlc3NiYXJcXFwiIGFyaWEtdmFsdWVub3c9XFxcIjBcXFwiIGFyaWEtdmFsdWVtaW49XFxcIjBcXFwiIGFyaWEtdmFsdWVtYXg9XFxcIjEwMFxcXCIgc3R5bGU9XFxcIndpZHRoOiAwJTtcXFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGEgaHJlZj1cXFwiezN9XFxcIiB0YXJnZXQ9XFxcIns0fVxcXCIgZGF0YS1ub3RpZnk9XFxcInVybFxcXCI+PC9hPlxcbjwvZGl2PlxcblwiO1xyXG52YXIgZGVmYXVsdHMgPSB7XHJcbiAgICBlbGVtZW50OiAnYm9keScsXHJcbiAgICBwb3NpdGlvbjogbnVsbCxcclxuICAgIHR5cGU6IFwiaW5mb1wiLFxyXG4gICAgYWxsb3dfZGlzbWlzczogdHJ1ZSxcclxuICAgIGFsbG93X2R1cGxpY2F0ZXM6IHRydWUsXHJcbiAgICBuZXdlc3Rfb25fdG9wOiBmYWxzZSxcclxuICAgIHNob3dQcm9ncmVzc2JhcjogZmFsc2UsXHJcbiAgICBwbGFjZW1lbnQ6IHtcclxuICAgICAgICBmcm9tOiBcInRvcFwiLFxyXG4gICAgICAgIGFsaWduOiBcInJpZ2h0XCJcclxuICAgIH0sXHJcbiAgICBvZmZzZXQ6IDIwLFxyXG4gICAgc3BhY2luZzogMTAsXHJcbiAgICB6X2luZGV4OiA5OTk5OTk5OTk5OTk5LFxyXG4gICAgZGVsYXk6IDUwMDAsXHJcbiAgICB0aW1lcjogMTAwMCxcclxuICAgIHVybF90YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgbW91c2Vfb3ZlcjogbnVsbCxcclxuICAgIGFuaW1hdGU6IHtcclxuICAgICAgICBlbnRlcjogJ2FuaW1hdGVkIGZhZGVJbkRvd24nLFxyXG4gICAgICAgIGV4aXQ6ICdhbmltYXRlZCBmYWRlT3V0VXAnXHJcbiAgICB9LFxyXG4gICAgb25TaG93OiBudWxsLFxyXG4gICAgb25TaG93bjogbnVsbCxcclxuICAgIG9uQ2xvc2U6IG51bGwsXHJcbiAgICBvbkNsb3NlZDogbnVsbCxcclxuICAgIGljb25fdHlwZTogJ2NsYXNzJyxcclxuICAgIHRlbXBsYXRlOiBub3RpZnlUZW1wbGF0ZVxyXG59O1xyXG5TdHJpbmcuZm9ybWF0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgdmFyIHN0ciA9IGFyZ3VtZW50c1swXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoUmVnRXhwKFwiXFxcXHtcIiArIChpIC0gMSkgKyBcIlxcXFx9XCIsIFwiZ21cIiksIGFyZ3VtZW50c1tpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG59O1xyXG5mdW5jdGlvbiBpc0R1cGxpY2F0ZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pIHtcclxuICAgIHZhciBpc0R1cGUgPSBmYWxzZTtcclxuICAgICQoJ1tkYXRhLW5vdGlmeT1cImNvbnRhaW5lclwiXScpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xyXG4gICAgICAgIHZhciB0aXRsZSA9ICRlbC5maW5kKCdbZGF0YS1ub3RpZnk9XCJ0aXRsZVwiXScpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAkZWwuZmluZCgnW2RhdGEtbm90aWZ5PVwibWVzc2FnZVwiXScpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgLy8gVGhlIGlucHV0IHN0cmluZyBtaWdodCBiZSBkaWZmZXJlbnQgdGhhbiB0aGUgYWN0dWFsIHBhcnNlZCBIVE1MIHN0cmluZyFcclxuICAgICAgICAvLyAoPGJyPiB2cyA8YnIgLz4gZm9yIGV4YW1wbGUpXHJcbiAgICAgICAgLy8gU28gd2UgaGF2ZSB0byBmb3JjZS1wYXJzZSB0aGlzIGFzIEhUTUwgaGVyZSFcclxuICAgICAgICB2YXIgaXNTYW1lVGl0bGUgPSB0aXRsZSA9PT0gJChcIjxkaXY+XCIgKyBub3RpZmljYXRpb24uc2V0dGluZ3MuY29udGVudC50aXRsZSArIFwiPC9kaXY+XCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIGlzU2FtZU1zZyA9IG1lc3NhZ2UgPT09ICQoXCI8ZGl2PlwiICsgbm90aWZpY2F0aW9uLnNldHRpbmdzLmNvbnRlbnQubWVzc2FnZSArIFwiPC9kaXY+XCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIGlzU2FtZVR5cGUgPSAkZWwuaGFzQ2xhc3MoJ2FsZXJ0LScgKyBub3RpZmljYXRpb24uc2V0dGluZ3MudHlwZSk7XHJcbiAgICAgICAgaWYgKGlzU2FtZVRpdGxlICYmIGlzU2FtZU1zZyAmJiBpc1NhbWVUeXBlKSB7XHJcbiAgICAgICAgICAgIC8vd2UgZm91bmQgdGhlIGR1cGUuIFNldCB0aGUgdmFyIGFuZCBzdG9wIGNoZWNraW5nLlxyXG4gICAgICAgICAgICBpc0R1cGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIWlzRHVwZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzRHVwZTtcclxufVxyXG52YXIgTm90aWZ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTm90aWZ5KGVsZW1lbnQsIGNvbnRlbnQsIG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLmNvbnRlbnRPYmogPSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0JyA/IGNvbnRlbnQubWVzc2FnZSA6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogY29udGVudC50aXRsZSA/IGNvbnRlbnQudGl0bGUgOiAnJyxcclxuICAgICAgICAgICAgICAgIGljb246IGNvbnRlbnQuaWNvbiA/IGNvbnRlbnQuaWNvbiA6ICdwZS03cy1iZWxsJyxcclxuICAgICAgICAgICAgICAgIHVybDogY29udGVudC51cmwgPyBjb250ZW50LnVybCA6ICcjJyxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogY29udGVudC50YXJnZXQgPyBjb250ZW50LnRhcmdldCA6ICctJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm5vdGlmeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy4kZWxlID0gJCgpO1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb250ZW50T2JqLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQudGFyZ2V0ID09PSBcIi1cIikge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRlbnQudGFyZ2V0ID0gdGhpcy5zZXR0aW5ncy51cmxfdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQgb2FuaW1hdGlvbnN0YXJ0IE1TQW5pbWF0aW9uU3RhcnQgYW5pbWF0aW9uc3RhcnQnLFxyXG4gICAgICAgICAgICBlbmQ6ICd3ZWJraXRBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBNU0FuaW1hdGlvbkVuZCBhbmltYXRpb25lbmQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub2Zmc2V0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLm9mZnNldCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHRoaXMuc2V0dGluZ3Mub2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy5zZXR0aW5ncy5vZmZzZXRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBkdXBsaWNhdGUgbWVzc2FnZXMgYXJlIG5vdCBhbGxvd2VkLCB0aGVuIG9ubHkgY29udGludWUgaWYgdGhpcyBuZXcgbWVzc2FnZSBpcyBub3QgYSBkdXBsaWNhdGUgb2Ygb25lIHRoYXQgaXQgYWxyZWFkeSBzaG93aW5nXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlcyB8fCAoIXRoaXMuc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlcyAmJiAhaXNEdXBsaWNhdGVOb3RpZmljYXRpb24odGhpcykpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIE5vdGlmeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5idWlsZE5vdGlmeSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNldEljb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGVudC51cmwgIT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZVVSTCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0eWxlRGlzbWlzcygpO1xyXG4gICAgICAgIHRoaXMucGxhY2VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5iaW5kKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkgPSB7XHJcbiAgICAgICAgICAgICRlbGU6IHRoaXMuJGVsZSxcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoY29tbWFuZCwgdXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZHMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzW2NvbW1hbmRdID0gdXBkYXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMgPSBjb21tYW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY21kIGluIGNvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjbWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInR5cGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5yZW1vdmVDbGFzcygnYWxlcnQtJyArIHNlbGYuc2V0dGluZ3MudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiAucHJvZ3Jlc3MtYmFyJykucmVtb3ZlQ2xhc3MoJ3Byb2dyZXNzLWJhci0nICsgc2VsZi5zZXR0aW5ncy50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3MudHlwZSA9IGNvbW1hbmRzW2NtZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuYWRkQ2xhc3MoJ2FsZXJ0LScgKyBjb21tYW5kc1tjbWRdKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXSA+IC5wcm9ncmVzcy1iYXInKS5hZGRDbGFzcygncHJvZ3Jlc3MtYmFyLScgKyBjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWNvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpY29uID0gdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLmljb25fdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGljb24ucmVtb3ZlQ2xhc3Moc2VsZi5zZXR0aW5ncy5jb250ZW50Lmljb24pLmFkZENsYXNzKGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkaWNvbi5pcygnaW1nJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGljb24uZmluZCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpY29uLmF0dHIoJ3NyYycsIGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9ncmVzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RlbGF5ID0gc2VsZi5zZXR0aW5ncy5kZWxheSAtIChzZWxmLnNldHRpbmdzLmRlbGF5ICogKGNvbW1hbmRzW2NtZF0gLyAxMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknLCBuZXdEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiBkaXYnKS5hdHRyKCdhcmlhLXZhbHVlbm93JywgY29tbWFuZHNbY21kXSkuY3NzKCd3aWR0aCcsIGNvbW1hbmRzW2NtZF0gKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cmxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJ1cmxcIl0nKS5hdHRyKCdocmVmJywgY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInVybFwiXScpLmF0dHIoJ3RhcmdldCcsIGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiJyArIGNtZCArICdcIl0nKS5odG1sKGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBwb3NYID0gdGhpcy4kZWxlLm91dGVySGVpZ2h0KCkgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLnNwYWNpbmcpICsgcGFyc2VJbnQoc2VsZi5zZXR0aW5ncy5vZmZzZXQueS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVwb3NpdGlvbihwb3NYKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZShkb0FueUFjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuYnVpbGROb3RpZnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnNldHRpbmdzLmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy4kZWxlID0gKHR5cGVvZiB0aGlzLnNldHRpbmdzLnRlbXBsYXRlID09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgID8gJChTdHJpbmcuZm9ybWF0KHRoaXMuc2V0dGluZ3MudGVtcGxhdGUsIHRoaXMuc2V0dGluZ3MudHlwZSwgY29udGVudC50aXRsZSwgY29udGVudC5tZXNzYWdlLCBjb250ZW50LnVybCwgY29udGVudC50YXJnZXQpKVxyXG4gICAgICAgICAgICA6IHRoaXMuc2V0dGluZ3MudGVtcGxhdGU7XHJcbiAgICAgICAgdGhpcy4kZWxlLmF0dHIoJ2RhdGEtbm90aWZ5LXBvc2l0aW9uJywgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSArICctJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduKTtcclxuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuYWxsb3dfZGlzbWlzcykge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgodGhpcy5zZXR0aW5ncy5kZWxheSA8PSAwICYmICF0aGlzLnNldHRpbmdzLnNob3dQcm9ncmVzc2JhcikgfHwgIXRoaXMuc2V0dGluZ3Muc2hvd1Byb2dyZXNzYmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXScpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnNldEljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy4kZWxlLmFkZENsYXNzKCdhbGVydC13aXRoLWljb24nKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5pY29uX3R5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuY29udGVudC5pY29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmlzKCdpbWcnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5hdHRyKCdzcmMnLCB0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmFwcGVuZCgnPGltZyBzcmM9XCInICsgdGhpcy5zZXR0aW5ncy5jb250ZW50Lmljb24gKyAnXCIgYWx0PVwiTm90aWZ5IEljb25cIiAvPicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuc3R5bGVEaXNtaXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIGxlZnQ6ICcxMHB4JyxcclxuICAgICAgICAgICAgdG9wOiAnNTAlJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnLTEzcHgnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRoaXMuc2V0dGluZ3Muel9pbmRleCArIDJcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnN0eWxlVVJMID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJ1cmxcIl0nKS5jc3Moe1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3KScsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRoaXMuc2V0dGluZ3Muel9pbmRleCArIDFcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgb2Zmc2V0QW10ID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueSwgY3NzID0ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgbWFyZ2luOiAnMHB4IGF1dG8nLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA/IHRoaXMuc2V0dGluZ3MucG9zaXRpb24gOiAodGhpcy5zZXR0aW5ncy5lbGVtZW50ID09PSAnYm9keScgPyAnZml4ZWQnIDogJ2Fic29sdXRlJyksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjVzIGVhc2UtaW4tb3V0JyxcclxuICAgICAgICAgICAgekluZGV4OiB0aGlzLnNldHRpbmdzLnpfaW5kZXhcclxuICAgICAgICB9LCBoYXNBbmltYXRpb24gPSBmYWxzZSwgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xyXG4gICAgICAgICQoJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24gKyAnXCJdOm5vdChbZGF0YS1jbG9zaW5nPVwidHJ1ZVwiXSknKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICBvZmZzZXRBbXQgPSBNYXRoLm1heChvZmZzZXRBbXQsIHBhcnNlSW50KCQodGhpcykuY3NzKHNldHRpbmdzLnBsYWNlbWVudC5mcm9tKSkgKyBoICsgcGFyc2VJbnQoc2V0dGluZ3Muc3BhY2luZykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5ld2VzdF9vbl90b3AgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgb2Zmc2V0QW10ID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3NzWyh0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tKV0gPSBvZmZzZXRBbXQgKyAncHgnO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XHJcbiAgICAgICAgICAgICAgICBjc3NbdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ25dID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxyXG4gICAgICAgICAgICAgICAgY3NzLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgY3NzLnJpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRlbGUuY3NzKGNzcykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hbmltYXRlLmVudGVyKTtcclxuICAgICAgICAkLmVhY2goQXJyYXkoJ3dlYmtpdC0nLCAnbW96LScsICdvLScsICdtcy0nLCAnJyksIGZ1bmN0aW9uIChpbmRleCwgcHJlZml4KSB7XHJcbiAgICAgICAgICAgIHNlbGYuJGVsZVswXS5zdHlsZVtwcmVmaXggKyAnQW5pbWF0aW9uSXRlcmF0aW9uQ291bnQnXSA9IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLmVsZW1lbnQgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgJCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpLmFwcGVuZCh0aGlzLiRlbGUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5lbGVtZW50LmFwcGVuZCh0aGlzLiRlbGUpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5ld2VzdF9vbl90b3AgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgb2Zmc2V0QW10ID0gKG9mZnNldEFtdCArIHBhcnNlSW50KHRoaXMuc2V0dGluZ3Muc3BhY2luZykpICsgdGhpcy4kZWxlLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVwb3NpdGlvbihvZmZzZXRBbXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25TaG93KSkge1xyXG4gICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvdy5jYWxsKHRoaXMuJGVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGVsZS5vbmUodGhpcy5hbmltYXRpb25zLnN0YXJ0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhhc0FuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfSkub25lKHRoaXMuYW5pbWF0aW9ucy5lbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvd24pKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvd24uY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc0FuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvd24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vblNob3duLmNhbGwoX3RoaXMuJGVsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA2MDApO1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbGUubW91c2VvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdkYXRhLWhvdmVyJywgXCJ0cnVlXCIpO1xyXG4gICAgICAgIH0pLm1vdXNlb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdkYXRhLWhvdmVyJywgXCJmYWxzZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbGUuZGF0YSgnZGF0YS1ob3ZlcicsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNlbGYuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknLCBzZWxmLnNldHRpbmdzLmRlbGF5KTtcclxuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlbGF5ID0gcGFyc2VJbnQoc2VsZi4kZWxlLmRhdGEoJ25vdGlmeS1kZWxheScpKSAtIHNlbGYuc2V0dGluZ3MudGltZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGYuJGVsZS5kYXRhKCdkYXRhLWhvdmVyJykgPT09ICdmYWxzZScgJiYgc2VsZi5zZXR0aW5ncy5tb3VzZV9vdmVyID09PSBcInBhdXNlXCIpIHx8IHNlbGYuc2V0dGluZ3MubW91c2Vfb3ZlciAhPSBcInBhdXNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9ICgoc2VsZi5zZXR0aW5ncy5kZWxheSAtIGRlbGF5KSAvIHNlbGYuc2V0dGluZ3MuZGVsYXkpICogMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknLCBkZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gZGl2JykuYXR0cignYXJpYS12YWx1ZW5vdycsIHBlcmNlbnQpLmNzcygnd2lkdGgnLCBwZXJjZW50ICsgJyUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkZWxheSA8PSAtKHNlbGYuc2V0dGluZ3MudGltZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBzZWxmLnNldHRpbmdzLnRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgcG9zWCA9IHBhcnNlSW50KHRoaXMuJGVsZS5jc3ModGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSkpLCBoYXNBbmltYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRlbGUuZGF0YSgnY2xvc2luZycsICd0cnVlJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hbmltYXRlLmV4aXQpO1xyXG4gICAgICAgIHNlbGYucmVwb3NpdGlvbihwb3NYKTtcclxuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25DbG9zZSkpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNsb3NlLmNhbGwodGhpcy4kZWxlLCBkb0FueUFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGVsZS5vbmUodGhpcy5hbmltYXRpb25zLnN0YXJ0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhhc0FuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfSkub25lKHRoaXMuYW5pbWF0aW9ucy5lbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNsb3NlZC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5vbkNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbG9zZWQoc2VsZi4kZWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDYwMCk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5yZXBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc1gpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIG5vdGlmaWVzID0gJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24gKyAnXCJdOm5vdChbZGF0YS1jbG9zaW5nPVwidHJ1ZVwiXSknLCAkZWxlbWVudHMgPSB0aGlzLiRlbGUubmV4dEFsbChub3RpZmllcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubmV3ZXN0X29uX3RvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudHMgPSB0aGlzLiRlbGUucHJldkFsbChub3RpZmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3Moc2VsZi5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSwgcG9zWCk7XHJcbiAgICAgICAgICAgIHZhciBoID0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICBwb3NYID0gKHBhcnNlSW50KHBvc1gudG9TdHJpbmcoKSkgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLnNwYWNpbmcpKSArIGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE5vdGlmeTtcclxufSgpKTtcclxuJC5ub3RpZnkgPSBmdW5jdGlvbiAoY29udGVudCwgb3B0aW9ucykge1xyXG4gICAgdmFyIHBsdWdpbiA9IG5ldyBOb3RpZnkodGhpcywgY29udGVudCwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gcGx1Z2luLm5vdGlmeTtcclxufTtcclxuJC5ub3RpZnlEZWZhdWx0cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBkZWZhdWx0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gZGVmYXVsdHM7XHJcbn07XHJcbiQubm90aWZ5Q2xvc2UgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xyXG4gICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSBcInVuZGVmaW5lZFwiIHx8IGNvbW1hbmQgPT09IFwiYWxsXCIpIHtcclxuICAgICAgICAkKCdbZGF0YS1ub3RpZnldJykuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCdbZGF0YS1ub3RpZnktcG9zaXRpb249XCInICsgY29tbWFuZCArICdcIl0nKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgIH1cclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdHN0cmFwTm90aWZ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9nbG9iYWwvZGVjbGFyYXRpb24uZC50c1wiLz5cclxucmVxdWlyZShcIi4uLy4uLy4uL2dsb2JhbC9zZXR0aW5nXCIpO1xyXG5yZXF1aXJlKFwiLi4vLi4vLi4vZ2xvYmFsL2hlbHBlckRvbWVcIik7XHJcbnJlcXVpcmUoXCIuLi8uLi9Bc3Nlc3RzL0Jvb3RzdHJhcENvbXBvbmVudHMvYm9vdHN0cmFwTm90aWZ5XCIpO1xyXG52YXIgUm91dGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vZ2xvYmFsL1JvdXRlc1wiKTtcclxudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vZ2xvYmFsL21lc3NhZ2VzXCIpO1xyXG52YXIgY2hhbmdlTmFtZU9wZXJhdGlvbiA9IHtcclxuICAgIFVwZGF0ZU5hbWVGb3JtOiAkKCcjVXBkYXRlTmFtZUZvcm0nKSxcclxuICAgIGdldCBOYW1lU3VibWl0QnRuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlVwZGF0ZU5hbWVGb3JtLmZpbmQoJyNOYW1lU3VibWl0QnRuJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IE5hbWVJbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5VcGRhdGVOYW1lRm9ybS5maW5kKCcjTmFtZScpO1xyXG4gICAgfSxcclxuICAgIEhhbmRsZU9uTmFtZVVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVOYW1lRm9ybS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgU3VibWl0QnRuID0gX3RoaXMuTmFtZVN1Ym1pdEJ0bjtcclxuICAgICAgICAgICAgdmFyIE5hbWUgPSBfdGhpcy5OYW1lSW5wdXQudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5OYW1lSW5wdXQudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRlc18xLlJvdXRlcy5tYWtlVXJsUXVlcnkoUm91dGVzXzEuUm91dGVzLlVwZGF0ZUFjY291bnROYW1lLCB7IHByb3A6IFwiTmFtZVwiLCB2YWw6IE5hbWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1Ym1pdEJ0bi5wZW5kaW5nU3RhdGUodHJ1ZSwgXCJmYS1zZW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3VibWl0QnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcItiq2YUg2KrYutmK2YrYsSDYp9mE2KfYs9mFINio2YbYrNin2K1cIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjogNDAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn07XHJcbnZhciBjaGFuZ2VBY2NvdW50T3BlcmF0aW9uID0ge1xyXG4gICAgVXBkYXRlQWNjb3VudEZvcm06ICQoJyNVcGRhdGVBY2NvdW50Rm9ybScpLFxyXG4gICAgZ2V0IEFjY291bnRTdWJtaXRCdG4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVXBkYXRlQWNjb3VudEZvcm0uZmluZCgnI2FjY291bnRTYXZlQnRuJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHVzZXJOYW1lSW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVXBkYXRlQWNjb3VudEZvcm0uZmluZCgnI1VzZXJOYW1lJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHBhc3N3b3JkSW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVXBkYXRlQWNjb3VudEZvcm0uZmluZCgnI3Bhc3N3b3JkJyk7XHJcbiAgICB9LFxyXG4gICAgY29uZmlyZW1NZXNzYWdlOiBtZXNzYWdlc18xLm1lc3NhZ2VzLmNoYW5nZUFjY291bnRBbGVydGlvbixcclxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uIChVc2VyTmFtZSwgUGFzc3dvcmQsIFN1Ym1pdEJ0bikge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogUm91dGVzXzEuUm91dGVzLlVwZGF0ZUFjY291bnQsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFVzZXJOYW1lOiBVc2VyTmFtZSwgUGFzc3dvcmQ6IFBhc3N3b3JkIH0pLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBTdWJtaXRCdG4ucGVuZGluZ1N0YXRlKHRydWUsIFwiZmEtc2VuZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTdWJtaXRCdG4ucGVuZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlc18xLm1lc3NhZ2VzLnJlZGlyZWN0Tm90aWZpbmcsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gUm91dGVzXzEuUm91dGVzLmFkbWluQXJlYTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlT25BY2NvdW50VXBhZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZElucHV0LmFkZFBhc3N3b3JkU2hvdygpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQWNjb3VudEZvcm0uc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIFN1Ym1pdEJ0biA9IF90aGlzLkFjY291bnRTdWJtaXRCdG47XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy51c2VyTmFtZUlucHV0LnZhbGlkKCkgJiYgX3RoaXMucGFzc3dvcmRJbnB1dC52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgVXNlck5hbWVfMSA9IF90aGlzLnVzZXJOYW1lSW5wdXQudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIFBhc3N3b3JkXzEgPSBfdGhpcy5wYXNzd29yZElucHV0LnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICQuY29uZmlybU5vdGlmeShfdGhpcy5jb25maXJlbU1lc3NhZ2UsIGZ1bmN0aW9uIChpc0NvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbmZpcm1lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3VibWl0Rm9ybShVc2VyTmFtZV8xLCBQYXNzd29yZF8xLCBTdWJtaXRCdG4pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn07XHJcbmNoYW5nZU5hbWVPcGVyYXRpb24uSGFuZGxlT25OYW1lVXBkYXRlKCk7XHJcbmNoYW5nZUFjY291bnRPcGVyYXRpb24uSGFuZGxlT25BY2NvdW50VXBhZGF0ZSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY2NvdW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUm91dGVzID0ge1xyXG4gICAgYmFzZTogbG9jYXRpb24ub3JpZ2luLFxyXG4gICAgZ2V0IGFkbWluQXJlYSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYXNlICsgXCIvQWRtaW5cIjtcclxuICAgIH0sXHJcbiAgICBnZXQgQWRtaW5BcGkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZSArIFwiL0FkbWluQXBpXCI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IFVwZGF0ZUFjY291bnROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkbWluQXJlYSArIFwiL1VwZGF0ZU5hbWVcIjtcclxuICAgIH0sXHJcbiAgICBnZXQgVXBkYXRlQWNjb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZG1pbkFyZWEgKyBcIi9VcGRhdGVBY2NvdW50XCI7XHJcbiAgICB9LFxyXG4gICAgbWFrZVVybFF1ZXJ5OiBmdW5jdGlvbiAoYmFzZSkge1xyXG4gICAgICAgIHZhciByb3V0ZVZhbHVlcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHJvdXRlVmFsdWVzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RyID0gXCJcIiArIGJhc2U7XHJcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCByb3V0ZVZhbHVlc18xID0gcm91dGVWYWx1ZXM7IF9hIDwgcm91dGVWYWx1ZXNfMS5sZW5ndGg7IF9hKyspIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSByb3V0ZVZhbHVlc18xW19hXTtcclxuICAgICAgICAgICAgc3RyICs9IFwiP1wiICsgcHJvcC5wcm9wICsgXCI9XCIgKyBwcm9wLnZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Um91dGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2RlY2xhcmF0aW9uLmQudHNcIiAvPlxyXG5yZXF1aXJlKFwiLi4vQWRtaW4vQXNzZXN0cy9Cb290c3RyYXBDb21wb25lbnRzL2Jvb3RzdHJhcE5vdGlmeVwiKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQuZm4ucGVuZGluZ1N0YXRlID0gZnVuY3Rpb24gKGlzUGVuZGluZywgcmVtb3ZlZENsYXNzLCBhbmltYXRpbmdDbGFzcykge1xyXG4gICAgICAgIGlmICghYW5pbWF0aW5nQ2xhc3MpXHJcbiAgICAgICAgICAgIGFuaW1hdGluZ0NsYXNzID0gXCJmYS1zcGlubmVyIGZhLXNwaW5cIjtcclxuICAgICAgICBpZiAocmVtb3ZlZENsYXNzKVxyXG4gICAgICAgICAgICB0aGlzLmRhdGEoXCJjbGFzc1wiLCByZW1vdmVkQ2xhc3MpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmVtb3ZlZENsYXNzID0gdGhpcy5kYXRhKFwiY2xhc3NcIik7XHJcbiAgICAgICAgdGhpcy50b2dnbGVDbGFzcyhcImRpc2FibGVkXCIpLnRvZ2dsZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBpZiAoaXNQZW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZChcImlcIilcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYW5pbWF0aW5nQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kKFwiaVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHJlbW92ZWRDbGFzcylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4uc3dpdGNoUGVuZGluZ1N0YXRlID0gZnVuY3Rpb24gKGlzUGVuZGluZywgcmVtb3ZlZENsYXNzLCBhbmltYXRpbmdDbGFzcykge1xyXG4gICAgICAgIGlmICghYW5pbWF0aW5nQ2xhc3MpXHJcbiAgICAgICAgICAgIGFuaW1hdGluZ0NsYXNzID0gXCJmYS1zcGlubmVyIGZhLXNwaW5cIjtcclxuICAgICAgICBpZiAocmVtb3ZlZENsYXNzKVxyXG4gICAgICAgICAgICB0aGlzLmRhdGEoXCJjbGFzc1wiLCByZW1vdmVkQ2xhc3MpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmVtb3ZlZENsYXNzID0gdGhpcy5kYXRhKFwiY2xhc3NcIik7XHJcbiAgICAgICAgdGhpcy50b2dnbGVDbGFzcyhcImRpc2FibGVkXCIpLnRvZ2dsZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBpZiAoaXNQZW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MocmVtb3ZlZENsYXNzKS5hZGRDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKHJlbW92ZWRDbGFzcykucmVtb3ZlQ2xhc3MoYW5pbWF0aW5nQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAkLmNvbmZpcm1Ob3RpZnkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb25maXJtVGVtcGxhdGUgPSBcIlxcbiAgICAgICAgICAgIDxkaXYgZGF0YS1ub3RpZnk9XFxcImNvbnRhaW5lclxcXCIgXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJjb2wteHMtMTEgY29sLXNtLTQgYWxlcnQgYWxlcnQtaW5mbyBhbGVydC13aXRoLWljb24gYW5pbWF0ZWQgZmFkZUluRG93biBib290c3RyYXBOb3RpZnlcXFwiXFxuICAgICAgICAgICAgICAgIHJvbGU9XFxcImFsZXJ0XFxcIiBkYXRhLW5vdGlmeS1wb3NpdGlvbj1cXFwidG9wLWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLW5vdGlmeT1cXFwiZGlzbWlzc1xcXCI+XFx1MDBENzwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwiaWNvblxcXCIgY2xhc3M9XFxcInBlLTdzLWNoZWNrXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJ0aXRsZVxcXCI+PC9zcGFuPiBcXG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1ub3RpZnk9XFxcIm1lc3NhZ2VcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInRleHQtY2VudGVyIGNvbmZpcm1Db250cm9sc1xcXCI+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnkgYnRuLXNtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jaGVja1xcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgXFx1MDYyQVxcdTA2MjNcXHUwNjQzXFx1MDY0QVxcdTA2MkZcXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGFuZ2VyIGJ0bi1zbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtY2xvc2VcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgIFxcdTA2MjdcXHUwNjQ0XFx1MDYzQVxcdTA2MjdcXHUwNjIxXFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBkYXRhLW5vdGlmeT1cXFwidXJsXFxcIj48L2E+XFxuICAgICAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBvbkNvbmZpcm0pIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gJChjb25maXJtVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB2YXIgY29udHJvbHNidG4gPSB0ZW1wbGF0ZS5maW5kKFwiLmNvbmZpcm1Db250cm9scyBidXR0b25cIik7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzYnRuXHJcbiAgICAgICAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgICAgICAgIC5kYXRhKFwicmVzdWx0XCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5lcSgxKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoXCJyZXN1bHRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5maW5kKCdzcGFuW2RhdGEtbm90aWZ5PVwibWVzc2FnZVwiXScpLnRleHQobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzYnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpcm0uY2xvc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgb25Db25maXJtKCQodGhpcykuZGF0YShcInJlc3VsdFwiKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlybSA9ICQubm90aWZ5KHt9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoZG9BbnlBY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9BbnlBY3Rpb24gPT09IHZvaWQgMCkgeyBkb0FueUFjdGlvbiA9IHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9BbnlBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGltZXI6IDQwMDAwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuICAgICQuZm4uYWRkUGFzc3dvcmRTaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwYXNzd29yZElucCA9ICQodGhpcyk7XHJcbiAgICAgICAgaWYgKHBhc3N3b3JkSW5wLmF0dHIoXCJ0eXBlXCIpICE9IFwicGFzc3dvcmRcIilcclxuICAgICAgICAgICAgcmV0dXJuIHBhc3N3b3JkSW5wO1xyXG4gICAgICAgIHZhciBleWVJY29uID0gJCgnPGkgY2xhc3M9XCJmYSBmYS1leWUgZmEtbGdcIj48L2k+Jyk7XHJcbiAgICAgICAgcGFzc3dvcmRJbnAuYWZ0ZXIoZXllSWNvbik7XHJcbiAgICAgICAgdmFyIHRvcE9mZnNldCA9IHBhc3N3b3JkSW5wLm91dGVySGVpZ2h0KCkgLVxyXG4gICAgICAgICAgICBwYXNzd29yZElucC5oZWlnaHQoKSAvIDI7XHJcbiAgICAgICAgZXllSWNvblxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgbGVmdDogXCIxJVwiLFxyXG4gICAgICAgICAgICB0b3A6IFwiY2FsYygxMDAlIC0gXCIgKyB0b3BPZmZzZXQgKyBcInB4KVwiLFxyXG4gICAgICAgICAgICBjb2xvcjogXCIjMzM3YWI3XCIsXHJcbiAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIikgPT0gXCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICA/IHBhc3N3b3JkSW5wLmF0dHIoXCJ0eXBlXCIsIFwidGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgOiBwYXNzd29yZElucC5hdHRyKFwidHlwZVwiLCBcInBhc3N3b3JkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYXNzd29yZElucDtcclxuICAgIH07XHJcbiAgICAkLmZuLmFqYXhTdWJtaXQgPSBmdW5jdGlvbiAodXJsLCBtZXRob2QsIElzU3RyaW5nRmlhYmxlLCBjb21wbGV0ZSwgYmVmb3JlU2VuZCkge1xyXG4gICAgICAgIGlmIChJc1N0cmluZ0ZpYWJsZSA9PT0gdm9pZCAwKSB7IElzU3RyaW5nRmlhYmxlID0gdHJ1ZTsgfVxyXG4gICAgICAgIHZhciBvYmplY3REYXRhID0ge307XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLnZhbGlkKCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5maW5kKFwiaW5wdXRcIilcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGksIGlucCkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKGlucCk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlucHV0LnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PSBcImZhbHNlXCIpXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZSA9PSBcInRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlID09IFwiZmFsc2VcIiA/IGZhbHNlIDogdmFsdWU7XHJcbiAgICAgICAgICAgIG9iamVjdERhdGFbaW5wdXQuYXR0cihcIm5hbWVcIildID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29tcGxldGUoJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IElzU3RyaW5nRmlhYmxlID8gSlNPTi5zdHJpbmdpZnkob2JqZWN0RGF0YSkgOiBvYmplY3REYXRhLFxyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksIG9iamVjdERhdGEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4ucmVzZXRQYXNzd29yZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLnZhbChcIlwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAkLmZuLnRvZ2dsZUF0dHIgPSBmdW5jdGlvbiAoYXR0cikge1xyXG4gICAgICAgIHRoaXMucHJvcChhdHRyKSA/IHRoaXMucmVtb3ZlQXR0cihhdHRyKSA6IHRoaXMucHJvcChhdHRyLCBhdHRyKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAkLmZuLmZvcm1BbGVydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZm9ybUFsZXJ0ID0gdGhpcy5maW5kKFwiLmZvcm1BbGVydFwiKVxyXG4gICAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgICAgLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB0aGlzLmZpbmQoXCJpbnB1dFwiKS5mb2N1cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvcm1BbGVydC5mYWRlT3V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1BbGVydDtcclxuICAgIH07XHJcbiAgICAkLm5vdGlmeUNhdGNoID0gZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItmE2YUg2YrYqtmFINiq2YbZgdmK2LAg2KfZhNi52YXZhNmK2KkgLNmE2YjYrNmI2K/Zhdi02YPZhNipINmB2Ykg2KfZhNiu2KfYr9mFLNit2KfZiNmEINmF2LHYqSDYp9iu2LHZiVwiO1xyXG4gICAgICAgIHZhciBub3RpZnlNZXNzYWdlID0gbW9kZWwgJiYgbW9kZWwubWVzc2FnZSA/IG1vZGVsLm1lc3NhZ2UgOiBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiAkLm5vdGlmeSh7IG1lc3NhZ2U6IG5vdGlmeU1lc3NhZ2UsIHRpdGxlOiBcItmE2YLYryDZgdi02YTYqiDYp9mE2LnZhdmE2YrYqVwiIH0pO1xyXG4gICAgfTtcclxuICAgICQuVXBsb2FkSW1hZ2UgPSBmdW5jdGlvbiAoQnRuSGFuZGxlciwgT25Hb3RJbWdGaWxlKSB7XHJcbiAgICAgICAgdmFyIGJ0bkNvbnRleHQ7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gJChcIjxpbnB1dCB0eXBlPSdmaWxlJyBhY2NlcHQ9J2ltYWdlLyonIGlkPSd1cGxvYWRJbWcnIGNsYXNzPVxcXCJoaWRkZW5cXFwiLz5cIik7XHJcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgIEJ0bkhhbmRsZXIuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgYnRuQ29udGV4dCA9ICQoZS50YXJnZXQpLnBhcmVudHMoJy5Db3Vyc2VDYXJkVGVtcGxhdGU6ZXEoMCknKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpbnB1dC5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcclxuICAgICAgICAgICAgdmFyIGV4dGVuc2lvbiA9IFwiLlwiICsgZmlsZS5uYW1lLnNwbGl0KFwiLlwiKS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKGZpbGUudHlwZS5pbmRleE9mKFwiaW1hZ2VcIikgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICQubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcItmH2LDYqSDYp9mE2YbZiNi52YrYqSDZhdmGINin2YTYtdmI2LEg2LrZitixINmF2K/YudmI2YXYqVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPbkdvdEltZ0ZpbGUuYmluZChidG5Db250ZXh0KShmaWxlLCBleHRlbnNpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgICQuZm4uU2hvd25Pbmx5SWZDaGVja2VkID0gZnVuY3Rpb24gKFRhcmdldENoZWNrZWRJbnB1dCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgVGFyZ2V0Q2hlY2tlZElucHV0LmlzKCc6Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgID8gdGhpcy5zaG93KCkucGFyZW50cygnLmZvcm0tZ3JvdXA6ZXEoMCknKS5zaG93KClcclxuICAgICAgICAgICAgOiB0aGlzLmhpZGUoKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLmhpZGUoKTtcclxuICAgICAgICBUYXJnZXRDaGVja2VkSW5wdXQuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCkucGFyZW50cygnLmZvcm0tZ3JvdXA6ZXEoMCknKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbn0pKCk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlckRvbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5tZXNzYWdlcyA9IHtcclxuICAgIHNlcnZlckVycm9yOiBcItit2K/Yq9iqINmF2LTZg9mE2Kkg2KfYq9mG2KfYoSDZhdi52KfZhNis2Kkg2KfZhNi32YTYqCDZhdmGINmB2LbZhNmDINit2KfZiNmEINmF2LHYqSDYp9iu2LHZiVwiLFxyXG4gICAgZXJyb3I6IFwi2YTYpyDZitmF2YPZhiDYqtmG2YHZitiwINin2YTYudmF2YTZitipINio2LPYqNioINmI2KzZiNivINmF2LTZg9mE2Kkg2LLYrdin2YjZhCDYq9in2YbZitipXCIsXHJcbiAgICBzdWNjZXNzT3BlcmF0aW9uOiBcItiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqSDYqNmG2KzYp9itXCIsXHJcbiAgICBjaGFuZ2VBY2NvdW50QWxlcnRpb246ICfYqti62YrZitixINio2YrYp9mG2KfYqiDYrdiz2KfYqNmDINiz2YjZgSDZitik2K/ZiSDYqNmDINin2YTZiSDYqtiz2KzZitmEINin2YTYrtix2YjYrCDYqtmC2YjZhSDYqNin2YTYr9iu2YjZhCDZhdix2Kkg2KfYrtix2YkuINmH2YQg2KfZhtiqINmF2KrYo9mD2K8g2YXZhiDYp9mE2KrYutmK2YrYsSDZiNiq2LPYrNmK2YQg2KfZhNiu2LHZiNis2J8nLFxyXG4gICAgcmVkaXJlY3ROb3RpZmluZzogJ9iz2YjZgSDZitiq2YUg2KrYrdmI2YrZhNmDINin2YTZiSDYtdmB2K3YqSDYp9mE2K/YrtmI2YQgJ1xyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXNzYWdlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4kLmFqYXhTZXR0aW5ncy5jb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xyXG4kLmFqYXhTZXR0aW5ncy5lcnJvciA9IGZ1bmN0aW9uIChqcVhIUiwgZXJyb3JUeXBlLCBleGVjcHRpb25PYmopIHtcclxuICAgIC8vaGFuZGxlIG9uIGVycm9yIG9jY3VyZVxyXG59O1xyXG52YXIgUmVzcXVlc3RTdGF0dXM7XHJcbihmdW5jdGlvbiAoUmVzcXVlc3RTdGF0dXMpIHtcclxuICAgIFJlc3F1ZXN0U3RhdHVzW1Jlc3F1ZXN0U3RhdHVzW1wiRXJyb3JcIl0gPSAwXSA9IFwiRXJyb3JcIjtcclxuICAgIFJlc3F1ZXN0U3RhdHVzW1Jlc3F1ZXN0U3RhdHVzW1wiTm90Rm91bmRcIl0gPSAxXSA9IFwiTm90Rm91bmRcIjtcclxuICAgIFJlc3F1ZXN0U3RhdHVzW1Jlc3F1ZXN0U3RhdHVzW1wiTm9NZWFuXCJdID0gMl0gPSBcIk5vTWVhblwiO1xyXG59KShSZXNxdWVzdFN0YXR1cyB8fCAoUmVzcXVlc3RTdGF0dXMgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5nLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=