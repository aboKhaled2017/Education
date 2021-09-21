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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Admin/JS/Settings/Settings.js");
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

/***/ "./src/Admin/JS/Settings/Settings.js":
/*!*******************************************!*\
  !*** ./src/Admin/JS/Settings/Settings.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../../global/helperDome */ "./src/global/helperDome.js");
$(function () {
    ImagesSettingOperaions.main();
    MembershipSettingOperations.main();
});
var ImagesSettingOperaions = {
    ImgsDataUrl: "/Admin/Settings/ListBgImages",
    DeleteImagesUrl: "/Admin/Settings/DeleteImage",
    BaseImgSrc: "/images/Student/backgrounds/",
    ImagesData: [],
    BgImages: $("#BgImages img"),
    AddImgBtn: $("#AddNewBgImg"),
    DeleteImgBtn: $("#DeleteBgImg"),
    handleImgSelectable: function () {
        $(document.body).on("click", "#BgImages img", function (e) {
            $(e.target).toggleClass("selected");
        });
    },
    GetImagesData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, $.get(this.ImgsDataUrl).done(function (data) {
                        _this.ImagesData = JSON.parse(data);
                    })];
            });
        });
    },
    CreateImages: function () {
        var container = $();
        for (var _i = 0, _a = this.ImagesData; _i < _a.length; _i++) {
            var imgName = _a[_i];
            var thumbnailImg = $("\n        <div class=\"col-md-4 imgCard\">\n            <img class=\"img-responsive img-thumbnail\" src=\"" + this.BaseImgSrc + imgName + "\">\n        </div>\n        ");
            thumbnailImg.find("img").data("name", imgName);
            container = container.add(thumbnailImg);
        }
        $("#BgImages .images").append(container);
    },
    CreateNewImage: function (imgName) {
        var imgSrc = "" + this.BaseImgSrc + imgName;
        var thumbnailImg = $("\n        <div class=\"col-md-4\">\n            <img class=\"img-responsive img-thumbnail\" src=\"" + imgSrc + "\">\n        </div>\n    ");
        thumbnailImg.find("img").data("name", imgName);
        $("#BgImages .images").append(thumbnailImg);
    },
    HandleAddNewImage: function () {
        var _this = this;
        var input = $("<input type='file' accept='image/*' id='uploadImg' class=\"hidden\"/>");
        $(document.body).append(input);
        this.AddImgBtn.click(function (e) {
            input.click();
        });
        input.change(function (e) {
            var file = e.target.files[0];
            var extension = "." + file.name.split(".").pop();
            var Name = "" + Date.now() + extension;
            if (file.type.indexOf("image") == -1) {
                $.notify({
                    message: "هذة النوعية من الصور غير مدعومة"
                });
                return;
            }
            _this.ImagesData.push(Name);
            var formData = new FormData();
            formData.append("Name", Name);
            formData.append("Value", JSON.stringify(_this.ImagesData));
            formData.append("Image", file);
            _this.AddImgBtn.pendingState(true, "fa-picture-o");
            $.ajax({
                url: "/Admin/Settings/SaveImage",
                data: formData,
                method: "POST",
                processData: false,
                cache: false,
                contentType: false
            })
                .done(function () {
                $.notify({
                    message: "تم حفظ الصورة بنجاح"
                });
                _this.CreateNewImage(Name);
            })
                .always(function () {
                _this.AddImgBtn.pendingState(false);
            })
                .catch(function (e) {
                $.notify({
                    message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
                });
                _this.ImagesData.pop();
            });
        });
    },
    HandleDeleteImage: function () {
        var _this = this;
        this.DeleteImgBtn.click(function (e) {
            var imgsName = [];
            var imgs = $("#BgImages img.selected");
            for (var i = 0; i < imgs.length; i++) {
                imgsName.push(imgs.eq(i).data("name"));
            }
            var oldImagesData = _this.ImagesData;
            _this.ImagesData = _this.ImagesData.filter(function (name) {
                if (imgsName.indexOf(name) == -1)
                    return name;
            });
            _this.DeleteImgBtn.pendingState(true, "fa-remove");
            $.post(_this.DeleteImagesUrl, {
                imgsName: imgsName,
                value: JSON.stringify(_this.ImagesData)
            })
                .always(function () {
                _this.DeleteImgBtn.pendingState(false);
            })
                .done(function () {
                $.notify({
                    message: "تمت عملية الحذف بنجاح"
                });
                imgs.fadeOut();
            })
                .catch(function (e) {
                $.notify({
                    message: "لم يتم حذف الصورة,حدثت مشكلة فى السيرفر"
                });
                _this.ImagesData = oldImagesData;
            });
        });
    },
    main: function () {
        var _this = this;
        this.handleImgSelectable();
        this.GetImagesData().then(function (d) {
            $(".loading").hide();
            _this.CreateImages();
            _this.HandleAddNewImage();
            _this.HandleDeleteImage();
        });
    }
};
var MembershipSettingOperations = {
    FetchMembershipDataUrl: "/Admin/Settings/GetMembership",
    SaveMembershipDataUrl: "/Admin/Settings/SaveMembership",
    Form: $("#MembershipForm"),
    get NameInp() {
        return this.Form.find("#Name");
    },
    get TitleInp() {
        return this.Form.find("#Title");
    },
    SaveBtn: $("#SaveBtn"),
    FetchMembershipData: function () {
        var _this = this;
        $.get(this.FetchMembershipDataUrl).done(function (data) {
            _this.NameInp.val(data.name);
            _this.TitleInp.val(data.title);
        });
    },
    GetFormEditedData: function () {
        return {
            name: this.NameInp.val(),
            title: this.TitleInp.val()
        };
    },
    HandleOnFormSubmit: function () {
        var _this = this;
        this.SaveBtn.click(function (e) {
            if (_this.Form.valid()) {
                var data = _this.GetFormEditedData();
                _this.SaveBtn.pendingState(true, "fa-send");
                $.post(_this.SaveMembershipDataUrl, {
                    Name: data.name,
                    Title: data.title
                })
                    .done(function () {
                    $.notify({
                        message: "تم تعديل بيانات العضوية بنجاح"
                    });
                })
                    .always(function () {
                    _this.SaveBtn.pendingState(false);
                })
                    .catch(function (e) {
                    var message = e.responseJSON && e.responseJSON.message
                        ? e.responseJSON.message
                        : "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم";
                    $.notify({
                        message: message,
                        title: "لم يتم تنفيذ العملية"
                    });
                });
            }
        });
    },
    main: function () {
        this.FetchMembershipData();
        this.HandleOnFormSubmit();
    }
};
//# sourceMappingURL=Settings.js.map

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0Fzc2VzdHMvQm9vdHN0cmFwQ29tcG9uZW50cy9ib290c3RyYXBOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0pTL1NldHRpbmdzL1NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwvaGVscGVyRG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQSxnSEFBZ0gsRUFBRSxvSEFBb0gsK0VBQStFLEVBQUUsNENBQTRDLEVBQUUsaUhBQWlILEVBQUUsd0dBQXdHLDhDQUE4QyxFQUFFLGFBQWEsRUFBRTtBQUMvbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDLHFDQUFxQyxrQkFBa0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7OztBQzNWYTtBQUNiO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IsaUVBQWlFLHVCQUF1QixFQUFFLDRCQUE0QjtBQUNySjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGtDQUFrQyxTQUFTO0FBQzNDLGtDQUFrQyxXQUFXLFVBQVU7QUFDdkQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQSw2R0FBNkcsT0FBTyxVQUFVO0FBQzlILGdGQUFnRixpQkFBaUIsT0FBTztBQUN4Ryx3REFBd0QsZ0JBQWdCLFFBQVEsT0FBTztBQUN2Riw4Q0FBOEMsZ0JBQWdCLGdCQUFnQixPQUFPO0FBQ3JGO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLFlBQVksYUFBYSxPQUFPLEVBQUUsVUFBVSxXQUFXO0FBQ2hFLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBTyxDQUFDLDhEQUE0QjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7QUMxT2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG1CQUFPLENBQUMsd0hBQXNEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsaURBQWlELG9CQUFvQjtBQUNyRTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsdUJBQXVCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQW9EO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsc0MiLCJmaWxlIjoiLi9BZG1pbi9qcy9TZXR0aW5ncy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9BZG1pbi9KUy9TZXR0aW5ncy9TZXR0aW5ncy5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9ib290c3RyYXBOb3RpZnkuZC50c1wiIC8+XHJcbnZhciBub3RpZnlUZW1wbGF0ZSA9IFwiXFxuIDxkaXYgZGF0YS1ub3RpZnk9XFxcImNvbnRhaW5lclxcXCIgY2xhc3M9XFxcImNvbC14cy0xMSBjb2wtc20tNCBhbGVydCBib290c3RyYXBOb3RpZnkgYWxlcnQtezB9XFxcIiByb2xlPVxcXCJhbGVydFxcXCI+XFxuICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLW5vdGlmeT1cXFwiZGlzbWlzc1xcXCI+JnRpbWVzOzwvYnV0dG9uPlxcbiAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwiaWNvblxcXCI+PC9zcGFuPiA8c3BhbiBkYXRhLW5vdGlmeT1cXFwidGl0bGVcXFwiPnsxfTwvc3Bhbj5cXG4gICAgPHNwYW4gZGF0YS1ub3RpZnk9XFxcIm1lc3NhZ2VcXFwiPnsyfTwvc3Bhbj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicHJvZ3Jlc3NcXFwiIGRhdGEtbm90aWZ5PVxcXCJwcm9ncmVzc2JhclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci17MH1cXFwiIHJvbGU9XFxcInByb2dyZXNzYmFyXFxcIiBhcmlhLXZhbHVlbm93PVxcXCIwXFxcIiBhcmlhLXZhbHVlbWluPVxcXCIwXFxcIiBhcmlhLXZhbHVlbWF4PVxcXCIxMDBcXFwiIHN0eWxlPVxcXCJ3aWR0aDogMCU7XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxhIGhyZWY9XFxcInszfVxcXCIgdGFyZ2V0PVxcXCJ7NH1cXFwiIGRhdGEtbm90aWZ5PVxcXCJ1cmxcXFwiPjwvYT5cXG48L2Rpdj5cXG5cIjtcclxudmFyIGRlZmF1bHRzID0ge1xyXG4gICAgZWxlbWVudDogJ2JvZHknLFxyXG4gICAgcG9zaXRpb246IG51bGwsXHJcbiAgICB0eXBlOiBcImluZm9cIixcclxuICAgIGFsbG93X2Rpc21pc3M6IHRydWUsXHJcbiAgICBhbGxvd19kdXBsaWNhdGVzOiB0cnVlLFxyXG4gICAgbmV3ZXN0X29uX3RvcDogZmFsc2UsXHJcbiAgICBzaG93UHJvZ3Jlc3NiYXI6IGZhbHNlLFxyXG4gICAgcGxhY2VtZW50OiB7XHJcbiAgICAgICAgZnJvbTogXCJ0b3BcIixcclxuICAgICAgICBhbGlnbjogXCJyaWdodFwiXHJcbiAgICB9LFxyXG4gICAgb2Zmc2V0OiAyMCxcclxuICAgIHNwYWNpbmc6IDEwLFxyXG4gICAgel9pbmRleDogOTk5OTk5OTk5OTk5OSxcclxuICAgIGRlbGF5OiA1MDAwLFxyXG4gICAgdGltZXI6IDEwMDAsXHJcbiAgICB1cmxfdGFyZ2V0OiAnX2JsYW5rJyxcclxuICAgIG1vdXNlX292ZXI6IG51bGwsXHJcbiAgICBhbmltYXRlOiB7XHJcbiAgICAgICAgZW50ZXI6ICdhbmltYXRlZCBmYWRlSW5Eb3duJyxcclxuICAgICAgICBleGl0OiAnYW5pbWF0ZWQgZmFkZU91dFVwJ1xyXG4gICAgfSxcclxuICAgIG9uU2hvdzogbnVsbCxcclxuICAgIG9uU2hvd246IG51bGwsXHJcbiAgICBvbkNsb3NlOiBudWxsLFxyXG4gICAgb25DbG9zZWQ6IG51bGwsXHJcbiAgICBpY29uX3R5cGU6ICdjbGFzcycsXHJcbiAgICB0ZW1wbGF0ZTogbm90aWZ5VGVtcGxhdGVcclxufTtcclxuU3RyaW5nLmZvcm1hdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgIHZhciBzdHIgPSBhcmd1bWVudHNbMF07XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFJlZ0V4cChcIlxcXFx7XCIgKyAoaSAtIDEpICsgXCJcXFxcfVwiLCBcImdtXCIpLCBhcmd1bWVudHNbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxufTtcclxuZnVuY3Rpb24gaXNEdXBsaWNhdGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uKSB7XHJcbiAgICB2YXIgaXNEdXBlID0gZmFsc2U7XHJcbiAgICAkKCdbZGF0YS1ub3RpZnk9XCJjb250YWluZXJcIl0nKS5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKGVsKTtcclxuICAgICAgICB2YXIgdGl0bGUgPSAkZWwuZmluZCgnW2RhdGEtbm90aWZ5PVwidGl0bGVcIl0nKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gJGVsLmZpbmQoJ1tkYXRhLW5vdGlmeT1cIm1lc3NhZ2VcIl0nKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIC8vIFRoZSBpbnB1dCBzdHJpbmcgbWlnaHQgYmUgZGlmZmVyZW50IHRoYW4gdGhlIGFjdHVhbCBwYXJzZWQgSFRNTCBzdHJpbmchXHJcbiAgICAgICAgLy8gKDxicj4gdnMgPGJyIC8+IGZvciBleGFtcGxlKVxyXG4gICAgICAgIC8vIFNvIHdlIGhhdmUgdG8gZm9yY2UtcGFyc2UgdGhpcyBhcyBIVE1MIGhlcmUhXHJcbiAgICAgICAgdmFyIGlzU2FtZVRpdGxlID0gdGl0bGUgPT09ICQoXCI8ZGl2PlwiICsgbm90aWZpY2F0aW9uLnNldHRpbmdzLmNvbnRlbnQudGl0bGUgKyBcIjwvZGl2PlwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBpc1NhbWVNc2cgPSBtZXNzYWdlID09PSAkKFwiPGRpdj5cIiArIG5vdGlmaWNhdGlvbi5zZXR0aW5ncy5jb250ZW50Lm1lc3NhZ2UgKyBcIjwvZGl2PlwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBpc1NhbWVUeXBlID0gJGVsLmhhc0NsYXNzKCdhbGVydC0nICsgbm90aWZpY2F0aW9uLnNldHRpbmdzLnR5cGUpO1xyXG4gICAgICAgIGlmIChpc1NhbWVUaXRsZSAmJiBpc1NhbWVNc2cgJiYgaXNTYW1lVHlwZSkge1xyXG4gICAgICAgICAgICAvL3dlIGZvdW5kIHRoZSBkdXBlLiBTZXQgdGhlIHZhciBhbmQgc3RvcCBjaGVja2luZy5cclxuICAgICAgICAgICAgaXNEdXBlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICFpc0R1cGU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc0R1cGU7XHJcbn1cclxudmFyIE5vdGlmeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE5vdGlmeShlbGVtZW50LCBjb250ZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5jb250ZW50T2JqID0ge1xyXG4gICAgICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB0eXBlb2YgY29udGVudCA9PT0gJ29iamVjdCcgPyBjb250ZW50Lm1lc3NhZ2UgOiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGNvbnRlbnQudGl0bGUgPyBjb250ZW50LnRpdGxlIDogJycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBjb250ZW50Lmljb24gPyBjb250ZW50Lmljb24gOiAncGUtN3MtYmVsbCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGNvbnRlbnQudXJsID8gY29udGVudC51cmwgOiAnIycsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGNvbnRlbnQudGFyZ2V0ID8gY29udGVudC50YXJnZXQgOiAnLSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ub3RpZnkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuJGVsZSA9ICQoKTtcclxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29udGVudE9iaiwgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250ZW50LnRhcmdldCA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250ZW50LnRhcmdldCA9IHRoaXMuc2V0dGluZ3MudXJsX3RhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xyXG4gICAgICAgICAgICBzdGFydDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0IG9hbmltYXRpb25zdGFydCBNU0FuaW1hdGlvblN0YXJ0IGFuaW1hdGlvbnN0YXJ0JyxcclxuICAgICAgICAgICAgZW5kOiAnd2Via2l0QW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQgTVNBbmltYXRpb25FbmQgYW5pbWF0aW9uZW5kJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9mZnNldCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vZmZzZXQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiB0aGlzLnNldHRpbmdzLm9mZnNldCxcclxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2V0dGluZ3Mub2Zmc2V0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgZHVwbGljYXRlIG1lc3NhZ2VzIGFyZSBub3QgYWxsb3dlZCwgdGhlbiBvbmx5IGNvbnRpbnVlIGlmIHRoaXMgbmV3IG1lc3NhZ2UgaXMgbm90IGEgZHVwbGljYXRlIG9mIG9uZSB0aGF0IGl0IGFscmVhZHkgc2hvd2luZ1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsbG93X2R1cGxpY2F0ZXMgfHwgKCF0aGlzLnNldHRpbmdzLmFsbG93X2R1cGxpY2F0ZXMgJiYgIWlzRHVwbGljYXRlTm90aWZpY2F0aW9uKHRoaXMpKSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYnVpbGROb3RpZnkoKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250ZW50Lmljb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJY29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQudXJsICE9IFwiI1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVVUkwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdHlsZURpc21pc3MoKTtcclxuICAgICAgICB0aGlzLnBsYWNlbWVudCgpO1xyXG4gICAgICAgIHRoaXMuYmluZCgpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5ID0ge1xyXG4gICAgICAgICAgICAkZWxlOiB0aGlzLiRlbGUsXHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGNvbW1hbmQsIHVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmRzID0ge307XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1tjb21tYW5kXSA9IHVwZGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzID0gY29tbWFuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNtZCBpbiBjb21tYW5kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY21kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0eXBlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUucmVtb3ZlQ2xhc3MoJ2FsZXJ0LScgKyBzZWxmLnNldHRpbmdzLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gLnByb2dyZXNzLWJhcicpLnJlbW92ZUNsYXNzKCdwcm9ncmVzcy1iYXItJyArIHNlbGYuc2V0dGluZ3MudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLnR5cGUgPSBjb21tYW5kc1tjbWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmFkZENsYXNzKCdhbGVydC0nICsgY29tbWFuZHNbY21kXSkuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiAucHJvZ3Jlc3MtYmFyJykuYWRkQ2xhc3MoJ3Byb2dyZXNzLWJhci0nICsgY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImljb25cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaWNvbiA9IHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5pY29uX3R5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpY29uLnJlbW92ZUNsYXNzKHNlbGYuc2V0dGluZ3MuY29udGVudC5pY29uKS5hZGRDbGFzcyhjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGljb24uaXMoJ2ltZycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpY29uLmZpbmQoJ2ltZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaWNvbi5hdHRyKCdzcmMnLCBjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvZ3Jlc3NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEZWxheSA9IHNlbGYuc2V0dGluZ3MuZGVsYXkgLSAoc2VsZi5zZXR0aW5ncy5kZWxheSAqIChjb21tYW5kc1tjbWRdIC8gMTAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5JywgbmV3RGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gZGl2JykuYXR0cignYXJpYS12YWx1ZW5vdycsIGNvbW1hbmRzW2NtZF0pLmNzcygnd2lkdGgnLCBjb21tYW5kc1tjbWRdICsgJyUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXJsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwidXJsXCJdJykuYXR0cignaHJlZicsIGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0YXJnZXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJ1cmxcIl0nKS5hdHRyKCd0YXJnZXQnLCBjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cIicgKyBjbWQgKyAnXCJdJykuaHRtbChjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zWCA9IHRoaXMuJGVsZS5vdXRlckhlaWdodCgpICsgcGFyc2VJbnQoc2VsZi5zZXR0aW5ncy5zcGFjaW5nKSArIHBhcnNlSW50KHNlbGYuc2V0dGluZ3Mub2Zmc2V0LnkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlcG9zaXRpb24ocG9zWCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoZG9BbnlBY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoZG9BbnlBY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLmJ1aWxkTm90aWZ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5zZXR0aW5ncy5jb250ZW50O1xyXG4gICAgICAgIHRoaXMuJGVsZSA9ICh0eXBlb2YgdGhpcy5zZXR0aW5ncy50ZW1wbGF0ZSA9PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICA/ICQoU3RyaW5nLmZvcm1hdCh0aGlzLnNldHRpbmdzLnRlbXBsYXRlLCB0aGlzLnNldHRpbmdzLnR5cGUsIGNvbnRlbnQudGl0bGUsIGNvbnRlbnQubWVzc2FnZSwgY29udGVudC51cmwsIGNvbnRlbnQudGFyZ2V0KSlcclxuICAgICAgICAgICAgOiB0aGlzLnNldHRpbmdzLnRlbXBsYXRlO1xyXG4gICAgICAgIHRoaXMuJGVsZS5hdHRyKCdkYXRhLW5vdGlmeS1wb3NpdGlvbicsIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmZyb20gKyAnLScgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5hbGlnbik7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmFsbG93X2Rpc21pc3MpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHRoaXMuc2V0dGluZ3MuZGVsYXkgPD0gMCAmJiAhdGhpcy5zZXR0aW5ncy5zaG93UHJvZ3Jlc3NiYXIpIHx8ICF0aGlzLnNldHRpbmdzLnNob3dQcm9ncmVzc2Jhcikge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0nKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5zZXRJY29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuJGVsZS5hZGRDbGFzcygnYWxlcnQtd2l0aC1pY29uJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaWNvbl90eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5pcygnaW1nJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJykuYXR0cignc3JjJywgdGhpcy5zZXR0aW5ncy5jb250ZW50Lmljb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5hcHBlbmQoJzxpbWcgc3JjPVwiJyArIHRoaXMuc2V0dGluZ3MuY29udGVudC5pY29uICsgJ1wiIGFsdD1cIk5vdGlmeSBJY29uXCIgLz4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnN0eWxlRGlzbWlzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLmNzcyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnMTBweCcsXHJcbiAgICAgICAgICAgIHRvcDogJzUwJScsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJy0xM3B4JyxcclxuICAgICAgICAgICAgekluZGV4OiB0aGlzLnNldHRpbmdzLnpfaW5kZXggKyAyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5zdHlsZVVSTCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwidXJsXCJdJykuY3NzKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNyknLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgekluZGV4OiB0aGlzLnNldHRpbmdzLnpfaW5kZXggKyAxXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5wbGFjZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIG9mZnNldEFtdCA9IHRoaXMuc2V0dGluZ3Mub2Zmc2V0LnksIGNzcyA9IHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIG1hcmdpbjogJzBweCBhdXRvJyxcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuc2V0dGluZ3MucG9zaXRpb24gPyB0aGlzLnNldHRpbmdzLnBvc2l0aW9uIDogKHRoaXMuc2V0dGluZ3MuZWxlbWVudCA9PT0gJ2JvZHknID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIC41cyBlYXNlLWluLW91dCcsXHJcbiAgICAgICAgICAgIHpJbmRleDogdGhpcy5zZXR0aW5ncy56X2luZGV4XHJcbiAgICAgICAgfSwgaGFzQW5pbWF0aW9uID0gZmFsc2UsIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcclxuICAgICAgICAkKCdbZGF0YS1ub3RpZnktcG9zaXRpb249XCInICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSArICctJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduICsgJ1wiXTpub3QoW2RhdGEtY2xvc2luZz1cInRydWVcIl0pJylcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaCA9ICQodGhpcykub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgb2Zmc2V0QW10ID0gTWF0aC5tYXgob2Zmc2V0QW10LCBwYXJzZUludCgkKHRoaXMpLmNzcyhzZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSkpICsgaCArIHBhcnNlSW50KHNldHRpbmdzLnNwYWNpbmcpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5uZXdlc3Rfb25fdG9wID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG9mZnNldEFtdCA9IHRoaXMuc2V0dGluZ3Mub2Zmc2V0Lnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNzc1sodGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSldID0gb2Zmc2V0QW10ICsgJ3B4JztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICAgICAgICAgICAgY3NzW3RoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduXSA9IHRoaXMuc2V0dGluZ3Mub2Zmc2V0LnggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcclxuICAgICAgICAgICAgICAgIGNzcy5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIGNzcy5yaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kZWxlLmNzcyhjc3MpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZS5lbnRlcik7XHJcbiAgICAgICAgJC5lYWNoKEFycmF5KCd3ZWJraXQtJywgJ21vei0nLCAnby0nLCAnbXMtJywgJycpLCBmdW5jdGlvbiAoaW5kZXgsIHByZWZpeCkge1xyXG4gICAgICAgICAgICBzZWxmLiRlbGVbMF0uc3R5bGVbcHJlZml4ICsgJ0FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50J10gPSAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5lbGVtZW50ID09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICQodGhpcy5zZXR0aW5ncy5lbGVtZW50KS5hcHBlbmQodGhpcy4kZWxlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZWxlbWVudC5hcHBlbmQodGhpcy4kZWxlKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5uZXdlc3Rfb25fdG9wID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG9mZnNldEFtdCA9IChvZmZzZXRBbXQgKyBwYXJzZUludCh0aGlzLnNldHRpbmdzLnNwYWNpbmcpKSArIHRoaXMuJGVsZS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcG9zaXRpb24ob2Zmc2V0QW10KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvdykpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vblNob3cuY2FsbCh0aGlzLiRlbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRlbGUub25lKHRoaXMuYW5pbWF0aW9ucy5zdGFydCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoYXNBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH0pLm9uZSh0aGlzLmFuaW1hdGlvbnMuZW5kLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2VsZi5zZXR0aW5ncy5vblNob3duKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vblNob3duLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2VsZi5zZXR0aW5ncy5vblNob3duKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25TaG93bi5jYWxsKF90aGlzLiRlbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNjAwKTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kZWxlLm1vdXNlb3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZGF0YSgnZGF0YS1ob3ZlcicsIFwidHJ1ZVwiKTtcclxuICAgICAgICB9KS5tb3VzZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZGF0YSgnZGF0YS1ob3ZlcicsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kZWxlLmRhdGEoJ2RhdGEtaG92ZXInLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZWxmLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5Jywgc2VsZi5zZXR0aW5ncy5kZWxheSk7XHJcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWxheSA9IHBhcnNlSW50KHNlbGYuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknKSkgLSBzZWxmLnNldHRpbmdzLnRpbWVyO1xyXG4gICAgICAgICAgICAgICAgaWYgKChzZWxmLiRlbGUuZGF0YSgnZGF0YS1ob3ZlcicpID09PSAnZmFsc2UnICYmIHNlbGYuc2V0dGluZ3MubW91c2Vfb3ZlciA9PT0gXCJwYXVzZVwiKSB8fCBzZWxmLnNldHRpbmdzLm1vdXNlX292ZXIgIT0gXCJwYXVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoKHNlbGYuc2V0dGluZ3MuZGVsYXkgLSBkZWxheSkgLyBzZWxmLnNldHRpbmdzLmRlbGF5KSAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5JywgZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXSA+IGRpdicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCBwZXJjZW50KS5jc3MoJ3dpZHRoJywgcGVyY2VudCArICclJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsYXkgPD0gLShzZWxmLnNldHRpbmdzLnRpbWVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgc2VsZi5zZXR0aW5ncy50aW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZG9BbnlBY3Rpb24pIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIHBvc1ggPSBwYXJzZUludCh0aGlzLiRlbGUuY3NzKHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmZyb20pKSwgaGFzQW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kZWxlLmRhdGEoJ2Nsb3NpbmcnLCAndHJ1ZScpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZS5leGl0KTtcclxuICAgICAgICBzZWxmLnJlcG9zaXRpb24ocG9zWCk7XHJcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uQ2xvc2UpKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbG9zZS5jYWxsKHRoaXMuJGVsZSwgZG9BbnlBY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRlbGUub25lKHRoaXMuYW5pbWF0aW9ucy5zdGFydCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoYXNBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH0pLm9uZSh0aGlzLmFuaW1hdGlvbnMuZW5kLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2VsZi5zZXR0aW5ncy5vbkNsb3NlZCkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbG9zZWQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc0FuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3Mub25DbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKHNlbGYuJGVsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA2MDApO1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUucmVwb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3NYKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBub3RpZmllcyA9ICdbZGF0YS1ub3RpZnktcG9zaXRpb249XCInICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSArICctJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduICsgJ1wiXTpub3QoW2RhdGEtY2xvc2luZz1cInRydWVcIl0pJywgJGVsZW1lbnRzID0gdGhpcy4kZWxlLm5leHRBbGwobm90aWZpZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5ld2VzdF9vbl90b3AgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnRzID0gdGhpcy4kZWxlLnByZXZBbGwobm90aWZpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKHNlbGYuc2V0dGluZ3MucGxhY2VtZW50LmZyb20sIHBvc1gpO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICQodGhpcykub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgcG9zWCA9IChwYXJzZUludChwb3NYLnRvU3RyaW5nKCkpICsgcGFyc2VJbnQoc2VsZi5zZXR0aW5ncy5zcGFjaW5nKSkgKyBoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOb3RpZnk7XHJcbn0oKSk7XHJcbiQubm90aWZ5ID0gZnVuY3Rpb24gKGNvbnRlbnQsIG9wdGlvbnMpIHtcclxuICAgIHZhciBwbHVnaW4gPSBuZXcgTm90aWZ5KHRoaXMsIGNvbnRlbnQsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHBsdWdpbi5ub3RpZnk7XHJcbn07XHJcbiQubm90aWZ5RGVmYXVsdHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgZGVmYXVsdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xyXG59O1xyXG4kLm5vdGlmeUNsb3NlID0gZnVuY3Rpb24gKGNvbW1hbmQpIHtcclxuICAgIGlmICh0eXBlb2YgY29tbWFuZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjb21tYW5kID09PSBcImFsbFwiKSB7XHJcbiAgICAgICAgJCgnW2RhdGEtbm90aWZ5XScpLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJCgnW2RhdGEtbm90aWZ5LXBvc2l0aW9uPVwiJyArIGNvbW1hbmQgKyAnXCJdJykuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb3RzdHJhcE5vdGlmeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnJlcXVpcmUoXCIuLi8uLi8uLi9nbG9iYWwvaGVscGVyRG9tZVwiKTtcclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBJbWFnZXNTZXR0aW5nT3BlcmFpb25zLm1haW4oKTtcclxuICAgIE1lbWJlcnNoaXBTZXR0aW5nT3BlcmF0aW9ucy5tYWluKCk7XHJcbn0pO1xyXG52YXIgSW1hZ2VzU2V0dGluZ09wZXJhaW9ucyA9IHtcclxuICAgIEltZ3NEYXRhVXJsOiBcIi9BZG1pbi9TZXR0aW5ncy9MaXN0QmdJbWFnZXNcIixcclxuICAgIERlbGV0ZUltYWdlc1VybDogXCIvQWRtaW4vU2V0dGluZ3MvRGVsZXRlSW1hZ2VcIixcclxuICAgIEJhc2VJbWdTcmM6IFwiL2ltYWdlcy9TdHVkZW50L2JhY2tncm91bmRzL1wiLFxyXG4gICAgSW1hZ2VzRGF0YTogW10sXHJcbiAgICBCZ0ltYWdlczogJChcIiNCZ0ltYWdlcyBpbWdcIiksXHJcbiAgICBBZGRJbWdCdG46ICQoXCIjQWRkTmV3QmdJbWdcIiksXHJcbiAgICBEZWxldGVJbWdCdG46ICQoXCIjRGVsZXRlQmdJbWdcIiksXHJcbiAgICBoYW5kbGVJbWdTZWxlY3RhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5vbihcImNsaWNrXCIsIFwiI0JnSW1hZ2VzIGltZ1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIEdldEltYWdlc0RhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCAkLmdldCh0aGlzLkltZ3NEYXRhVXJsKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkltYWdlc0RhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgQ3JlYXRlSW1hZ2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoKTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5JbWFnZXNEYXRhOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgaW1nTmFtZSA9IF9hW19pXTtcclxuICAgICAgICAgICAgdmFyIHRodW1ibmFpbEltZyA9ICQoXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC00IGltZ0NhcmRcXFwiPlxcbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcImltZy1yZXNwb25zaXZlIGltZy10aHVtYm5haWxcXFwiIHNyYz1cXFwiXCIgKyB0aGlzLkJhc2VJbWdTcmMgKyBpbWdOYW1lICsgXCJcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIik7XHJcbiAgICAgICAgICAgIHRodW1ibmFpbEltZy5maW5kKFwiaW1nXCIpLmRhdGEoXCJuYW1lXCIsIGltZ05hbWUpO1xyXG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIuYWRkKHRodW1ibmFpbEltZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjQmdJbWFnZXMgLmltYWdlc1wiKS5hcHBlbmQoY29udGFpbmVyKTtcclxuICAgIH0sXHJcbiAgICBDcmVhdGVOZXdJbWFnZTogZnVuY3Rpb24gKGltZ05hbWUpIHtcclxuICAgICAgICB2YXIgaW1nU3JjID0gXCJcIiArIHRoaXMuQmFzZUltZ1NyYyArIGltZ05hbWU7XHJcbiAgICAgICAgdmFyIHRodW1ibmFpbEltZyA9ICQoXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC00XFxcIj5cXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJpbWctcmVzcG9uc2l2ZSBpbWctdGh1bWJuYWlsXFxcIiBzcmM9XFxcIlwiICsgaW1nU3JjICsgXCJcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiKTtcclxuICAgICAgICB0aHVtYm5haWxJbWcuZmluZChcImltZ1wiKS5kYXRhKFwibmFtZVwiLCBpbWdOYW1lKTtcclxuICAgICAgICAkKFwiI0JnSW1hZ2VzIC5pbWFnZXNcIikuYXBwZW5kKHRodW1ibmFpbEltZyk7XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlQWRkTmV3SW1hZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpbnB1dCA9ICQoXCI8aW5wdXQgdHlwZT0nZmlsZScgYWNjZXB0PSdpbWFnZS8qJyBpZD0ndXBsb2FkSW1nJyBjbGFzcz1cXFwiaGlkZGVuXFxcIi8+XCIpO1xyXG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICB0aGlzLkFkZEltZ0J0bi5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0gXCIuXCIgKyBmaWxlLm5hbWUuc3BsaXQoXCIuXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICB2YXIgTmFtZSA9IFwiXCIgKyBEYXRlLm5vdygpICsgZXh0ZW5zaW9uO1xyXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoXCJpbWFnZVwiKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YfYsNipINin2YTZhtmI2LnZitipINmF2YYg2KfZhNi12YjYsSDYutmK2LEg2YXYr9i52YjZhdipXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLkltYWdlc0RhdGEucHVzaChOYW1lKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcIk5hbWVcIiwgTmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcIlZhbHVlXCIsIEpTT04uc3RyaW5naWZ5KF90aGlzLkltYWdlc0RhdGEpKTtcclxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiSW1hZ2VcIiwgZmlsZSk7XHJcbiAgICAgICAgICAgIF90aGlzLkFkZEltZ0J0bi5wZW5kaW5nU3RhdGUodHJ1ZSwgXCJmYS1waWN0dXJlLW9cIik7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL0FkbWluL1NldHRpbmdzL1NhdmVJbWFnZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCLYqtmFINit2YHYuCDYp9mE2LXZiNix2Kkg2KjZhtis2KfYrVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLkNyZWF0ZU5ld0ltYWdlKE5hbWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5BZGRJbWdCdG4ucGVuZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YTZhSDZitiq2YUg2K3Zgdi4INin2YTYtdmI2LHYqSzYrdiv2KvYqiDZhdi02YPZhNipINmB2Ykg2KfZhNiz2YrYsdmB2LFcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5JbWFnZXNEYXRhLnBvcCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBIYW5kbGVEZWxldGVJbWFnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5EZWxldGVJbWdCdG4uY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGltZ3NOYW1lID0gW107XHJcbiAgICAgICAgICAgIHZhciBpbWdzID0gJChcIiNCZ0ltYWdlcyBpbWcuc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW1nc05hbWUucHVzaChpbWdzLmVxKGkpLmRhdGEoXCJuYW1lXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb2xkSW1hZ2VzRGF0YSA9IF90aGlzLkltYWdlc0RhdGE7XHJcbiAgICAgICAgICAgIF90aGlzLkltYWdlc0RhdGEgPSBfdGhpcy5JbWFnZXNEYXRhLmZpbHRlcihmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltZ3NOYW1lLmluZGV4T2YobmFtZSkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfdGhpcy5EZWxldGVJbWdCdG4ucGVuZGluZ1N0YXRlKHRydWUsIFwiZmEtcmVtb3ZlXCIpO1xyXG4gICAgICAgICAgICAkLnBvc3QoX3RoaXMuRGVsZXRlSW1hZ2VzVXJsLCB7XHJcbiAgICAgICAgICAgICAgICBpbWdzTmFtZTogaW1nc05hbWUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoX3RoaXMuSW1hZ2VzRGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuRGVsZXRlSW1nQnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCLYqtmF2Kog2LnZhdmE2YrYqSDYp9mE2K3YsNmBINio2YbYrNin2K1cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpbWdzLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YTZhSDZitiq2YUg2K3YsNmBINin2YTYtdmI2LHYqSzYrdiv2KvYqiDZhdi02YPZhNipINmB2Ykg2KfZhNiz2YrYsdmB2LFcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5JbWFnZXNEYXRhID0gb2xkSW1hZ2VzRGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgbWFpbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbWdTZWxlY3RhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5HZXRJbWFnZXNEYXRhKCkudGhlbihmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAkKFwiLmxvYWRpbmdcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICBfdGhpcy5DcmVhdGVJbWFnZXMoKTtcclxuICAgICAgICAgICAgX3RoaXMuSGFuZGxlQWRkTmV3SW1hZ2UoKTtcclxuICAgICAgICAgICAgX3RoaXMuSGFuZGxlRGVsZXRlSW1hZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxudmFyIE1lbWJlcnNoaXBTZXR0aW5nT3BlcmF0aW9ucyA9IHtcclxuICAgIEZldGNoTWVtYmVyc2hpcERhdGFVcmw6IFwiL0FkbWluL1NldHRpbmdzL0dldE1lbWJlcnNoaXBcIixcclxuICAgIFNhdmVNZW1iZXJzaGlwRGF0YVVybDogXCIvQWRtaW4vU2V0dGluZ3MvU2F2ZU1lbWJlcnNoaXBcIixcclxuICAgIEZvcm06ICQoXCIjTWVtYmVyc2hpcEZvcm1cIiksXHJcbiAgICBnZXQgTmFtZUlucCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Gb3JtLmZpbmQoXCIjTmFtZVwiKTtcclxuICAgIH0sXHJcbiAgICBnZXQgVGl0bGVJbnAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRm9ybS5maW5kKFwiI1RpdGxlXCIpO1xyXG4gICAgfSxcclxuICAgIFNhdmVCdG46ICQoXCIjU2F2ZUJ0blwiKSxcclxuICAgIEZldGNoTWVtYmVyc2hpcERhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuZ2V0KHRoaXMuRmV0Y2hNZW1iZXJzaGlwRGF0YVVybCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBfdGhpcy5OYW1lSW5wLnZhbChkYXRhLm5hbWUpO1xyXG4gICAgICAgICAgICBfdGhpcy5UaXRsZUlucC52YWwoZGF0YS50aXRsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgR2V0Rm9ybUVkaXRlZERhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLk5hbWVJbnAudmFsKCksXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLlRpdGxlSW5wLnZhbCgpXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBIYW5kbGVPbkZvcm1TdWJtaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuU2F2ZUJ0bi5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuRm9ybS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IF90aGlzLkdldEZvcm1FZGl0ZWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5TYXZlQnRuLnBlbmRpbmdTdGF0ZSh0cnVlLCBcImZhLXNlbmRcIik7XHJcbiAgICAgICAgICAgICAgICAkLnBvc3QoX3RoaXMuU2F2ZU1lbWJlcnNoaXBEYXRhVXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgTmFtZTogZGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpdGxlOiBkYXRhLnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2KrZhSDYqti52K/ZitmEINio2YrYp9mG2KfYqiDYp9mE2LnYttmI2YrYqSDYqNmG2KzYp9itXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuU2F2ZUJ0bi5wZW5kaW5nU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGUucmVzcG9uc2VKU09OICYmIGUucmVzcG9uc2VKU09OLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBlLnJlc3BvbnNlSlNPTi5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCLZhNinINmK2YXZg9mGINiq2YbZgdmK2LAg2KfZhNi52YXZhNmK2Kkg2KfZhNin2YYs2YTYrdiv2YjYqyDZhdi02YPZhNipINi52YbYryDYp9mE2K7Yp9iv2YVcIjtcclxuICAgICAgICAgICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItmE2YUg2YrYqtmFINiq2YbZgdmK2LAg2KfZhNi52YXZhNmK2KlcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBtYWluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5GZXRjaE1lbWJlcnNoaXBEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5IYW5kbGVPbkZvcm1TdWJtaXQoKTtcclxuICAgIH1cclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2V0dGluZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZGVjbGFyYXRpb24uZC50c1wiIC8+XHJcbnJlcXVpcmUoXCIuLi9BZG1pbi9Bc3Nlc3RzL0Jvb3RzdHJhcENvbXBvbmVudHMvYm9vdHN0cmFwTm90aWZ5XCIpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJC5mbi5wZW5kaW5nU3RhdGUgPSBmdW5jdGlvbiAoaXNQZW5kaW5nLCByZW1vdmVkQ2xhc3MsIGFuaW1hdGluZ0NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpbmdDbGFzcylcclxuICAgICAgICAgICAgYW5pbWF0aW5nQ2xhc3MgPSBcImZhLXNwaW5uZXIgZmEtc3BpblwiO1xyXG4gICAgICAgIGlmIChyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YShcImNsYXNzXCIsIHJlbW92ZWRDbGFzcyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZW1vdmVkQ2xhc3MgPSB0aGlzLmRhdGEoXCJjbGFzc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIikudG9nZ2xlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmIChpc1BlbmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kKFwiaVwiKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHJlbW92ZWRDbGFzcylcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmQoXCJpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MocmVtb3ZlZENsYXNzKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGFuaW1hdGluZ0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5zd2l0Y2hQZW5kaW5nU3RhdGUgPSBmdW5jdGlvbiAoaXNQZW5kaW5nLCByZW1vdmVkQ2xhc3MsIGFuaW1hdGluZ0NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpbmdDbGFzcylcclxuICAgICAgICAgICAgYW5pbWF0aW5nQ2xhc3MgPSBcImZhLXNwaW5uZXIgZmEtc3BpblwiO1xyXG4gICAgICAgIGlmIChyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YShcImNsYXNzXCIsIHJlbW92ZWRDbGFzcyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZW1vdmVkQ2xhc3MgPSB0aGlzLmRhdGEoXCJjbGFzc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIikudG9nZ2xlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmIChpc1BlbmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhyZW1vdmVkQ2xhc3MpLmFkZENsYXNzKGFuaW1hdGluZ0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MocmVtb3ZlZENsYXNzKS5yZW1vdmVDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuY29uZmlybU5vdGlmeSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbmZpcm1UZW1wbGF0ZSA9IFwiXFxuICAgICAgICAgICAgPGRpdiBkYXRhLW5vdGlmeT1cXFwiY29udGFpbmVyXFxcIiBcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImNvbC14cy0xMSBjb2wtc20tNCBhbGVydCBhbGVydC1pbmZvIGFsZXJ0LXdpdGgtaWNvbiBhbmltYXRlZCBmYWRlSW5Eb3duIGJvb3RzdHJhcE5vdGlmeVxcXCJcXG4gICAgICAgICAgICAgICAgcm9sZT1cXFwiYWxlcnRcXFwiIGRhdGEtbm90aWZ5LXBvc2l0aW9uPVxcXCJ0b3AtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtbm90aWZ5PVxcXCJkaXNtaXNzXFxcIj5cXHUwMEQ3PC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJpY29uXFxcIiBjbGFzcz1cXFwicGUtN3MtY2hlY2tcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1ub3RpZnk9XFxcInRpdGxlXFxcIj48L3NwYW4+IFxcbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwibWVzc2FnZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGV4dC1jZW50ZXIgY29uZmlybUNvbnRyb2xzXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tc21cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICBcXHUwNjJBXFx1MDYyM1xcdTA2NDNcXHUwNjRBXFx1MDYyRlxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jbG9zZVxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgXFx1MDYyN1xcdTA2NDRcXHUwNjNBXFx1MDYyN1xcdTA2MjFcXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGRhdGEtbm90aWZ5PVxcXCJ1cmxcXFwiPjwvYT5cXG4gICAgICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIG9uQ29uZmlybSkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAkKGNvbmZpcm1UZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sc2J0biA9IHRlbXBsYXRlLmZpbmQoXCIuY29uZmlybUNvbnRyb2xzIGJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY29udHJvbHNidG5cclxuICAgICAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoXCJyZXN1bHRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmVxKDEpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShcInJlc3VsdFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlLmZpbmQoJ3NwYW5bZGF0YS1ub3RpZnk9XCJtZXNzYWdlXCJdJykudGV4dChtZXNzYWdlKTtcclxuICAgICAgICAgICAgY29udHJvbHNidG4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlybS5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBvbkNvbmZpcm0oJCh0aGlzKS5kYXRhKFwicmVzdWx0XCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjb25maXJtID0gJC5ub3RpZnkoe30sIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb0FueUFjdGlvbiA9PT0gdm9pZCAwKSB7IGRvQW55QWN0aW9uID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb0FueUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aW1lcjogNDAwMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG4gICAgJC5mbi5hZGRQYXNzd29yZFNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBhc3N3b3JkSW5wID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAocGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIikgIT0gXCJwYXNzd29yZFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFzc3dvcmRJbnA7XHJcbiAgICAgICAgdmFyIGV5ZUljb24gPSAkKCc8aSBjbGFzcz1cImZhIGZhLWV5ZSBmYS1sZ1wiPjwvaT4nKTtcclxuICAgICAgICBwYXNzd29yZElucC5hZnRlcihleWVJY29uKTtcclxuICAgICAgICB2YXIgdG9wT2Zmc2V0ID0gcGFzc3dvcmRJbnAub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgIHBhc3N3b3JkSW5wLmhlaWdodCgpIC8gMjtcclxuICAgICAgICBleWVJY29uXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICBsZWZ0OiBcIjElXCIsXHJcbiAgICAgICAgICAgIHRvcDogXCJjYWxjKDEwMCUgLSBcIiArIHRvcE9mZnNldCArIFwicHgpXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiMzMzdhYjdcIixcclxuICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwYXNzd29yZElucC5hdHRyKFwidHlwZVwiKSA9PSBcInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgID8gcGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICA6IHBhc3N3b3JkSW5wLmF0dHIoXCJ0eXBlXCIsIFwicGFzc3dvcmRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhc3N3b3JkSW5wO1xyXG4gICAgfTtcclxuICAgICQuZm4uYWpheFN1Ym1pdCA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgSXNTdHJpbmdGaWFibGUsIGNvbXBsZXRlLCBiZWZvcmVTZW5kKSB7XHJcbiAgICAgICAgaWYgKElzU3RyaW5nRmlhYmxlID09PSB2b2lkIDApIHsgSXNTdHJpbmdGaWFibGUgPSB0cnVlOyB9XHJcbiAgICAgICAgdmFyIG9iamVjdERhdGEgPSB7fTtcclxuICAgICAgICBpZiAoISQodGhpcykudmFsaWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmZpbmQoXCJpbnB1dFwiKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoaSwgaW5wKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoaW5wKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5wdXQudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09IFwiZmFsc2VcIilcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKHZhbHVlID09IFwidHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPT0gXCJmYWxzZVwiID8gZmFsc2UgOiB2YWx1ZTtcclxuICAgICAgICAgICAgb2JqZWN0RGF0YVtpbnB1dC5hdHRyKFwibmFtZVwiKV0gPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb21wbGV0ZSgkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSXNTdHJpbmdGaWFibGUgPyBKU09OLnN0cmluZ2lmeShvYmplY3REYXRhKSA6IG9iamVjdERhdGEsXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgb2JqZWN0RGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5yZXNldFBhc3N3b3JkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKFwiXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4udG9nZ2xlQXR0ciA9IGZ1bmN0aW9uIChhdHRyKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wKGF0dHIpID8gdGhpcy5yZW1vdmVBdHRyKGF0dHIpIDogdGhpcy5wcm9wKGF0dHIsIGF0dHIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4uZm9ybUFsZXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmb3JtQWxlcnQgPSB0aGlzLmZpbmQoXCIuZm9ybUFsZXJ0XCIpXHJcbiAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuZmluZChcImlucHV0XCIpLmZvY3VzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9ybUFsZXJ0LmZhZGVPdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybUFsZXJ0O1xyXG4gICAgfTtcclxuICAgICQubm90aWZ5Q2F0Y2ggPSBmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi2YTZhSDZitiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqSAs2YTZiNis2YjYr9mF2LTZg9mE2Kkg2YHZiSDYp9mE2K7Yp9iv2YUs2K3Yp9mI2YQg2YXYsdipINin2K7YsdmJXCI7XHJcbiAgICAgICAgdmFyIG5vdGlmeU1lc3NhZ2UgPSBtb2RlbCAmJiBtb2RlbC5tZXNzYWdlID8gbW9kZWwubWVzc2FnZSA6IG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuICQubm90aWZ5KHsgbWVzc2FnZTogbm90aWZ5TWVzc2FnZSwgdGl0bGU6IFwi2YTZgtivINmB2LTZhNiqINin2YTYudmF2YTZitipXCIgfSk7XHJcbiAgICB9O1xyXG4gICAgJC5VcGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChCdG5IYW5kbGVyLCBPbkdvdEltZ0ZpbGUpIHtcclxuICAgICAgICB2YXIgYnRuQ29udGV4dDtcclxuICAgICAgICB2YXIgaW5wdXQgPSAkKFwiPGlucHV0IHR5cGU9J2ZpbGUnIGFjY2VwdD0naW1hZ2UvKicgaWQ9J3VwbG9hZEltZycgY2xhc3M9XFxcImhpZGRlblxcXCIvPlwiKTtcclxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgQnRuSGFuZGxlci5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xyXG4gICAgICAgICAgICBidG5Db250ZXh0ID0gJChlLnRhcmdldCkucGFyZW50cygnLkNvdXJzZUNhcmRUZW1wbGF0ZTplcSgwKScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0gXCIuXCIgKyBmaWxlLm5hbWUuc3BsaXQoXCIuXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoXCJpbWFnZVwiKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YfYsNipINin2YTZhtmI2LnZitipINmF2YYg2KfZhNi12YjYsSDYutmK2LEg2YXYr9i52YjZhdipXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9uR290SW1nRmlsZS5iaW5kKGJ0bkNvbnRleHQpKGZpbGUsIGV4dGVuc2lvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5TaG93bk9ubHlJZkNoZWNrZWQgPSBmdW5jdGlvbiAoVGFyZ2V0Q2hlY2tlZElucHV0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBUYXJnZXRDaGVja2VkSW5wdXQuaXMoJzpjaGVja2VkJylcclxuICAgICAgICAgICAgPyB0aGlzLnNob3coKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLnNob3coKVxyXG4gICAgICAgICAgICA6IHRoaXMuaGlkZSgpLnBhcmVudHMoJy5mb3JtLWdyb3VwOmVxKDApJykuaGlkZSgpO1xyXG4gICAgICAgIFRhcmdldENoZWNrZWRJbnB1dC5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxufSkoKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVyRG9tZS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9