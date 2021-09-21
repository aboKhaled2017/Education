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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Admin/JS/Courses/Courses.js");
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

/***/ "./src/Admin/JS/Courses/Courses.js":
/*!*****************************************!*\
  !*** ./src/Admin/JS/Courses/Courses.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../../global/helperDome */ "./src/global/helperDome.js");
var CommonUI_1 = __webpack_require__(/*! ../Shared/CommonUI */ "./src/Admin/JS/Shared/CommonUI.js");
$(function () {
    AddCourseOperations.main();
    GetCoursesOperations.main();
});
var CommonFuncs = /** @class */ (function () {
    function CommonFuncs() {
    }
    CommonFuncs.OnAddCourseFormSubmitted = function (e) {
        var _this = this;
        if (!this.AddCourseForm.valid())
            return;
        this.AddCourseForm.ajaxSubmit('/Admin/Courses/Add', 'POST', false, function (def, model) {
            def.done(function (id) {
                $.notify({ message: "تم اضافة الكورس بنجاح" });
                _this.ResetAddCourseForm();
                GetCoursesOperations.Refresh();
            }).catch(function (e) {
                $.notifyCatch(e.responseJSON);
            }).always(function (e) {
                _this.AddCourseBtn.pendingState(false);
            });
        }, function () { _this.AddCourseBtn.pendingState(true, 'fa-plus'); });
    };
    CommonFuncs.OnEditCourseFormSubmitted = function (e) {
        var _this = this;
        if (!this.EditCourseForm.valid())
            return;
        this.EditCourseForm.ajaxSubmit('/Admin/Courses/Edit', 'POST', false, function (def, model) {
            def.done(function () {
                var Model = {};
                for (var prop in model) {
                    var Prop = prop.charAt(0).toLocaleLowerCase() + '' + prop.slice(1);
                    Model[Prop] = model[prop];
                }
                Model.categoryName = AddCourseOperations.GetCategoryNameById(Model.categoryId);
                $.notify({ message: "تم تعديل الكورس بنجاح", target: "#EditCourseModal" }, { z_index: 999999999 });
                _this.EditDesignCourseCard(Model, _this.CurrentSelectedUpdatableCard);
                //GetCoursesOperations.Refresh();
            }).catch(function (e) {
                $.notifyCatch(e.responseJSON);
            }).always(function (e) {
                _this.EditCourseSubmitBtn.pendingState(false);
            });
        }, function () { _this.EditCourseSubmitBtn.pendingState(true, 'fa-edit'); });
    };
    return CommonFuncs;
}());
var AddCourseOperations = {
    SelectCategoryDataList: [],
    selectCategoryBtn: $("#Categories"),
    CategoryIdInp: $("#CategoryId"),
    AddCourseBtn: $("#AddCourseBtn"),
    AddCourseForm: $("#AddCourse form:eq(0)"),
    NotNowBtn: $('.notNowBtn'),
    GetCategoryNameById: function (id) {
        var superId = this.SelectCategoryDataList.find(function (v) { return v.id == id; }).superId;
        return superId == null
            ? this.SelectCategoryDataList.find(function (v) { return v.id == id; }).name
            : this.SelectCategoryDataList.find(function (v) { return v.id == superId; }).name + "/\n               " + this.SelectCategoryDataList.find(function (v) { return v.id == id; }).name;
    },
    MakeDropDownMenuForCategories: function (data, SuperId) {
        if (SuperId === void 0) { SuperId = null; }
        var ElsContainer = $();
        var _loop_1 = function (category) {
            if (category.superId != SuperId)
                return "continue";
            if (category.subs.length == 0) {
                var item = $("<li><a tabindex=\"-1\">" + category.name + "</a></li>");
                item.data("id", category.id).data("name", category.name);
                ElsContainer = ElsContainer.add(item);
            }
            else {
                var item = $("<li class=\"dropup\">\n                        <a class=\"sub dropdown-toggle\" data-toggle=\"dropdown\" tabindex=\"-1\">\n                            " + category.name + " <span class=\"caret\"></span>\n                        </a>\n                    </li>");
                var SubMenu = $("<ul class=\"dropdown-menu subMenu dropdown-menu-right\" role=\"menu\" style=\"display: none\">\n                        </ul>");
                var SubList = this_1.SelectCategoryDataList.filter(function (item, index) {
                    if (category.subs.indexOf(item.id) >= 0)
                        return item;
                });
                SubMenu.append(this_1.MakeDropDownMenuForCategories(SubList, category.id));
                item.append(SubMenu);
                item.data("id", category.id);
                ElsContainer = ElsContainer.add(item);
            }
        };
        var this_1 = this;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var category = data_1[_i];
            _loop_1(category);
        }
        return ElsContainer;
    },
    HandleDropDownMenu: function () {
        var mainObj = this;
        $(".dropdown a.sub,.dropup a.sub").on("click", function (e) {
            $(this)
                .next("ul")
                .toggle();
            e.stopPropagation();
            e.preventDefault();
        });
        this.selectCategoryBtn
            .data('text', 'اختر القسم')
            .find("li")
            .css("cursor", "pointer")
            .not(".dropdown")
            .on("click", function (e) {
            var el = $(this);
            mainObj.selectCategoryBtn.find("button .text").text(el.data("name"));
            el.parents(".subMenu").hide();
            mainObj.CategoryIdInp.val(el.data("id"));
            mainObj.AddCourseForm.valid();
        });
    },
    CreateCategoryBtnList: function () {
        var _this = this;
        var ElsContainer = $();
        $.get("/Admin/Category/ItemsList").done(function (result) {
            _this.SelectCategoryDataList = result.data;
            _this.selectCategoryBtn
                .find(".dropdown-menu")
                .empty()
                .append(_this.MakeDropDownMenuForCategories(result.data));
            _this.HandleDropDownMenu();
        });
    },
    HandleAddCourseSubmit: function () {
        this.AddCourseForm.data("validator").settings.ignore = "[Name='Id']";
        $("body").on('click', '#AddCourseBtn', CommonFuncs.OnAddCourseFormSubmitted.bind(this));
    },
    ResetDropdownMenu: function () {
        this.selectCategoryBtn.find('.text').text(this.selectCategoryBtn.data('text'));
    },
    ResetAddCourseForm: function () {
        this.AddCourseForm.find('input:not(#Id)').val('');
        $('#IsOpened').val('false');
        $('.toogleBtn:eq(0)').removeClass("fa-toggle-on").addClass('fa-toggle-off');
        this.ResetDropdownMenu();
    },
    HandleToggleBtn: function () {
        var _this = this;
        this.AddCourseForm.find(".toogleBtn:eq(0)").click(function (e) {
            var iconbtn = $(e.target);
            iconbtn.toggleClass("fa-toggle-on fa-toggle-off");
            var text = "", isOpened = false;
            if (iconbtn.hasClass("fa-toggle-on")) {
                text = "الكورس متاح الان";
                isOpened = true;
            }
            else {
                text = "الكورس غير متاح الان";
                isOpened = false;
            }
            _this.AddCourseForm.find(".toggleText:eq(0)").text(text);
            $("#IsOpened").val("" + isOpened);
        });
    },
    HandleSomeFormOperations: function () {
        this.AddCourseForm.find('input').each(function (i, el) {
            var input = $(this);
            if (input.prop('id') == "CostOfCourse") {
                input.data('prompt', input.prop('placeholder'));
                input.data('notnow', 'لم تحدد التكلفة الان');
            }
            if (input.prop('id') == "Period") {
                input.data('prompt', input.prop('placeholder'));
                input.data('notnow', 'لم تحدد المدة الان');
            }
            if (input.prop('id') == "StartDateOfBegin") {
                input.data('prompt', input.prop('placeholder'));
                input.data('notnow', 'لم يحدد موعد بداية الكورس الان');
            }
            if (input.is('[type="date"]')) {
                input.addClass('withDate');
            }
        });
        CommonUI_1.CommonUi.NotInputForBtnNow(this.NotNowBtn);
    },
    main: function () {
        this.HandleToggleBtn();
        this.HandleAddCourseSubmit();
        this.CreateCategoryBtnList();
        this.HandleSomeFormOperations();
    }
};
var GetCoursesOperations = {
    CurrentSelectedUpdatableCard: $(),
    CoursesCount: 0,
    CoursesSection: $('#GetCourses .courses'),
    CourseCountText: $('.CourcesCount .count:eq(0)'),
    EditCourseModal: $('#EditCourseModal'),
    GetCoursesUrl: '/Admin/Courses/List',
    DeleteCourseUrl: '/Admin/Courses/Delete',
    EditCourseUrl: '/Admin/Courses/Edit',
    EditCourseImgBgUrl: '/Admin/Courses/EditBgImg',
    CardImgBaseUrl: '/images/admin/courses/',
    CourseCardTemplate: $('.CourseCardTemplate:eq(0)'),
    get CourseCard() {
        return $('.CourseCardTemplate');
    },
    get EditBgImgBtn() {
        return $('.CourseCardTemplate .EditBcImg');
    },
    get EditCourse() {
        return $('#EditCourse');
    },
    get EditCourseForm() {
        return this.EditCourse.find('form:eq(0)');
    },
    get EditCourseSubmitBtn() {
        return this.EditCourse.find('#EditCourseBtn');
    },
    get loadingIcon() {
        return this.CoursesSection.find('.loading:eq(0)');
    },
    DesignCourseCard: function (course) {
        var template = this.CourseCardTemplate.clone(true).removeClass('hidden');
        template.data('course', course);
        var costText = course.costOfCourse ? "\u0633\u0639\u0631 \u0627\u0644\u0643\u0648\u0631\u0633 " + course.costOfCourse + " \u062C\u0646\u064A\u0629" : 'سعر الكورس غير محدد';
        var DateText = course.startDateOfBegin ? "\u064A\u0628\u062F\u0623 \u0645\u0646 " + new Date(course.startDateOfBegin).toLocaleDateString()
            : "\u0644\u0645 \u064A\u062D\u062F\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0643\u0648\u0631\u0633";
        var periodText = course.period ? course.period : "\u0644\u0645 \u062A\u062D\u062F\u062F\u0629 \u0645\u062F\u0629 \u0627\u0644\u0643\u0648\u0631\u0633";
        var statusText = course.isOpened ? "الكورس متاح حاليا" : "الكورس غير متاح حاليا";
        template.find('.Name:eq(0)').text(course.name);
        template.find('.Desc:eq(0)').text(course.description).prop('title', course.description);
        template.find('.Category:eq(0)').text("\u0642\u0633\u0645 " + course.categoryName).data('id', course.categoryId);
        template.find('.Cost:eq(0)').text(costText);
        template.find('.Date:eq(0)').text(DateText);
        template.find('.IsOpened:eq(0)').text(statusText);
        template.find('.Period:eq(0)').text(periodText);
        template.find('.videoCount:eq(0)').text(course.videosCount);
        if (course.backgroundImgSrc)
            template.find('img:eq(0)').attr('src', "/images/admin/courses/" + course.backgroundImgSrc);
        template.find('a.content').prop('href', "/Admin/Courses/Content?id=" + course.id);
        return template;
    },
    EditDesignCourseCard: function (course, template) {
        template.data('course', course);
        var costText = course.costOfCourse ? "\u0633\u0639\u0631 \u0627\u0644\u0643\u0648\u0631\u0633 " + course.costOfCourse + " \u062C\u0646\u064A\u0629" : 'سعر الكورس غير محدد';
        var DateText = course.startDateOfBegin ? "\u064A\u0628\u062F\u0623 \u0645\u0646 " + new Date(course.startDateOfBegin).toLocaleDateString()
            : "\u0644\u0645 \u064A\u062D\u062F\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0643\u0648\u0631\u0633";
        var periodText = course.period ? course.period : "\u0644\u0645 \u062A\u062D\u062F\u062F\u0629 \u0645\u062F\u0629 \u0627\u0644\u0643\u0648\u0631\u0633";
        var statusText = course.isOpened ? "الكورس متاح حاليا" : "الكورس غير متاح حاليا";
        template.find('.Name:eq(0)').text(course.name);
        template.find('.Desc:eq(0)').text(course.description).prop('title', course.description);
        ;
        template.find('.Category:eq(0)').text("\u0642\u0633\u0645 " + course.categoryName).data('id', course.categoryId);
        template.find('.Cost:eq(0)').text(costText);
        template.find('.Date:eq(0)').text(DateText);
        template.find('.IsOpened:eq(0)').text(statusText);
        template.find('.Period:eq(0)').text(periodText);
        template.find('.videoCount:eq(0)').text(course.videosCount);
        if (course.backgroundImgSrc)
            template.find('img:eq(0)').attr('src', "/images/admin/courses/" + course.backgroundImgSrc);
    },
    DrawCourses: function (courses) {
        this.CoursesCount = courses.length;
        this.CourseCountText.text(this.CoursesCount);
        this.CoursesSection.empty();
        var coursesContainer = $();
        for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
            var c = courses_1[_i];
            coursesContainer = coursesContainer.add(this.DesignCourseCard(c));
        }
        this.CoursesSection.append(coursesContainer);
    },
    GetCourses: function () {
        var _this = this;
        $.get(this.GetCoursesUrl).done(function (data) {
            _this.DrawCourses(data);
        }).catch(function (e) {
            $.notify({ message: "تعذر عملية تحميل البيانات من الخادم" });
        }).always(function () {
            _this.loadingIcon.hide();
        });
    },
    Refresh: function () {
        this.GetCourses();
    },
    HandleDesignCardOperations: function () {
        var showInfoIcon = this.CourseCard.find('.showInfo');
        this.CourseCard.on('click', '.details', function () {
            var showInfoIcon = $(this);
            var designParent = showInfoIcon.parents('.CourseCardTemplate');
            var cardInfo = designParent.find('.courseInfo:eq(0)');
            cardInfo.css({ top: 0 });
        })
            .on('click', '.closeInfo', function () {
            $(this).parents('.courseInfo').css({ top: '-100%' });
        });
    },
    ToggleFormForModal: function () {
        if ($('#EditCourse').hasClass('noForm')) {
            AddCourseOperations.ResetAddCourseForm();
            var form = $("#AddCourse form:eq(0)").detach();
            form.find('#AddCourseBtn').attr('id', 'EditCourseBtn')
                .find('i').removeClass('fa-plus').addClass('fa-edit').end()
                .find('.text').text('حفظ');
            $('#EditCourse').append(form);
            $('#EditCourse').removeClass('noForm');
        }
        else {
            var form = $("#EditCourse form:eq(0)").detach();
            form.find('#EditCourseBtn').attr('id', 'AddCourseBtn')
                .find('i').addClass('fa-plus').removeClass('fa-edit').end()
                .find('.text').text('اضافة');
            $("#AddCourse").append(form);
            $('#EditCourse').addClass('noForm');
            AddCourseOperations.ResetAddCourseForm();
        }
    },
    FormatDateTo_yyyy_mm_dd: function (dateStr) {
        var date = new Date(dateStr);
        var mm = date.getMonth() + 1;
        mm = (mm > 9) ? mm : "0" + mm;
        var dd = date.getDate();
        dd = (dd > 9) ? dd : "0" + dd;
        return dateStr = date.getFullYear() + "-" + mm + "-" + dd;
    },
    BindDataToTargetForm: function (TargetForm, data) {
        var dateStr = data.startDateOfBegin ? this.FormatDateTo_yyyy_mm_dd(data.startDateOfBegin) : "";
        $('#EditCourse #Categories .text').text(data.categoryName);
        var statusText = "", RemoveToggleClass = "", AddToggleClass = "";
        if (data.isOpened) {
            statusText = "الكورس متاح حاليا";
            RemoveToggleClass = "fa-toggle-off";
            AddToggleClass = "fa-toggle-on";
        }
        else {
            statusText = "الكورس غير متاح حاليا";
            RemoveToggleClass = "fa-toggle-on";
            AddToggleClass = "fa-toggle-off";
        }
        $('#EditCourse .toggleText').text(statusText);
        $('#EditCourse .toogleBtn').removeClass(RemoveToggleClass).addClass(AddToggleClass);
        for (var item in data) {
            var Uitem = item.charAt(0).toUpperCase() + item.slice(1);
            if (Uitem == "StartDateOfBegin") {
                TargetForm.find("#StartDateOfBegin").val(dateStr);
                continue;
            }
            TargetForm.find("#" + Uitem).val(data[item]);
        }
    },
    HandleOnCourseUD: function () {
        var mainObject = this;
        this.CourseCard.on('click', '.deleteCourse', function () {
            var _this = this;
            $.confirmNotify("عند حذف الكورس سيتم حذف كل الفيديوهاتالمتعلقة به,هل تريد الحذف", function (IsConfimed) {
                if (!IsConfimed)
                    return;
                var btn = $(_this);
                var card = $(_this).parents('.CourseCardTemplate');
                var id = card.data('course').id;
                btn.pendingState(true, 'fa-remove');
                $.post(mainObject.DeleteCourseUrl + "?Id=" + id).done(function () {
                    btn.pendingState(false);
                    card.fadeOut();
                    mainObject.CoursesCount = mainObject.CoursesCount - 1;
                    mainObject.CourseCountText.text(mainObject.CoursesCount);
                }).catch(function (e) {
                    $.notifyCatch(e);
                });
            });
        });
        $("body").on('click', '#EditCourseBtn', CommonFuncs.OnEditCourseFormSubmitted.bind(this));
        this.CourseCard.on('click', '.editCourse', function () {
            mainObject.ToggleFormForModal();
            $('#EditCourseModal').modal('show');
            var card = $(this).parents('.CourseCardTemplate');
            var data = card.data('course');
            mainObject.CurrentSelectedUpdatableCard = card;
            mainObject.BindDataToTargetForm($('#EditCourse form:eq(0)'), data);
        });
    },
    HandleModals: function () {
        var _this = this;
        $(document.body).append(this.EditCourseModal.clone(true));
        this.EditCourseModal.remove();
        $(document.body).on('hide.bs.modal', '#EditCourseModal', function () {
            _this.ToggleFormForModal();
        });
    },
    HandleOnCardImgChange: function () {
        var id = "";
        var mainObject = this;
        var formData;
        $.UploadImage(this.EditBgImgBtn, function (file, ext) {
            var _this = this;
            id = this.data('course').id;
            var Name = "" + Date.now() + ext;
            formData = new FormData();
            formData.append("Id", id);
            formData.append("Name", Name);
            formData.append("Image", file);
            var icon = this.find('i.EditBcImg:eq(0)');
            icon.switchPendingState(true, "fa-picture-o");
            $.ajax({
                url: mainObject.EditCourseImgBgUrl,
                data: formData,
                method: "POST",
                processData: false,
                cache: false,
                contentType: false
            })
                .done(function () {
                _this.find('img:eq(0)').prop('src', "" + mainObject.CardImgBaseUrl + Name);
                $.notify({
                    message: "تم حفظ الصورة بنجاح"
                });
            })
                .always(function () {
                icon.switchPendingState(false);
            })
                .catch(function (e) {
                $.notify({
                    message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
                });
            });
        });
    },
    main: function () {
        this.GetCourses();
        this.HandleDesignCardOperations();
        this.HandleOnCourseUD();
        this.HandleModals();
        this.HandleOnCardImgChange();
    }
};
//# sourceMappingURL=Courses.js.map

/***/ }),

/***/ "./src/Admin/JS/Shared/CommonUI.js":
/*!*****************************************!*\
  !*** ./src/Admin/JS/Shared/CommonUI.js ***!
  \*****************************************/
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
var CommonUi = /** @class */ (function () {
    function CommonUi(selectCategoryBtn, CategoryIdInp, dataUrl) {
        if (dataUrl === void 0) { dataUrl = "/Admin/Category/ItemsList"; }
        this.selectCategoryBtn = selectCategoryBtn;
        this.CategoryIdInp = CategoryIdInp;
        this.dataUrl = dataUrl;
        this.SelectCategoryDataList = [];
        this.OnCategorySelected = function () { };
        this.DefaultMenuValues = {
            text: "اختر اسم القسم",
            id: ""
        };
    }
    CommonUi.NotInputForBtnNow = function (GeneralBtn) {
        GeneralBtn.click(function (e) {
            var btn = $(this);
            var input = btn.parents(".form-group:eq(0)").find("input:eq(0)");
            if (btn.is(":checked")) {
                input.data("value", input.val());
                input.attr("disabled", "disabled").val("");
                input.prop("placeholder", input.data("notnow"));
                if (input.is(".withDate")) {
                    input.attr("type", "text");
                }
            }
            else {
                var dataVal = input.data("value");
                input.removeAttr("disabled").prop("placeholder", input.data("prompt"));
                if (dataVal)
                    input.val(dataVal);
                if (input.is(".withDate")) {
                    input.attr("type", "date");
                }
            }
            input.triggerHandler("change");
        });
    };
    CommonUi.GetCategoryNameById = function (id, dataList) {
        return dataList.find(function (v) { return v.id == id; }).name;
    };
    CommonUi.GetFullCategoryNameById = function (id, dataList) {
        var superId = dataList.find(function (v) { return v.id == id; }).superId;
        return superId == null
            ? dataList.find(function (v) { return v.id == id; }).name
            : dataList.find(function (v) { return v.id == superId; }).name + "/\n               " + dataList.find(function (v) { return v.id == id; }).name;
    };
    CommonUi.prototype.MakeDropDownMenuForCategories = function (data, SuperId) {
        if (SuperId === void 0) { SuperId = null; }
        var ElsContainer = $();
        var _loop_1 = function (category) {
            if (category.superId != SuperId)
                return "continue";
            if (category.subs.length == 0) {
                var item = $("<li><a tabindex=\"-1\">" + category.name + "</a></li>");
                item.data("id", category.id).data("name", category.name);
                ElsContainer = ElsContainer.add(item);
            }
            else {
                var item = $("<li class=\"dropup\">\n                        <a class=\"sub dropdown-toggle\" data-toggle=\"dropdown\" tabindex=\"-1\">\n                            " + category.name + " <span class=\"caret\"></span>\n                        </a>\n                    </li>");
                var SubMenu = $("<ul class=\"dropdown-menu subMenu dropdown-menu-right\" role=\"menu\" style=\"display: none\">\n                        </ul>");
                var SubList = this_1.SelectCategoryDataList.filter(function (item, index) {
                    if (category.subs.indexOf(item.id) >= 0)
                        return item;
                });
                SubMenu.append(this_1.MakeDropDownMenuForCategories(SubList, category.id));
                item.append(SubMenu);
                item.data("id", category.id);
                ElsContainer = ElsContainer.add(item);
            }
        };
        var this_1 = this;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var category = data_1[_i];
            _loop_1(category);
        }
        return ElsContainer;
    };
    CommonUi.prototype.HandleDropDownMenu = function () {
        var mainObj = this;
        $(".dropdown a.sub,.dropup a.sub").on("click", function (e) {
            $(this)
                .next("ul")
                .toggle();
            e.stopPropagation();
            e.preventDefault();
        });
        this.selectCategoryBtn
            .data("text", this.DefaultMenuValues.text)
            .data("id", this.DefaultMenuValues.id)
            .find("li")
            .css("cursor", "pointer")
            .not(".dropdown")
            .on("click", function (e) {
            var el = $(this);
            var text = CommonUi.GetFullCategoryNameById(el.data("id"), mainObj.SelectCategoryDataList);
            mainObj.selectCategoryBtn.find("button .text").text(text);
            el.parents(".subMenu").hide();
            mainObj.CategoryIdInp.val(el.data("id")).trigger("change");
            mainObj.OnCategorySelected();
            e.stopPropagation();
        });
    };
    CommonUi.prototype.CreateCategoryBtnList = function (AfterCreated) {
        return __awaiter(this, void 0, void 0, function () {
            var ElsContainer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ElsContainer = $();
                        return [4 /*yield*/, $.get(this.dataUrl).done(function (result) {
                                _this.SelectCategoryDataList = result.data;
                                _this.SetMenuTextForCurrentId();
                                _this.selectCategoryBtn
                                    .find(".text")
                                    .text(_this.DefaultMenuValues.text)
                                    .end()
                                    .find(".dropdown-menu")
                                    .empty()
                                    .append(_this.MakeDropDownMenuForCategories(result.data));
                                _this.HandleDropDownMenu();
                                AfterCreated();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonUi.prototype.SetMenuTextForCurrentId = function () {
        if (this.DefaultMenuValues.id == "")
            return;
        this.DefaultMenuValues.text = CommonUi.GetFullCategoryNameById(this.DefaultMenuValues.id, this.SelectCategoryDataList);
    };
    CommonUi.prototype.SetMenuTextForCategoryId = function (id, text) {
        if (text)
            this.DefaultMenuValues.text = text;
        this.DefaultMenuValues.id = id;
        return this;
    };
    return CommonUi;
}());
exports.CommonUi = CommonUi;
var CommonButtons = /** @class */ (function () {
    function CommonButtons() {
    }
    CommonButtons.DeleteBtn = function () {
        return $("<button class=\"controlBtn delete  btn btn-danger\">\n              <span>\u062D\u0630\u0641 </span>\n              <i class=\"fa fa-remove\"></i>\n            </button>");
    };
    CommonButtons.SaveBtn = function () {
        return $("<button class=\"controlBtn save  btn btn-primary\">\n                <span>\u062D\u0641\u0638 </span>\n                <i class=\"fa fa-check-circle\"></i>\n            </button>");
    };
    CommonButtons.EditBtn = function () {
        return $("<button class=\"controlBtn edit  btn btn-info\">\n                <span>\u062A\u0639\u062F\u064A\u0644 </span>\n                <i class=\"fa fa-edit\"></i>\n            </button>");
    };
    CommonButtons.CustomBtn = function (label, iconClass) {
        return $("<button class=\"controlBtn edit  btn btn-info\">\n                <span>" + label + " </span>\n                <i class=\"fa " + iconClass + "\"></i>\n            </button>");
    };
    return CommonButtons;
}());
exports.CommonButtons = CommonButtons;
//# sourceMappingURL=CommonUI.js.map

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0Fzc2VzdHMvQm9vdHN0cmFwQ29tcG9uZW50cy9ib290c3RyYXBOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0pTL0NvdXJzZXMvQ291cnNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQWRtaW4vSlMvU2hhcmVkL0NvbW1vblVJLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwvaGVscGVyRG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQSxnSEFBZ0gsRUFBRSxvSEFBb0gsK0VBQStFLEVBQUUsNENBQTRDLEVBQUUsaUhBQWlILEVBQUUsd0dBQXdHLDhDQUE4QyxFQUFFLGFBQWEsRUFBRTtBQUMvbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDLHFDQUFxQyxrQkFBa0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7OztBQzNWYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFPLENBQUMsOERBQTRCO0FBQ3BDLGlCQUFpQixtQkFBTyxDQUFDLDZEQUFvQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVMsZUFBZSxrREFBa0QsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwrREFBK0QsR0FBRyxxQkFBcUI7QUFDakg7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTLGVBQWUseURBQXlELEVBQUU7QUFDbkY7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLG1CQUFtQixFQUFFO0FBQzFGO0FBQ0EsNkRBQTZELG1CQUFtQixFQUFFO0FBQ2xGLDZEQUE2RCx3QkFBd0IsRUFBRSwrRUFBK0UsbUJBQW1CLEVBQUU7QUFDM0wsS0FBSztBQUNMO0FBQ0EsaUNBQWlDLGdCQUFnQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsdUJBQXVCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHNCQUFzQixpREFBaUQ7QUFDdkUsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixTQUFTO0FBQ25DLFNBQVM7QUFDVDtBQUNBLGdEQUFnRCxlQUFlO0FBQy9ELFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7O0FDaGJhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDZCQUE2QiwwQkFBMEIsYUFBYSxFQUFFLHFCQUFxQjtBQUN4RyxnQkFBZ0IscURBQXFELG9FQUFvRSxhQUFhLEVBQUU7QUFDeEosc0JBQXNCLHNCQUFzQixxQkFBcUIsR0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsa0NBQWtDLFNBQVM7QUFDM0Msa0NBQWtDLFdBQVcsVUFBVTtBQUN2RCx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBLDZHQUE2RyxPQUFPLFVBQVU7QUFDOUgsZ0ZBQWdGLGlCQUFpQixPQUFPO0FBQ3hHLHdEQUF3RCxnQkFBZ0IsUUFBUSxPQUFPO0FBQ3ZGLDhDQUE4QyxnQkFBZ0IsZ0JBQWdCLE9BQU87QUFDckY7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLFNBQVMsWUFBWSxhQUFhLE9BQU8sRUFBRSxVQUFVLFdBQVc7QUFDaEUsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSxpQ0FBaUMsdUNBQXVDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMkNBQTJDLG1CQUFtQixFQUFFO0FBQ2hFO0FBQ0E7QUFDQSxrREFBa0QsbUJBQW1CLEVBQUU7QUFDdkU7QUFDQSwwQ0FBMEMsbUJBQW1CLEVBQUU7QUFDL0QsMENBQTBDLHdCQUF3QixFQUFFLDREQUE0RCxtQkFBbUIsRUFBRTtBQUNySjtBQUNBO0FBQ0EsaUNBQWlDLGdCQUFnQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esb0M7Ozs7Ozs7Ozs7OztBQ3ZNYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsbUJBQU8sQ0FBQyx3SEFBc0Q7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyx1QkFBdUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxzQyIsImZpbGUiOiIuL0FkbWluL2pzL0NvdXJzZXMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvQWRtaW4vSlMvQ291cnNlcy9Db3Vyc2VzLmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2Jvb3RzdHJhcE5vdGlmeS5kLnRzXCIgLz5cclxudmFyIG5vdGlmeVRlbXBsYXRlID0gXCJcXG4gPGRpdiBkYXRhLW5vdGlmeT1cXFwiY29udGFpbmVyXFxcIiBjbGFzcz1cXFwiY29sLXhzLTExIGNvbC1zbS00IGFsZXJ0IGJvb3RzdHJhcE5vdGlmeSBhbGVydC17MH1cXFwiIHJvbGU9XFxcImFsZXJ0XFxcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtbm90aWZ5PVxcXCJkaXNtaXNzXFxcIj4mdGltZXM7PC9idXR0b24+XFxuICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJpY29uXFxcIj48L3NwYW4+IDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJ0aXRsZVxcXCI+ezF9PC9zcGFuPlxcbiAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwibWVzc2FnZVxcXCI+ezJ9PC9zcGFuPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzc1xcXCIgZGF0YS1ub3RpZnk9XFxcInByb2dyZXNzYmFyXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXswfVxcXCIgcm9sZT1cXFwicHJvZ3Jlc3NiYXJcXFwiIGFyaWEtdmFsdWVub3c9XFxcIjBcXFwiIGFyaWEtdmFsdWVtaW49XFxcIjBcXFwiIGFyaWEtdmFsdWVtYXg9XFxcIjEwMFxcXCIgc3R5bGU9XFxcIndpZHRoOiAwJTtcXFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGEgaHJlZj1cXFwiezN9XFxcIiB0YXJnZXQ9XFxcIns0fVxcXCIgZGF0YS1ub3RpZnk9XFxcInVybFxcXCI+PC9hPlxcbjwvZGl2PlxcblwiO1xyXG52YXIgZGVmYXVsdHMgPSB7XHJcbiAgICBlbGVtZW50OiAnYm9keScsXHJcbiAgICBwb3NpdGlvbjogbnVsbCxcclxuICAgIHR5cGU6IFwiaW5mb1wiLFxyXG4gICAgYWxsb3dfZGlzbWlzczogdHJ1ZSxcclxuICAgIGFsbG93X2R1cGxpY2F0ZXM6IHRydWUsXHJcbiAgICBuZXdlc3Rfb25fdG9wOiBmYWxzZSxcclxuICAgIHNob3dQcm9ncmVzc2JhcjogZmFsc2UsXHJcbiAgICBwbGFjZW1lbnQ6IHtcclxuICAgICAgICBmcm9tOiBcInRvcFwiLFxyXG4gICAgICAgIGFsaWduOiBcInJpZ2h0XCJcclxuICAgIH0sXHJcbiAgICBvZmZzZXQ6IDIwLFxyXG4gICAgc3BhY2luZzogMTAsXHJcbiAgICB6X2luZGV4OiA5OTk5OTk5OTk5OTk5LFxyXG4gICAgZGVsYXk6IDUwMDAsXHJcbiAgICB0aW1lcjogMTAwMCxcclxuICAgIHVybF90YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgbW91c2Vfb3ZlcjogbnVsbCxcclxuICAgIGFuaW1hdGU6IHtcclxuICAgICAgICBlbnRlcjogJ2FuaW1hdGVkIGZhZGVJbkRvd24nLFxyXG4gICAgICAgIGV4aXQ6ICdhbmltYXRlZCBmYWRlT3V0VXAnXHJcbiAgICB9LFxyXG4gICAgb25TaG93OiBudWxsLFxyXG4gICAgb25TaG93bjogbnVsbCxcclxuICAgIG9uQ2xvc2U6IG51bGwsXHJcbiAgICBvbkNsb3NlZDogbnVsbCxcclxuICAgIGljb25fdHlwZTogJ2NsYXNzJyxcclxuICAgIHRlbXBsYXRlOiBub3RpZnlUZW1wbGF0ZVxyXG59O1xyXG5TdHJpbmcuZm9ybWF0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgdmFyIHN0ciA9IGFyZ3VtZW50c1swXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoUmVnRXhwKFwiXFxcXHtcIiArIChpIC0gMSkgKyBcIlxcXFx9XCIsIFwiZ21cIiksIGFyZ3VtZW50c1tpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG59O1xyXG5mdW5jdGlvbiBpc0R1cGxpY2F0ZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pIHtcclxuICAgIHZhciBpc0R1cGUgPSBmYWxzZTtcclxuICAgICQoJ1tkYXRhLW5vdGlmeT1cImNvbnRhaW5lclwiXScpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xyXG4gICAgICAgIHZhciB0aXRsZSA9ICRlbC5maW5kKCdbZGF0YS1ub3RpZnk9XCJ0aXRsZVwiXScpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAkZWwuZmluZCgnW2RhdGEtbm90aWZ5PVwibWVzc2FnZVwiXScpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgLy8gVGhlIGlucHV0IHN0cmluZyBtaWdodCBiZSBkaWZmZXJlbnQgdGhhbiB0aGUgYWN0dWFsIHBhcnNlZCBIVE1MIHN0cmluZyFcclxuICAgICAgICAvLyAoPGJyPiB2cyA8YnIgLz4gZm9yIGV4YW1wbGUpXHJcbiAgICAgICAgLy8gU28gd2UgaGF2ZSB0byBmb3JjZS1wYXJzZSB0aGlzIGFzIEhUTUwgaGVyZSFcclxuICAgICAgICB2YXIgaXNTYW1lVGl0bGUgPSB0aXRsZSA9PT0gJChcIjxkaXY+XCIgKyBub3RpZmljYXRpb24uc2V0dGluZ3MuY29udGVudC50aXRsZSArIFwiPC9kaXY+XCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIGlzU2FtZU1zZyA9IG1lc3NhZ2UgPT09ICQoXCI8ZGl2PlwiICsgbm90aWZpY2F0aW9uLnNldHRpbmdzLmNvbnRlbnQubWVzc2FnZSArIFwiPC9kaXY+XCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIGlzU2FtZVR5cGUgPSAkZWwuaGFzQ2xhc3MoJ2FsZXJ0LScgKyBub3RpZmljYXRpb24uc2V0dGluZ3MudHlwZSk7XHJcbiAgICAgICAgaWYgKGlzU2FtZVRpdGxlICYmIGlzU2FtZU1zZyAmJiBpc1NhbWVUeXBlKSB7XHJcbiAgICAgICAgICAgIC8vd2UgZm91bmQgdGhlIGR1cGUuIFNldCB0aGUgdmFyIGFuZCBzdG9wIGNoZWNraW5nLlxyXG4gICAgICAgICAgICBpc0R1cGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIWlzRHVwZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzRHVwZTtcclxufVxyXG52YXIgTm90aWZ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTm90aWZ5KGVsZW1lbnQsIGNvbnRlbnQsIG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLmNvbnRlbnRPYmogPSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0JyA/IGNvbnRlbnQubWVzc2FnZSA6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogY29udGVudC50aXRsZSA/IGNvbnRlbnQudGl0bGUgOiAnJyxcclxuICAgICAgICAgICAgICAgIGljb246IGNvbnRlbnQuaWNvbiA/IGNvbnRlbnQuaWNvbiA6ICdwZS03cy1iZWxsJyxcclxuICAgICAgICAgICAgICAgIHVybDogY29udGVudC51cmwgPyBjb250ZW50LnVybCA6ICcjJyxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogY29udGVudC50YXJnZXQgPyBjb250ZW50LnRhcmdldCA6ICctJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm5vdGlmeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy4kZWxlID0gJCgpO1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb250ZW50T2JqLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQudGFyZ2V0ID09PSBcIi1cIikge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRlbnQudGFyZ2V0ID0gdGhpcy5zZXR0aW5ncy51cmxfdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQgb2FuaW1hdGlvbnN0YXJ0IE1TQW5pbWF0aW9uU3RhcnQgYW5pbWF0aW9uc3RhcnQnLFxyXG4gICAgICAgICAgICBlbmQ6ICd3ZWJraXRBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBNU0FuaW1hdGlvbkVuZCBhbmltYXRpb25lbmQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub2Zmc2V0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLm9mZnNldCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHRoaXMuc2V0dGluZ3Mub2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy5zZXR0aW5ncy5vZmZzZXRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBkdXBsaWNhdGUgbWVzc2FnZXMgYXJlIG5vdCBhbGxvd2VkLCB0aGVuIG9ubHkgY29udGludWUgaWYgdGhpcyBuZXcgbWVzc2FnZSBpcyBub3QgYSBkdXBsaWNhdGUgb2Ygb25lIHRoYXQgaXQgYWxyZWFkeSBzaG93aW5nXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlcyB8fCAoIXRoaXMuc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlcyAmJiAhaXNEdXBsaWNhdGVOb3RpZmljYXRpb24odGhpcykpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIE5vdGlmeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5idWlsZE5vdGlmeSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNldEljb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGVudC51cmwgIT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZVVSTCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0eWxlRGlzbWlzcygpO1xyXG4gICAgICAgIHRoaXMucGxhY2VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5iaW5kKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkgPSB7XHJcbiAgICAgICAgICAgICRlbGU6IHRoaXMuJGVsZSxcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoY29tbWFuZCwgdXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZHMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzW2NvbW1hbmRdID0gdXBkYXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMgPSBjb21tYW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY21kIGluIGNvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjbWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInR5cGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5yZW1vdmVDbGFzcygnYWxlcnQtJyArIHNlbGYuc2V0dGluZ3MudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiAucHJvZ3Jlc3MtYmFyJykucmVtb3ZlQ2xhc3MoJ3Byb2dyZXNzLWJhci0nICsgc2VsZi5zZXR0aW5ncy50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3MudHlwZSA9IGNvbW1hbmRzW2NtZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuYWRkQ2xhc3MoJ2FsZXJ0LScgKyBjb21tYW5kc1tjbWRdKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXSA+IC5wcm9ncmVzcy1iYXInKS5hZGRDbGFzcygncHJvZ3Jlc3MtYmFyLScgKyBjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWNvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpY29uID0gdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLmljb25fdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGljb24ucmVtb3ZlQ2xhc3Moc2VsZi5zZXR0aW5ncy5jb250ZW50Lmljb24pLmFkZENsYXNzKGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkaWNvbi5pcygnaW1nJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGljb24uZmluZCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpY29uLmF0dHIoJ3NyYycsIGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9ncmVzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RlbGF5ID0gc2VsZi5zZXR0aW5ncy5kZWxheSAtIChzZWxmLnNldHRpbmdzLmRlbGF5ICogKGNvbW1hbmRzW2NtZF0gLyAxMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknLCBuZXdEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiBkaXYnKS5hdHRyKCdhcmlhLXZhbHVlbm93JywgY29tbWFuZHNbY21kXSkuY3NzKCd3aWR0aCcsIGNvbW1hbmRzW2NtZF0gKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cmxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJ1cmxcIl0nKS5hdHRyKCdocmVmJywgY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInVybFwiXScpLmF0dHIoJ3RhcmdldCcsIGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiJyArIGNtZCArICdcIl0nKS5odG1sKGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBwb3NYID0gdGhpcy4kZWxlLm91dGVySGVpZ2h0KCkgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLnNwYWNpbmcpICsgcGFyc2VJbnQoc2VsZi5zZXR0aW5ncy5vZmZzZXQueS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVwb3NpdGlvbihwb3NYKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZShkb0FueUFjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuYnVpbGROb3RpZnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnNldHRpbmdzLmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy4kZWxlID0gKHR5cGVvZiB0aGlzLnNldHRpbmdzLnRlbXBsYXRlID09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgID8gJChTdHJpbmcuZm9ybWF0KHRoaXMuc2V0dGluZ3MudGVtcGxhdGUsIHRoaXMuc2V0dGluZ3MudHlwZSwgY29udGVudC50aXRsZSwgY29udGVudC5tZXNzYWdlLCBjb250ZW50LnVybCwgY29udGVudC50YXJnZXQpKVxyXG4gICAgICAgICAgICA6IHRoaXMuc2V0dGluZ3MudGVtcGxhdGU7XHJcbiAgICAgICAgdGhpcy4kZWxlLmF0dHIoJ2RhdGEtbm90aWZ5LXBvc2l0aW9uJywgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSArICctJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduKTtcclxuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuYWxsb3dfZGlzbWlzcykge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgodGhpcy5zZXR0aW5ncy5kZWxheSA8PSAwICYmICF0aGlzLnNldHRpbmdzLnNob3dQcm9ncmVzc2JhcikgfHwgIXRoaXMuc2V0dGluZ3Muc2hvd1Byb2dyZXNzYmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXScpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnNldEljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy4kZWxlLmFkZENsYXNzKCdhbGVydC13aXRoLWljb24nKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5pY29uX3R5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuY29udGVudC5pY29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmlzKCdpbWcnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5hdHRyKCdzcmMnLCB0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmFwcGVuZCgnPGltZyBzcmM9XCInICsgdGhpcy5zZXR0aW5ncy5jb250ZW50Lmljb24gKyAnXCIgYWx0PVwiTm90aWZ5IEljb25cIiAvPicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuc3R5bGVEaXNtaXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIGxlZnQ6ICcxMHB4JyxcclxuICAgICAgICAgICAgdG9wOiAnNTAlJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnLTEzcHgnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRoaXMuc2V0dGluZ3Muel9pbmRleCArIDJcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnN0eWxlVVJMID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJ1cmxcIl0nKS5jc3Moe1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3KScsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRoaXMuc2V0dGluZ3Muel9pbmRleCArIDFcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgb2Zmc2V0QW10ID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueSwgY3NzID0ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgbWFyZ2luOiAnMHB4IGF1dG8nLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA/IHRoaXMuc2V0dGluZ3MucG9zaXRpb24gOiAodGhpcy5zZXR0aW5ncy5lbGVtZW50ID09PSAnYm9keScgPyAnZml4ZWQnIDogJ2Fic29sdXRlJyksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjVzIGVhc2UtaW4tb3V0JyxcclxuICAgICAgICAgICAgekluZGV4OiB0aGlzLnNldHRpbmdzLnpfaW5kZXhcclxuICAgICAgICB9LCBoYXNBbmltYXRpb24gPSBmYWxzZSwgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xyXG4gICAgICAgICQoJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24gKyAnXCJdOm5vdChbZGF0YS1jbG9zaW5nPVwidHJ1ZVwiXSknKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICBvZmZzZXRBbXQgPSBNYXRoLm1heChvZmZzZXRBbXQsIHBhcnNlSW50KCQodGhpcykuY3NzKHNldHRpbmdzLnBsYWNlbWVudC5mcm9tKSkgKyBoICsgcGFyc2VJbnQoc2V0dGluZ3Muc3BhY2luZykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5ld2VzdF9vbl90b3AgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgb2Zmc2V0QW10ID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3NzWyh0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tKV0gPSBvZmZzZXRBbXQgKyAncHgnO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XHJcbiAgICAgICAgICAgICAgICBjc3NbdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ25dID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxyXG4gICAgICAgICAgICAgICAgY3NzLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgY3NzLnJpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRlbGUuY3NzKGNzcykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hbmltYXRlLmVudGVyKTtcclxuICAgICAgICAkLmVhY2goQXJyYXkoJ3dlYmtpdC0nLCAnbW96LScsICdvLScsICdtcy0nLCAnJyksIGZ1bmN0aW9uIChpbmRleCwgcHJlZml4KSB7XHJcbiAgICAgICAgICAgIHNlbGYuJGVsZVswXS5zdHlsZVtwcmVmaXggKyAnQW5pbWF0aW9uSXRlcmF0aW9uQ291bnQnXSA9IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLmVsZW1lbnQgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgJCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpLmFwcGVuZCh0aGlzLiRlbGUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5lbGVtZW50LmFwcGVuZCh0aGlzLiRlbGUpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5ld2VzdF9vbl90b3AgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgb2Zmc2V0QW10ID0gKG9mZnNldEFtdCArIHBhcnNlSW50KHRoaXMuc2V0dGluZ3Muc3BhY2luZykpICsgdGhpcy4kZWxlLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVwb3NpdGlvbihvZmZzZXRBbXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25TaG93KSkge1xyXG4gICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvdy5jYWxsKHRoaXMuJGVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGVsZS5vbmUodGhpcy5hbmltYXRpb25zLnN0YXJ0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhhc0FuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfSkub25lKHRoaXMuYW5pbWF0aW9ucy5lbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvd24pKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvd24uY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc0FuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvd24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vblNob3duLmNhbGwoX3RoaXMuJGVsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA2MDApO1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbGUubW91c2VvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdkYXRhLWhvdmVyJywgXCJ0cnVlXCIpO1xyXG4gICAgICAgIH0pLm1vdXNlb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdkYXRhLWhvdmVyJywgXCJmYWxzZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbGUuZGF0YSgnZGF0YS1ob3ZlcicsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNlbGYuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknLCBzZWxmLnNldHRpbmdzLmRlbGF5KTtcclxuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlbGF5ID0gcGFyc2VJbnQoc2VsZi4kZWxlLmRhdGEoJ25vdGlmeS1kZWxheScpKSAtIHNlbGYuc2V0dGluZ3MudGltZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGYuJGVsZS5kYXRhKCdkYXRhLWhvdmVyJykgPT09ICdmYWxzZScgJiYgc2VsZi5zZXR0aW5ncy5tb3VzZV9vdmVyID09PSBcInBhdXNlXCIpIHx8IHNlbGYuc2V0dGluZ3MubW91c2Vfb3ZlciAhPSBcInBhdXNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9ICgoc2VsZi5zZXR0aW5ncy5kZWxheSAtIGRlbGF5KSAvIHNlbGYuc2V0dGluZ3MuZGVsYXkpICogMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZS5kYXRhKCdub3RpZnktZGVsYXknLCBkZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gZGl2JykuYXR0cignYXJpYS12YWx1ZW5vdycsIHBlcmNlbnQpLmNzcygnd2lkdGgnLCBwZXJjZW50ICsgJyUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkZWxheSA8PSAtKHNlbGYuc2V0dGluZ3MudGltZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBzZWxmLnNldHRpbmdzLnRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgcG9zWCA9IHBhcnNlSW50KHRoaXMuJGVsZS5jc3ModGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSkpLCBoYXNBbmltYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRlbGUuZGF0YSgnY2xvc2luZycsICd0cnVlJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hbmltYXRlLmV4aXQpO1xyXG4gICAgICAgIHNlbGYucmVwb3NpdGlvbihwb3NYKTtcclxuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25DbG9zZSkpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNsb3NlLmNhbGwodGhpcy4kZWxlLCBkb0FueUFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGVsZS5vbmUodGhpcy5hbmltYXRpb25zLnN0YXJ0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhhc0FuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfSkub25lKHRoaXMuYW5pbWF0aW9ucy5lbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNsb3NlZC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5vbkNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbG9zZWQoc2VsZi4kZWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDYwMCk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5yZXBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc1gpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIG5vdGlmaWVzID0gJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24gKyAnXCJdOm5vdChbZGF0YS1jbG9zaW5nPVwidHJ1ZVwiXSknLCAkZWxlbWVudHMgPSB0aGlzLiRlbGUubmV4dEFsbChub3RpZmllcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubmV3ZXN0X29uX3RvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudHMgPSB0aGlzLiRlbGUucHJldkFsbChub3RpZmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3Moc2VsZi5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSwgcG9zWCk7XHJcbiAgICAgICAgICAgIHZhciBoID0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICBwb3NYID0gKHBhcnNlSW50KHBvc1gudG9TdHJpbmcoKSkgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLnNwYWNpbmcpKSArIGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE5vdGlmeTtcclxufSgpKTtcclxuJC5ub3RpZnkgPSBmdW5jdGlvbiAoY29udGVudCwgb3B0aW9ucykge1xyXG4gICAgdmFyIHBsdWdpbiA9IG5ldyBOb3RpZnkodGhpcywgY29udGVudCwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gcGx1Z2luLm5vdGlmeTtcclxufTtcclxuJC5ub3RpZnlEZWZhdWx0cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBkZWZhdWx0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gZGVmYXVsdHM7XHJcbn07XHJcbiQubm90aWZ5Q2xvc2UgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xyXG4gICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSBcInVuZGVmaW5lZFwiIHx8IGNvbW1hbmQgPT09IFwiYWxsXCIpIHtcclxuICAgICAgICAkKCdbZGF0YS1ub3RpZnldJykuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCdbZGF0YS1ub3RpZnktcG9zaXRpb249XCInICsgY29tbWFuZCArICdcIl0nKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgIH1cclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdHN0cmFwTm90aWZ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnJlcXVpcmUoXCIuLi8uLi8uLi9nbG9iYWwvaGVscGVyRG9tZVwiKTtcclxudmFyIENvbW1vblVJXzEgPSByZXF1aXJlKFwiLi4vU2hhcmVkL0NvbW1vblVJXCIpO1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIEFkZENvdXJzZU9wZXJhdGlvbnMubWFpbigpO1xyXG4gICAgR2V0Q291cnNlc09wZXJhdGlvbnMubWFpbigpO1xyXG59KTtcclxudmFyIENvbW1vbkZ1bmNzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29tbW9uRnVuY3MoKSB7XHJcbiAgICB9XHJcbiAgICBDb21tb25GdW5jcy5PbkFkZENvdXJzZUZvcm1TdWJtaXR0ZWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCF0aGlzLkFkZENvdXJzZUZvcm0udmFsaWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuQWRkQ291cnNlRm9ybS5hamF4U3VibWl0KCcvQWRtaW4vQ291cnNlcy9BZGQnLCAnUE9TVCcsIGZhbHNlLCBmdW5jdGlvbiAoZGVmLCBtb2RlbCkge1xyXG4gICAgICAgICAgICBkZWYuZG9uZShmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgICQubm90aWZ5KHsgbWVzc2FnZTogXCLYqtmFINin2LbYp9mB2Kkg2KfZhNmD2YjYsdizINio2YbYrNin2K1cIiB9KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLlJlc2V0QWRkQ291cnNlRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgR2V0Q291cnNlc09wZXJhdGlvbnMuUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnlDYXRjaChlLnJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuQWRkQ291cnNlQnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgX3RoaXMuQWRkQ291cnNlQnRuLnBlbmRpbmdTdGF0ZSh0cnVlLCAnZmEtcGx1cycpOyB9KTtcclxuICAgIH07XHJcbiAgICBDb21tb25GdW5jcy5PbkVkaXRDb3Vyc2VGb3JtU3VibWl0dGVkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdGhpcy5FZGl0Q291cnNlRm9ybS52YWxpZCgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5FZGl0Q291cnNlRm9ybS5hamF4U3VibWl0KCcvQWRtaW4vQ291cnNlcy9FZGl0JywgJ1BPU1QnLCBmYWxzZSwgZnVuY3Rpb24gKGRlZiwgbW9kZWwpIHtcclxuICAgICAgICAgICAgZGVmLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIE1vZGVsID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFByb3AgPSBwcm9wLmNoYXJBdCgwKS50b0xvY2FsZUxvd2VyQ2FzZSgpICsgJycgKyBwcm9wLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGVsW1Byb3BdID0gbW9kZWxbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBNb2RlbC5jYXRlZ29yeU5hbWUgPSBBZGRDb3Vyc2VPcGVyYXRpb25zLkdldENhdGVnb3J5TmFtZUJ5SWQoTW9kZWwuY2F0ZWdvcnlJZCk7XHJcbiAgICAgICAgICAgICAgICAkLm5vdGlmeSh7IG1lc3NhZ2U6IFwi2KrZhSDYqti52K/ZitmEINin2YTZg9mI2LHYsyDYqNmG2KzYp9itXCIsIHRhcmdldDogXCIjRWRpdENvdXJzZU1vZGFsXCIgfSwgeyB6X2luZGV4OiA5OTk5OTk5OTkgfSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5FZGl0RGVzaWduQ291cnNlQ2FyZChNb2RlbCwgX3RoaXMuQ3VycmVudFNlbGVjdGVkVXBkYXRhYmxlQ2FyZCk7XHJcbiAgICAgICAgICAgICAgICAvL0dldENvdXJzZXNPcGVyYXRpb25zLlJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICQubm90aWZ5Q2F0Y2goZS5yZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLkVkaXRDb3Vyc2VTdWJtaXRCdG4ucGVuZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyBfdGhpcy5FZGl0Q291cnNlU3VibWl0QnRuLnBlbmRpbmdTdGF0ZSh0cnVlLCAnZmEtZWRpdCcpOyB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ29tbW9uRnVuY3M7XHJcbn0oKSk7XHJcbnZhciBBZGRDb3Vyc2VPcGVyYXRpb25zID0ge1xyXG4gICAgU2VsZWN0Q2F0ZWdvcnlEYXRhTGlzdDogW10sXHJcbiAgICBzZWxlY3RDYXRlZ29yeUJ0bjogJChcIiNDYXRlZ29yaWVzXCIpLFxyXG4gICAgQ2F0ZWdvcnlJZElucDogJChcIiNDYXRlZ29yeUlkXCIpLFxyXG4gICAgQWRkQ291cnNlQnRuOiAkKFwiI0FkZENvdXJzZUJ0blwiKSxcclxuICAgIEFkZENvdXJzZUZvcm06ICQoXCIjQWRkQ291cnNlIGZvcm06ZXEoMClcIiksXHJcbiAgICBOb3ROb3dCdG46ICQoJy5ub3ROb3dCdG4nKSxcclxuICAgIEdldENhdGVnb3J5TmFtZUJ5SWQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHZhciBzdXBlcklkID0gdGhpcy5TZWxlY3RDYXRlZ29yeURhdGFMaXN0LmZpbmQoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYuaWQgPT0gaWQ7IH0pLnN1cGVySWQ7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVySWQgPT0gbnVsbFxyXG4gICAgICAgICAgICA/IHRoaXMuU2VsZWN0Q2F0ZWdvcnlEYXRhTGlzdC5maW5kKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2LmlkID09IGlkOyB9KS5uYW1lXHJcbiAgICAgICAgICAgIDogdGhpcy5TZWxlY3RDYXRlZ29yeURhdGFMaXN0LmZpbmQoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYuaWQgPT0gc3VwZXJJZDsgfSkubmFtZSArIFwiL1xcbiAgICAgICAgICAgICAgIFwiICsgdGhpcy5TZWxlY3RDYXRlZ29yeURhdGFMaXN0LmZpbmQoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYuaWQgPT0gaWQ7IH0pLm5hbWU7XHJcbiAgICB9LFxyXG4gICAgTWFrZURyb3BEb3duTWVudUZvckNhdGVnb3JpZXM6IGZ1bmN0aW9uIChkYXRhLCBTdXBlcklkKSB7XHJcbiAgICAgICAgaWYgKFN1cGVySWQgPT09IHZvaWQgMCkgeyBTdXBlcklkID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciBFbHNDb250YWluZXIgPSAkKCk7XHJcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgaWYgKGNhdGVnb3J5LnN1cGVySWQgIT0gU3VwZXJJZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XHJcbiAgICAgICAgICAgIGlmIChjYXRlZ29yeS5zdWJzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQoXCI8bGk+PGEgdGFiaW5kZXg9XFxcIi0xXFxcIj5cIiArIGNhdGVnb3J5Lm5hbWUgKyBcIjwvYT48L2xpPlwiKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YShcImlkXCIsIGNhdGVnb3J5LmlkKS5kYXRhKFwibmFtZVwiLCBjYXRlZ29yeS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIEVsc0NvbnRhaW5lciA9IEVsc0NvbnRhaW5lci5hZGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQoXCI8bGkgY2xhc3M9XFxcImRyb3B1cFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XFxcInN1YiBkcm9wZG93bi10b2dnbGVcXFwiIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgKyBjYXRlZ29yeS5uYW1lICsgXCIgPHNwYW4gY2xhc3M9XFxcImNhcmV0XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgU3ViTWVudSA9ICQoXCI8dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgc3ViTWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XFxcIiByb2xlPVxcXCJtZW51XFxcIiBzdHlsZT1cXFwiZGlzcGxheTogbm9uZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgU3ViTGlzdCA9IHRoaXNfMS5TZWxlY3RDYXRlZ29yeURhdGFMaXN0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnkuc3Vicy5pbmRleE9mKGl0ZW0uaWQpID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBTdWJNZW51LmFwcGVuZCh0aGlzXzEuTWFrZURyb3BEb3duTWVudUZvckNhdGVnb3JpZXMoU3ViTGlzdCwgY2F0ZWdvcnkuaWQpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKFN1Yk1lbnUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kYXRhKFwiaWRcIiwgY2F0ZWdvcnkuaWQpO1xyXG4gICAgICAgICAgICAgICAgRWxzQ29udGFpbmVyID0gRWxzQ29udGFpbmVyLmFkZChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBkYXRhXzEgPSBkYXRhOyBfaSA8IGRhdGFfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5ID0gZGF0YV8xW19pXTtcclxuICAgICAgICAgICAgX2xvb3BfMShjYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBFbHNDb250YWluZXI7XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlRHJvcERvd25NZW51OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG1haW5PYmogPSB0aGlzO1xyXG4gICAgICAgICQoXCIuZHJvcGRvd24gYS5zdWIsLmRyb3B1cCBhLnN1YlwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5uZXh0KFwidWxcIilcclxuICAgICAgICAgICAgICAgIC50b2dnbGUoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q2F0ZWdvcnlCdG5cclxuICAgICAgICAgICAgLmRhdGEoJ3RleHQnLCAn2KfYrtiq2LEg2KfZhNmC2LPZhScpXHJcbiAgICAgICAgICAgIC5maW5kKFwibGlcIilcclxuICAgICAgICAgICAgLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIilcclxuICAgICAgICAgICAgLm5vdChcIi5kcm9wZG93blwiKVxyXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBtYWluT2JqLnNlbGVjdENhdGVnb3J5QnRuLmZpbmQoXCJidXR0b24gLnRleHRcIikudGV4dChlbC5kYXRhKFwibmFtZVwiKSk7XHJcbiAgICAgICAgICAgIGVsLnBhcmVudHMoXCIuc3ViTWVudVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIG1haW5PYmouQ2F0ZWdvcnlJZElucC52YWwoZWwuZGF0YShcImlkXCIpKTtcclxuICAgICAgICAgICAgbWFpbk9iai5BZGRDb3Vyc2VGb3JtLnZhbGlkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgQ3JlYXRlQ2F0ZWdvcnlCdG5MaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgRWxzQ29udGFpbmVyID0gJCgpO1xyXG4gICAgICAgICQuZ2V0KFwiL0FkbWluL0NhdGVnb3J5L0l0ZW1zTGlzdFwiKS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgX3RoaXMuU2VsZWN0Q2F0ZWdvcnlEYXRhTGlzdCA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RDYXRlZ29yeUJ0blxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIuZHJvcGRvd24tbWVudVwiKVxyXG4gICAgICAgICAgICAgICAgLmVtcHR5KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoX3RoaXMuTWFrZURyb3BEb3duTWVudUZvckNhdGVnb3JpZXMocmVzdWx0LmRhdGEpKTtcclxuICAgICAgICAgICAgX3RoaXMuSGFuZGxlRHJvcERvd25NZW51KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlQWRkQ291cnNlU3VibWl0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5BZGRDb3Vyc2VGb3JtLmRhdGEoXCJ2YWxpZGF0b3JcIikuc2V0dGluZ3MuaWdub3JlID0gXCJbTmFtZT0nSWQnXVwiO1xyXG4gICAgICAgICQoXCJib2R5XCIpLm9uKCdjbGljaycsICcjQWRkQ291cnNlQnRuJywgQ29tbW9uRnVuY3MuT25BZGRDb3Vyc2VGb3JtU3VibWl0dGVkLmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuICAgIFJlc2V0RHJvcGRvd25NZW51OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYXRlZ29yeUJ0bi5maW5kKCcudGV4dCcpLnRleHQodGhpcy5zZWxlY3RDYXRlZ29yeUJ0bi5kYXRhKCd0ZXh0JykpO1xyXG4gICAgfSxcclxuICAgIFJlc2V0QWRkQ291cnNlRm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuQWRkQ291cnNlRm9ybS5maW5kKCdpbnB1dDpub3QoI0lkKScpLnZhbCgnJyk7XHJcbiAgICAgICAgJCgnI0lzT3BlbmVkJykudmFsKCdmYWxzZScpO1xyXG4gICAgICAgICQoJy50b29nbGVCdG46ZXEoMCknKS5yZW1vdmVDbGFzcyhcImZhLXRvZ2dsZS1vblwiKS5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG4gICAgICAgIHRoaXMuUmVzZXREcm9wZG93bk1lbnUoKTtcclxuICAgIH0sXHJcbiAgICBIYW5kbGVUb2dnbGVCdG46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuQWRkQ291cnNlRm9ybS5maW5kKFwiLnRvb2dsZUJ0bjplcSgwKVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgaWNvbmJ0biA9ICQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBpY29uYnRuLnRvZ2dsZUNsYXNzKFwiZmEtdG9nZ2xlLW9uIGZhLXRvZ2dsZS1vZmZcIik7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJcIiwgaXNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGljb25idG4uaGFzQ2xhc3MoXCJmYS10b2dnbGUtb25cIikpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcItin2YTZg9mI2LHYsyDZhdiq2KfYrSDYp9mE2KfZhlwiO1xyXG4gICAgICAgICAgICAgICAgaXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwi2KfZhNmD2YjYsdizINi62YrYsSDZhdiq2KfYrSDYp9mE2KfZhlwiO1xyXG4gICAgICAgICAgICAgICAgaXNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5BZGRDb3Vyc2VGb3JtLmZpbmQoXCIudG9nZ2xlVGV4dDplcSgwKVwiKS50ZXh0KHRleHQpO1xyXG4gICAgICAgICAgICAkKFwiI0lzT3BlbmVkXCIpLnZhbChcIlwiICsgaXNPcGVuZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIEhhbmRsZVNvbWVGb3JtT3BlcmF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuQWRkQ291cnNlRm9ybS5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC5wcm9wKCdpZCcpID09IFwiQ29zdE9mQ291cnNlXCIpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmRhdGEoJ3Byb21wdCcsIGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJykpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuZGF0YSgnbm90bm93JywgJ9mE2YUg2KrYrdiv2K8g2KfZhNiq2YPZhNmB2Kkg2KfZhNin2YYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5wdXQucHJvcCgnaWQnKSA9PSBcIlBlcmlvZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhKCdwcm9tcHQnLCBpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicpKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmRhdGEoJ25vdG5vdycsICfZhNmFINiq2K3Yr9ivINin2YTZhdiv2Kkg2KfZhNin2YYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5wdXQucHJvcCgnaWQnKSA9PSBcIlN0YXJ0RGF0ZU9mQmVnaW5cIikge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuZGF0YSgncHJvbXB0JywgaW5wdXQucHJvcCgncGxhY2Vob2xkZXInKSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhKCdub3Rub3cnLCAn2YTZhSDZitit2K/YryDZhdmI2LnYryDYqNiv2KfZitipINin2YTZg9mI2LHYsyDYp9mE2KfZhicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC5pcygnW3R5cGU9XCJkYXRlXCJdJykpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCd3aXRoRGF0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgQ29tbW9uVUlfMS5Db21tb25VaS5Ob3RJbnB1dEZvckJ0bk5vdyh0aGlzLk5vdE5vd0J0bik7XHJcbiAgICB9LFxyXG4gICAgbWFpbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuSGFuZGxlVG9nZ2xlQnRuKCk7XHJcbiAgICAgICAgdGhpcy5IYW5kbGVBZGRDb3Vyc2VTdWJtaXQoKTtcclxuICAgICAgICB0aGlzLkNyZWF0ZUNhdGVnb3J5QnRuTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuSGFuZGxlU29tZUZvcm1PcGVyYXRpb25zKCk7XHJcbiAgICB9XHJcbn07XHJcbnZhciBHZXRDb3Vyc2VzT3BlcmF0aW9ucyA9IHtcclxuICAgIEN1cnJlbnRTZWxlY3RlZFVwZGF0YWJsZUNhcmQ6ICQoKSxcclxuICAgIENvdXJzZXNDb3VudDogMCxcclxuICAgIENvdXJzZXNTZWN0aW9uOiAkKCcjR2V0Q291cnNlcyAuY291cnNlcycpLFxyXG4gICAgQ291cnNlQ291bnRUZXh0OiAkKCcuQ291cmNlc0NvdW50IC5jb3VudDplcSgwKScpLFxyXG4gICAgRWRpdENvdXJzZU1vZGFsOiAkKCcjRWRpdENvdXJzZU1vZGFsJyksXHJcbiAgICBHZXRDb3Vyc2VzVXJsOiAnL0FkbWluL0NvdXJzZXMvTGlzdCcsXHJcbiAgICBEZWxldGVDb3Vyc2VVcmw6ICcvQWRtaW4vQ291cnNlcy9EZWxldGUnLFxyXG4gICAgRWRpdENvdXJzZVVybDogJy9BZG1pbi9Db3Vyc2VzL0VkaXQnLFxyXG4gICAgRWRpdENvdXJzZUltZ0JnVXJsOiAnL0FkbWluL0NvdXJzZXMvRWRpdEJnSW1nJyxcclxuICAgIENhcmRJbWdCYXNlVXJsOiAnL2ltYWdlcy9hZG1pbi9jb3Vyc2VzLycsXHJcbiAgICBDb3Vyc2VDYXJkVGVtcGxhdGU6ICQoJy5Db3Vyc2VDYXJkVGVtcGxhdGU6ZXEoMCknKSxcclxuICAgIGdldCBDb3Vyc2VDYXJkKCkge1xyXG4gICAgICAgIHJldHVybiAkKCcuQ291cnNlQ2FyZFRlbXBsYXRlJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEVkaXRCZ0ltZ0J0bigpIHtcclxuICAgICAgICByZXR1cm4gJCgnLkNvdXJzZUNhcmRUZW1wbGF0ZSAuRWRpdEJjSW1nJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEVkaXRDb3Vyc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuICQoJyNFZGl0Q291cnNlJyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEVkaXRDb3Vyc2VGb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkVkaXRDb3Vyc2UuZmluZCgnZm9ybTplcSgwKScpO1xyXG4gICAgfSxcclxuICAgIGdldCBFZGl0Q291cnNlU3VibWl0QnRuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkVkaXRDb3Vyc2UuZmluZCgnI0VkaXRDb3Vyc2VCdG4nKTtcclxuICAgIH0sXHJcbiAgICBnZXQgbG9hZGluZ0ljb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ291cnNlc1NlY3Rpb24uZmluZCgnLmxvYWRpbmc6ZXEoMCknKTtcclxuICAgIH0sXHJcbiAgICBEZXNpZ25Db3Vyc2VDYXJkOiBmdW5jdGlvbiAoY291cnNlKSB7XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy5Db3Vyc2VDYXJkVGVtcGxhdGUuY2xvbmUodHJ1ZSkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRlbXBsYXRlLmRhdGEoJ2NvdXJzZScsIGNvdXJzZSk7XHJcbiAgICAgICAgdmFyIGNvc3RUZXh0ID0gY291cnNlLmNvc3RPZkNvdXJzZSA/IFwiXFx1MDYzM1xcdTA2MzlcXHUwNjMxIFxcdTA2MjdcXHUwNjQ0XFx1MDY0M1xcdTA2NDhcXHUwNjMxXFx1MDYzMyBcIiArIGNvdXJzZS5jb3N0T2ZDb3Vyc2UgKyBcIiBcXHUwNjJDXFx1MDY0NlxcdTA2NEFcXHUwNjI5XCIgOiAn2LPYudixINin2YTZg9mI2LHYsyDYutmK2LEg2YXYrdiv2K8nO1xyXG4gICAgICAgIHZhciBEYXRlVGV4dCA9IGNvdXJzZS5zdGFydERhdGVPZkJlZ2luID8gXCJcXHUwNjRBXFx1MDYyOFxcdTA2MkZcXHUwNjIzIFxcdTA2NDVcXHUwNjQ2IFwiICsgbmV3IERhdGUoY291cnNlLnN0YXJ0RGF0ZU9mQmVnaW4pLnRvTG9jYWxlRGF0ZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogXCJcXHUwNjQ0XFx1MDY0NSBcXHUwNjRBXFx1MDYyRFxcdTA2MkZcXHUwNjJGIFxcdTA2MkFcXHUwNjI3XFx1MDYzMVxcdTA2NEFcXHUwNjJFIFxcdTA2MjhcXHUwNjJGXFx1MDYyN1xcdTA2NEFcXHUwNjI5IFxcdTA2MjdcXHUwNjQ0XFx1MDY0M1xcdTA2NDhcXHUwNjMxXFx1MDYzM1wiO1xyXG4gICAgICAgIHZhciBwZXJpb2RUZXh0ID0gY291cnNlLnBlcmlvZCA/IGNvdXJzZS5wZXJpb2QgOiBcIlxcdTA2NDRcXHUwNjQ1IFxcdTA2MkFcXHUwNjJEXFx1MDYyRlxcdTA2MkZcXHUwNjI5IFxcdTA2NDVcXHUwNjJGXFx1MDYyOSBcXHUwNjI3XFx1MDY0NFxcdTA2NDNcXHUwNjQ4XFx1MDYzMVxcdTA2MzNcIjtcclxuICAgICAgICB2YXIgc3RhdHVzVGV4dCA9IGNvdXJzZS5pc09wZW5lZCA/IFwi2KfZhNmD2YjYsdizINmF2KrYp9itINit2KfZhNmK2KdcIiA6IFwi2KfZhNmD2YjYsdizINi62YrYsSDZhdiq2KfYrSDYrdin2YTZitinXCI7XHJcbiAgICAgICAgdGVtcGxhdGUuZmluZCgnLk5hbWU6ZXEoMCknKS50ZXh0KGNvdXJzZS5uYW1lKTtcclxuICAgICAgICB0ZW1wbGF0ZS5maW5kKCcuRGVzYzplcSgwKScpLnRleHQoY291cnNlLmRlc2NyaXB0aW9uKS5wcm9wKCd0aXRsZScsIGNvdXJzZS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdGVtcGxhdGUuZmluZCgnLkNhdGVnb3J5OmVxKDApJykudGV4dChcIlxcdTA2NDJcXHUwNjMzXFx1MDY0NSBcIiArIGNvdXJzZS5jYXRlZ29yeU5hbWUpLmRhdGEoJ2lkJywgY291cnNlLmNhdGVnb3J5SWQpO1xyXG4gICAgICAgIHRlbXBsYXRlLmZpbmQoJy5Db3N0OmVxKDApJykudGV4dChjb3N0VGV4dCk7XHJcbiAgICAgICAgdGVtcGxhdGUuZmluZCgnLkRhdGU6ZXEoMCknKS50ZXh0KERhdGVUZXh0KTtcclxuICAgICAgICB0ZW1wbGF0ZS5maW5kKCcuSXNPcGVuZWQ6ZXEoMCknKS50ZXh0KHN0YXR1c1RleHQpO1xyXG4gICAgICAgIHRlbXBsYXRlLmZpbmQoJy5QZXJpb2Q6ZXEoMCknKS50ZXh0KHBlcmlvZFRleHQpO1xyXG4gICAgICAgIHRlbXBsYXRlLmZpbmQoJy52aWRlb0NvdW50OmVxKDApJykudGV4dChjb3Vyc2UudmlkZW9zQ291bnQpO1xyXG4gICAgICAgIGlmIChjb3Vyc2UuYmFja2dyb3VuZEltZ1NyYylcclxuICAgICAgICAgICAgdGVtcGxhdGUuZmluZCgnaW1nOmVxKDApJykuYXR0cignc3JjJywgXCIvaW1hZ2VzL2FkbWluL2NvdXJzZXMvXCIgKyBjb3Vyc2UuYmFja2dyb3VuZEltZ1NyYyk7XHJcbiAgICAgICAgdGVtcGxhdGUuZmluZCgnYS5jb250ZW50JykucHJvcCgnaHJlZicsIFwiL0FkbWluL0NvdXJzZXMvQ29udGVudD9pZD1cIiArIGNvdXJzZS5pZCk7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gICAgfSxcclxuICAgIEVkaXREZXNpZ25Db3Vyc2VDYXJkOiBmdW5jdGlvbiAoY291cnNlLCB0ZW1wbGF0ZSkge1xyXG4gICAgICAgIHRlbXBsYXRlLmRhdGEoJ2NvdXJzZScsIGNvdXJzZSk7XHJcbiAgICAgICAgdmFyIGNvc3RUZXh0ID0gY291cnNlLmNvc3RPZkNvdXJzZSA/IFwiXFx1MDYzM1xcdTA2MzlcXHUwNjMxIFxcdTA2MjdcXHUwNjQ0XFx1MDY0M1xcdTA2NDhcXHUwNjMxXFx1MDYzMyBcIiArIGNvdXJzZS5jb3N0T2ZDb3Vyc2UgKyBcIiBcXHUwNjJDXFx1MDY0NlxcdTA2NEFcXHUwNjI5XCIgOiAn2LPYudixINin2YTZg9mI2LHYsyDYutmK2LEg2YXYrdiv2K8nO1xyXG4gICAgICAgIHZhciBEYXRlVGV4dCA9IGNvdXJzZS5zdGFydERhdGVPZkJlZ2luID8gXCJcXHUwNjRBXFx1MDYyOFxcdTA2MkZcXHUwNjIzIFxcdTA2NDVcXHUwNjQ2IFwiICsgbmV3IERhdGUoY291cnNlLnN0YXJ0RGF0ZU9mQmVnaW4pLnRvTG9jYWxlRGF0ZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogXCJcXHUwNjQ0XFx1MDY0NSBcXHUwNjRBXFx1MDYyRFxcdTA2MkZcXHUwNjJGIFxcdTA2MkFcXHUwNjI3XFx1MDYzMVxcdTA2NEFcXHUwNjJFIFxcdTA2MjhcXHUwNjJGXFx1MDYyN1xcdTA2NEFcXHUwNjI5IFxcdTA2MjdcXHUwNjQ0XFx1MDY0M1xcdTA2NDhcXHUwNjMxXFx1MDYzM1wiO1xyXG4gICAgICAgIHZhciBwZXJpb2RUZXh0ID0gY291cnNlLnBlcmlvZCA/IGNvdXJzZS5wZXJpb2QgOiBcIlxcdTA2NDRcXHUwNjQ1IFxcdTA2MkFcXHUwNjJEXFx1MDYyRlxcdTA2MkZcXHUwNjI5IFxcdTA2NDVcXHUwNjJGXFx1MDYyOSBcXHUwNjI3XFx1MDY0NFxcdTA2NDNcXHUwNjQ4XFx1MDYzMVxcdTA2MzNcIjtcclxuICAgICAgICB2YXIgc3RhdHVzVGV4dCA9IGNvdXJzZS5pc09wZW5lZCA/IFwi2KfZhNmD2YjYsdizINmF2KrYp9itINit2KfZhNmK2KdcIiA6IFwi2KfZhNmD2YjYsdizINi62YrYsSDZhdiq2KfYrSDYrdin2YTZitinXCI7XHJcbiAgICAgICAgdGVtcGxhdGUuZmluZCgnLk5hbWU6ZXEoMCknKS50ZXh0KGNvdXJzZS5uYW1lKTtcclxuICAgICAgICB0ZW1wbGF0ZS5maW5kKCcuRGVzYzplcSgwKScpLnRleHQoY291cnNlLmRlc2NyaXB0aW9uKS5wcm9wKCd0aXRsZScsIGNvdXJzZS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgO1xyXG4gICAgICAgIHRlbXBsYXRlLmZpbmQoJy5DYXRlZ29yeTplcSgwKScpLnRleHQoXCJcXHUwNjQyXFx1MDYzM1xcdTA2NDUgXCIgKyBjb3Vyc2UuY2F0ZWdvcnlOYW1lKS5kYXRhKCdpZCcsIGNvdXJzZS5jYXRlZ29yeUlkKTtcclxuICAgICAgICB0ZW1wbGF0ZS5maW5kKCcuQ29zdDplcSgwKScpLnRleHQoY29zdFRleHQpO1xyXG4gICAgICAgIHRlbXBsYXRlLmZpbmQoJy5EYXRlOmVxKDApJykudGV4dChEYXRlVGV4dCk7XHJcbiAgICAgICAgdGVtcGxhdGUuZmluZCgnLklzT3BlbmVkOmVxKDApJykudGV4dChzdGF0dXNUZXh0KTtcclxuICAgICAgICB0ZW1wbGF0ZS5maW5kKCcuUGVyaW9kOmVxKDApJykudGV4dChwZXJpb2RUZXh0KTtcclxuICAgICAgICB0ZW1wbGF0ZS5maW5kKCcudmlkZW9Db3VudDplcSgwKScpLnRleHQoY291cnNlLnZpZGVvc0NvdW50KTtcclxuICAgICAgICBpZiAoY291cnNlLmJhY2tncm91bmRJbWdTcmMpXHJcbiAgICAgICAgICAgIHRlbXBsYXRlLmZpbmQoJ2ltZzplcSgwKScpLmF0dHIoJ3NyYycsIFwiL2ltYWdlcy9hZG1pbi9jb3Vyc2VzL1wiICsgY291cnNlLmJhY2tncm91bmRJbWdTcmMpO1xyXG4gICAgfSxcclxuICAgIERyYXdDb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgIHRoaXMuQ291cnNlc0NvdW50ID0gY291cnNlcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Db3Vyc2VDb3VudFRleHQudGV4dCh0aGlzLkNvdXJzZXNDb3VudCk7XHJcbiAgICAgICAgdGhpcy5Db3Vyc2VzU2VjdGlvbi5lbXB0eSgpO1xyXG4gICAgICAgIHZhciBjb3Vyc2VzQ29udGFpbmVyID0gJCgpO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgY291cnNlc18xID0gY291cnNlczsgX2kgPCBjb3Vyc2VzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gY291cnNlc18xW19pXTtcclxuICAgICAgICAgICAgY291cnNlc0NvbnRhaW5lciA9IGNvdXJzZXNDb250YWluZXIuYWRkKHRoaXMuRGVzaWduQ291cnNlQ2FyZChjKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ291cnNlc1NlY3Rpb24uYXBwZW5kKGNvdXJzZXNDb250YWluZXIpO1xyXG4gICAgfSxcclxuICAgIEdldENvdXJzZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuZ2V0KHRoaXMuR2V0Q291cnNlc1VybCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBfdGhpcy5EcmF3Q291cnNlcyhkYXRhKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkLm5vdGlmeSh7IG1lc3NhZ2U6IFwi2KrYudiw2LEg2LnZhdmE2YrYqSDYqtit2YXZitmEINin2YTYqNmK2KfZhtin2Kog2YXZhiDYp9mE2K7Yp9iv2YVcIiB9KTtcclxuICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nSWNvbi5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgUmVmcmVzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuR2V0Q291cnNlcygpO1xyXG4gICAgfSxcclxuICAgIEhhbmRsZURlc2lnbkNhcmRPcGVyYXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNob3dJbmZvSWNvbiA9IHRoaXMuQ291cnNlQ2FyZC5maW5kKCcuc2hvd0luZm8nKTtcclxuICAgICAgICB0aGlzLkNvdXJzZUNhcmQub24oJ2NsaWNrJywgJy5kZXRhaWxzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2hvd0luZm9JY29uID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGRlc2lnblBhcmVudCA9IHNob3dJbmZvSWNvbi5wYXJlbnRzKCcuQ291cnNlQ2FyZFRlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkSW5mbyA9IGRlc2lnblBhcmVudC5maW5kKCcuY291cnNlSW5mbzplcSgwKScpO1xyXG4gICAgICAgICAgICBjYXJkSW5mby5jc3MoeyB0b3A6IDAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsICcuY2xvc2VJbmZvJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5jb3Vyc2VJbmZvJykuY3NzKHsgdG9wOiAnLTEwMCUnIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFRvZ2dsZUZvcm1Gb3JNb2RhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcjRWRpdENvdXJzZScpLmhhc0NsYXNzKCdub0Zvcm0nKSkge1xyXG4gICAgICAgICAgICBBZGRDb3Vyc2VPcGVyYXRpb25zLlJlc2V0QWRkQ291cnNlRm9ybSgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCIjQWRkQ291cnNlIGZvcm06ZXEoMClcIikuZGV0YWNoKCk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI0FkZENvdXJzZUJ0bicpLmF0dHIoJ2lkJywgJ0VkaXRDb3Vyc2VCdG4nKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygnZmEtcGx1cycpLmFkZENsYXNzKCdmYS1lZGl0JykuZW5kKClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcudGV4dCcpLnRleHQoJ9it2YHYuCcpO1xyXG4gICAgICAgICAgICAkKCcjRWRpdENvdXJzZScpLmFwcGVuZChmb3JtKTtcclxuICAgICAgICAgICAgJCgnI0VkaXRDb3Vyc2UnKS5yZW1vdmVDbGFzcygnbm9Gb3JtJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCIjRWRpdENvdXJzZSBmb3JtOmVxKDApXCIpLmRldGFjaCgpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNFZGl0Q291cnNlQnRuJykuYXR0cignaWQnLCAnQWRkQ291cnNlQnRuJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCdpJykuYWRkQ2xhc3MoJ2ZhLXBsdXMnKS5yZW1vdmVDbGFzcygnZmEtZWRpdCcpLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnRleHQnKS50ZXh0KCfYp9i22KfZgdipJyk7XHJcbiAgICAgICAgICAgICQoXCIjQWRkQ291cnNlXCIpLmFwcGVuZChmb3JtKTtcclxuICAgICAgICAgICAgJCgnI0VkaXRDb3Vyc2UnKS5hZGRDbGFzcygnbm9Gb3JtJyk7XHJcbiAgICAgICAgICAgIEFkZENvdXJzZU9wZXJhdGlvbnMuUmVzZXRBZGRDb3Vyc2VGb3JtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIEZvcm1hdERhdGVUb195eXl5X21tX2RkOiBmdW5jdGlvbiAoZGF0ZVN0cikge1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICBtbSA9IChtbSA+IDkpID8gbW0gOiBcIjBcIiArIG1tO1xyXG4gICAgICAgIHZhciBkZCA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGRkID0gKGRkID4gOSkgPyBkZCA6IFwiMFwiICsgZGQ7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVTdHIgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZDtcclxuICAgIH0sXHJcbiAgICBCaW5kRGF0YVRvVGFyZ2V0Rm9ybTogZnVuY3Rpb24gKFRhcmdldEZvcm0sIGRhdGEpIHtcclxuICAgICAgICB2YXIgZGF0ZVN0ciA9IGRhdGEuc3RhcnREYXRlT2ZCZWdpbiA/IHRoaXMuRm9ybWF0RGF0ZVRvX3l5eXlfbW1fZGQoZGF0YS5zdGFydERhdGVPZkJlZ2luKSA6IFwiXCI7XHJcbiAgICAgICAgJCgnI0VkaXRDb3Vyc2UgI0NhdGVnb3JpZXMgLnRleHQnKS50ZXh0KGRhdGEuY2F0ZWdvcnlOYW1lKTtcclxuICAgICAgICB2YXIgc3RhdHVzVGV4dCA9IFwiXCIsIFJlbW92ZVRvZ2dsZUNsYXNzID0gXCJcIiwgQWRkVG9nZ2xlQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgIGlmIChkYXRhLmlzT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcItin2YTZg9mI2LHYsyDZhdiq2KfYrSDYrdin2YTZitinXCI7XHJcbiAgICAgICAgICAgIFJlbW92ZVRvZ2dsZUNsYXNzID0gXCJmYS10b2dnbGUtb2ZmXCI7XHJcbiAgICAgICAgICAgIEFkZFRvZ2dsZUNsYXNzID0gXCJmYS10b2dnbGUtb25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcItin2YTZg9mI2LHYsyDYutmK2LEg2YXYqtin2K0g2K3Yp9mE2YrYp1wiO1xyXG4gICAgICAgICAgICBSZW1vdmVUb2dnbGVDbGFzcyA9IFwiZmEtdG9nZ2xlLW9uXCI7XHJcbiAgICAgICAgICAgIEFkZFRvZ2dsZUNsYXNzID0gXCJmYS10b2dnbGUtb2ZmXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJyNFZGl0Q291cnNlIC50b2dnbGVUZXh0JykudGV4dChzdGF0dXNUZXh0KTtcclxuICAgICAgICAkKCcjRWRpdENvdXJzZSAudG9vZ2xlQnRuJykucmVtb3ZlQ2xhc3MoUmVtb3ZlVG9nZ2xlQ2xhc3MpLmFkZENsYXNzKEFkZFRvZ2dsZUNsYXNzKTtcclxuICAgICAgICBmb3IgKHZhciBpdGVtIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIFVpdGVtID0gaXRlbS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGl0ZW0uc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIGlmIChVaXRlbSA9PSBcIlN0YXJ0RGF0ZU9mQmVnaW5cIikge1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0Rm9ybS5maW5kKFwiI1N0YXJ0RGF0ZU9mQmVnaW5cIikudmFsKGRhdGVTdHIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVGFyZ2V0Rm9ybS5maW5kKFwiI1wiICsgVWl0ZW0pLnZhbChkYXRhW2l0ZW1dKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlT25Db3Vyc2VVRDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtYWluT2JqZWN0ID0gdGhpcztcclxuICAgICAgICB0aGlzLkNvdXJzZUNhcmQub24oJ2NsaWNrJywgJy5kZWxldGVDb3Vyc2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICQuY29uZmlybU5vdGlmeShcIti52YbYryDYrdiw2YEg2KfZhNmD2YjYsdizINiz2YrYqtmFINit2LDZgSDZg9mEINin2YTZgdmK2K/ZitmI2YfYp9iq2KfZhNmF2KrYudmE2YLYqSDYqNmHLNmH2YQg2KrYsdmK2K8g2KfZhNit2LDZgVwiLCBmdW5jdGlvbiAoSXNDb25maW1lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc0NvbmZpbWVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHZhciBidG4gPSAkKF90aGlzKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYXJkID0gJChfdGhpcykucGFyZW50cygnLkNvdXJzZUNhcmRUZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gY2FyZC5kYXRhKCdjb3Vyc2UnKS5pZDtcclxuICAgICAgICAgICAgICAgIGJ0bi5wZW5kaW5nU3RhdGUodHJ1ZSwgJ2ZhLXJlbW92ZScpO1xyXG4gICAgICAgICAgICAgICAgJC5wb3N0KG1haW5PYmplY3QuRGVsZXRlQ291cnNlVXJsICsgXCI/SWQ9XCIgKyBpZCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbk9iamVjdC5Db3Vyc2VzQ291bnQgPSBtYWluT2JqZWN0LkNvdXJzZXNDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbk9iamVjdC5Db3Vyc2VDb3VudFRleHQudGV4dChtYWluT2JqZWN0LkNvdXJzZXNDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQubm90aWZ5Q2F0Y2goZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikub24oJ2NsaWNrJywgJyNFZGl0Q291cnNlQnRuJywgQ29tbW9uRnVuY3MuT25FZGl0Q291cnNlRm9ybVN1Ym1pdHRlZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLkNvdXJzZUNhcmQub24oJ2NsaWNrJywgJy5lZGl0Q291cnNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYWluT2JqZWN0LlRvZ2dsZUZvcm1Gb3JNb2RhbCgpO1xyXG4gICAgICAgICAgICAkKCcjRWRpdENvdXJzZU1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgdmFyIGNhcmQgPSAkKHRoaXMpLnBhcmVudHMoJy5Db3Vyc2VDYXJkVGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjYXJkLmRhdGEoJ2NvdXJzZScpO1xyXG4gICAgICAgICAgICBtYWluT2JqZWN0LkN1cnJlbnRTZWxlY3RlZFVwZGF0YWJsZUNhcmQgPSBjYXJkO1xyXG4gICAgICAgICAgICBtYWluT2JqZWN0LkJpbmREYXRhVG9UYXJnZXRGb3JtKCQoJyNFZGl0Q291cnNlIGZvcm06ZXEoMCknKSwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlTW9kYWxzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmFwcGVuZCh0aGlzLkVkaXRDb3Vyc2VNb2RhbC5jbG9uZSh0cnVlKSk7XHJcbiAgICAgICAgdGhpcy5FZGl0Q291cnNlTW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5vbignaGlkZS5icy5tb2RhbCcsICcjRWRpdENvdXJzZU1vZGFsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5Ub2dnbGVGb3JtRm9yTW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBIYW5kbGVPbkNhcmRJbWdDaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaWQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBtYWluT2JqZWN0ID0gdGhpcztcclxuICAgICAgICB2YXIgZm9ybURhdGE7XHJcbiAgICAgICAgJC5VcGxvYWRJbWFnZSh0aGlzLkVkaXRCZ0ltZ0J0biwgZnVuY3Rpb24gKGZpbGUsIGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZCA9IHRoaXMuZGF0YSgnY291cnNlJykuaWQ7XHJcbiAgICAgICAgICAgIHZhciBOYW1lID0gXCJcIiArIERhdGUubm93KCkgKyBleHQ7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcIklkXCIsIGlkKTtcclxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiTmFtZVwiLCBOYW1lKTtcclxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiSW1hZ2VcIiwgZmlsZSk7XHJcbiAgICAgICAgICAgIHZhciBpY29uID0gdGhpcy5maW5kKCdpLkVkaXRCY0ltZzplcSgwKScpO1xyXG4gICAgICAgICAgICBpY29uLnN3aXRjaFBlbmRpbmdTdGF0ZSh0cnVlLCBcImZhLXBpY3R1cmUtb1wiKTtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogbWFpbk9iamVjdC5FZGl0Q291cnNlSW1nQmdVcmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJ2ltZzplcSgwKScpLnByb3AoJ3NyYycsIFwiXCIgKyBtYWluT2JqZWN0LkNhcmRJbWdCYXNlVXJsICsgTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCLYqtmFINit2YHYuCDYp9mE2LXZiNix2Kkg2KjZhtis2KfYrVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zd2l0Y2hQZW5kaW5nU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCLZhNmFINmK2KrZhSDYrdmB2Lgg2KfZhNi12YjYsdipLNit2K/Yq9iqINmF2LTZg9mE2Kkg2YHZiSDYp9mE2LPZitix2YHYsVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgbWFpbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuR2V0Q291cnNlcygpO1xyXG4gICAgICAgIHRoaXMuSGFuZGxlRGVzaWduQ2FyZE9wZXJhdGlvbnMoKTtcclxuICAgICAgICB0aGlzLkhhbmRsZU9uQ291cnNlVUQoKTtcclxuICAgICAgICB0aGlzLkhhbmRsZU1vZGFscygpO1xyXG4gICAgICAgIHRoaXMuSGFuZGxlT25DYXJkSW1nQ2hhbmdlKCk7XHJcbiAgICB9XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvdXJzZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgQ29tbW9uVWkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb21tb25VaShzZWxlY3RDYXRlZ29yeUJ0biwgQ2F0ZWdvcnlJZElucCwgZGF0YVVybCkge1xyXG4gICAgICAgIGlmIChkYXRhVXJsID09PSB2b2lkIDApIHsgZGF0YVVybCA9IFwiL0FkbWluL0NhdGVnb3J5L0l0ZW1zTGlzdFwiOyB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYXRlZ29yeUJ0biA9IHNlbGVjdENhdGVnb3J5QnRuO1xyXG4gICAgICAgIHRoaXMuQ2F0ZWdvcnlJZElucCA9IENhdGVnb3J5SWRJbnA7XHJcbiAgICAgICAgdGhpcy5kYXRhVXJsID0gZGF0YVVybDtcclxuICAgICAgICB0aGlzLlNlbGVjdENhdGVnb3J5RGF0YUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLk9uQ2F0ZWdvcnlTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICB0aGlzLkRlZmF1bHRNZW51VmFsdWVzID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiBcItin2K7YqtixINin2LPZhSDYp9mE2YLYs9mFXCIsXHJcbiAgICAgICAgICAgIGlkOiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIENvbW1vblVpLk5vdElucHV0Rm9yQnRuTm93ID0gZnVuY3Rpb24gKEdlbmVyYWxCdG4pIHtcclxuICAgICAgICBHZW5lcmFsQnRuLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBidG4gPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBidG4ucGFyZW50cyhcIi5mb3JtLWdyb3VwOmVxKDApXCIpLmZpbmQoXCJpbnB1dDplcSgwKVwiKTtcclxuICAgICAgICAgICAgaWYgKGJ0bi5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhKFwidmFsdWVcIiwgaW5wdXQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucHJvcChcInBsYWNlaG9sZGVyXCIsIGlucHV0LmRhdGEoXCJub3Rub3dcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LmlzKFwiLndpdGhEYXRlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFWYWwgPSBpbnB1dC5kYXRhKFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIikucHJvcChcInBsYWNlaG9sZGVyXCIsIGlucHV0LmRhdGEoXCJwcm9tcHRcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFWYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKGRhdGFWYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LmlzKFwiLndpdGhEYXRlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcInR5cGVcIiwgXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlucHV0LnRyaWdnZXJIYW5kbGVyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIENvbW1vblVpLkdldENhdGVnb3J5TmFtZUJ5SWQgPSBmdW5jdGlvbiAoaWQsIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFMaXN0LmZpbmQoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYuaWQgPT0gaWQ7IH0pLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgQ29tbW9uVWkuR2V0RnVsbENhdGVnb3J5TmFtZUJ5SWQgPSBmdW5jdGlvbiAoaWQsIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgdmFyIHN1cGVySWQgPSBkYXRhTGlzdC5maW5kKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2LmlkID09IGlkOyB9KS5zdXBlcklkO1xyXG4gICAgICAgIHJldHVybiBzdXBlcklkID09IG51bGxcclxuICAgICAgICAgICAgPyBkYXRhTGlzdC5maW5kKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2LmlkID09IGlkOyB9KS5uYW1lXHJcbiAgICAgICAgICAgIDogZGF0YUxpc3QuZmluZChmdW5jdGlvbiAodikgeyByZXR1cm4gdi5pZCA9PSBzdXBlcklkOyB9KS5uYW1lICsgXCIvXFxuICAgICAgICAgICAgICAgXCIgKyBkYXRhTGlzdC5maW5kKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2LmlkID09IGlkOyB9KS5uYW1lO1xyXG4gICAgfTtcclxuICAgIENvbW1vblVpLnByb3RvdHlwZS5NYWtlRHJvcERvd25NZW51Rm9yQ2F0ZWdvcmllcyA9IGZ1bmN0aW9uIChkYXRhLCBTdXBlcklkKSB7XHJcbiAgICAgICAgaWYgKFN1cGVySWQgPT09IHZvaWQgMCkgeyBTdXBlcklkID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciBFbHNDb250YWluZXIgPSAkKCk7XHJcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgaWYgKGNhdGVnb3J5LnN1cGVySWQgIT0gU3VwZXJJZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XHJcbiAgICAgICAgICAgIGlmIChjYXRlZ29yeS5zdWJzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQoXCI8bGk+PGEgdGFiaW5kZXg9XFxcIi0xXFxcIj5cIiArIGNhdGVnb3J5Lm5hbWUgKyBcIjwvYT48L2xpPlwiKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YShcImlkXCIsIGNhdGVnb3J5LmlkKS5kYXRhKFwibmFtZVwiLCBjYXRlZ29yeS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIEVsc0NvbnRhaW5lciA9IEVsc0NvbnRhaW5lci5hZGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQoXCI8bGkgY2xhc3M9XFxcImRyb3B1cFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XFxcInN1YiBkcm9wZG93bi10b2dnbGVcXFwiIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgKyBjYXRlZ29yeS5uYW1lICsgXCIgPHNwYW4gY2xhc3M9XFxcImNhcmV0XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgU3ViTWVudSA9ICQoXCI8dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgc3ViTWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XFxcIiByb2xlPVxcXCJtZW51XFxcIiBzdHlsZT1cXFwiZGlzcGxheTogbm9uZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgU3ViTGlzdCA9IHRoaXNfMS5TZWxlY3RDYXRlZ29yeURhdGFMaXN0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnkuc3Vicy5pbmRleE9mKGl0ZW0uaWQpID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBTdWJNZW51LmFwcGVuZCh0aGlzXzEuTWFrZURyb3BEb3duTWVudUZvckNhdGVnb3JpZXMoU3ViTGlzdCwgY2F0ZWdvcnkuaWQpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKFN1Yk1lbnUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kYXRhKFwiaWRcIiwgY2F0ZWdvcnkuaWQpO1xyXG4gICAgICAgICAgICAgICAgRWxzQ29udGFpbmVyID0gRWxzQ29udGFpbmVyLmFkZChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBkYXRhXzEgPSBkYXRhOyBfaSA8IGRhdGFfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5ID0gZGF0YV8xW19pXTtcclxuICAgICAgICAgICAgX2xvb3BfMShjYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBFbHNDb250YWluZXI7XHJcbiAgICB9O1xyXG4gICAgQ29tbW9uVWkucHJvdG90eXBlLkhhbmRsZURyb3BEb3duTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWFpbk9iaiA9IHRoaXM7XHJcbiAgICAgICAgJChcIi5kcm9wZG93biBhLnN1YiwuZHJvcHVwIGEuc3ViXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLm5leHQoXCJ1bFwiKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYXRlZ29yeUJ0blxyXG4gICAgICAgICAgICAuZGF0YShcInRleHRcIiwgdGhpcy5EZWZhdWx0TWVudVZhbHVlcy50ZXh0KVxyXG4gICAgICAgICAgICAuZGF0YShcImlkXCIsIHRoaXMuRGVmYXVsdE1lbnVWYWx1ZXMuaWQpXHJcbiAgICAgICAgICAgIC5maW5kKFwibGlcIilcclxuICAgICAgICAgICAgLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIilcclxuICAgICAgICAgICAgLm5vdChcIi5kcm9wZG93blwiKVxyXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgdGV4dCA9IENvbW1vblVpLkdldEZ1bGxDYXRlZ29yeU5hbWVCeUlkKGVsLmRhdGEoXCJpZFwiKSwgbWFpbk9iai5TZWxlY3RDYXRlZ29yeURhdGFMaXN0KTtcclxuICAgICAgICAgICAgbWFpbk9iai5zZWxlY3RDYXRlZ29yeUJ0bi5maW5kKFwiYnV0dG9uIC50ZXh0XCIpLnRleHQodGV4dCk7XHJcbiAgICAgICAgICAgIGVsLnBhcmVudHMoXCIuc3ViTWVudVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIG1haW5PYmouQ2F0ZWdvcnlJZElucC52YWwoZWwuZGF0YShcImlkXCIpKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICBtYWluT2JqLk9uQ2F0ZWdvcnlTZWxlY3RlZCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIENvbW1vblVpLnByb3RvdHlwZS5DcmVhdGVDYXRlZ29yeUJ0bkxpc3QgPSBmdW5jdGlvbiAoQWZ0ZXJDcmVhdGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgRWxzQ29udGFpbmVyO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbHNDb250YWluZXIgPSAkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sICQuZ2V0KHRoaXMuZGF0YVVybCkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuU2VsZWN0Q2F0ZWdvcnlEYXRhTGlzdCA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLlNldE1lbnVUZXh0Rm9yQ3VycmVudElkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0Q2F0ZWdvcnlCdG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoXCIudGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChfdGhpcy5EZWZhdWx0TWVudVZhbHVlcy50ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoXCIuZHJvcGRvd24tbWVudVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKF90aGlzLk1ha2VEcm9wRG93bk1lbnVGb3JDYXRlZ29yaWVzKHJlc3VsdC5kYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuSGFuZGxlRHJvcERvd25NZW51KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWZ0ZXJDcmVhdGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQ29tbW9uVWkucHJvdG90eXBlLlNldE1lbnVUZXh0Rm9yQ3VycmVudElkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLkRlZmF1bHRNZW51VmFsdWVzLmlkID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLkRlZmF1bHRNZW51VmFsdWVzLnRleHQgPSBDb21tb25VaS5HZXRGdWxsQ2F0ZWdvcnlOYW1lQnlJZCh0aGlzLkRlZmF1bHRNZW51VmFsdWVzLmlkLCB0aGlzLlNlbGVjdENhdGVnb3J5RGF0YUxpc3QpO1xyXG4gICAgfTtcclxuICAgIENvbW1vblVpLnByb3RvdHlwZS5TZXRNZW51VGV4dEZvckNhdGVnb3J5SWQgPSBmdW5jdGlvbiAoaWQsIHRleHQpIHtcclxuICAgICAgICBpZiAodGV4dClcclxuICAgICAgICAgICAgdGhpcy5EZWZhdWx0TWVudVZhbHVlcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLkRlZmF1bHRNZW51VmFsdWVzLmlkID0gaWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvbW1vblVpO1xyXG59KCkpO1xyXG5leHBvcnRzLkNvbW1vblVpID0gQ29tbW9uVWk7XHJcbnZhciBDb21tb25CdXR0b25zID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29tbW9uQnV0dG9ucygpIHtcclxuICAgIH1cclxuICAgIENvbW1vbkJ1dHRvbnMuRGVsZXRlQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkKFwiPGJ1dHRvbiBjbGFzcz1cXFwiY29udHJvbEJ0biBkZWxldGUgIGJ0biBidG4tZGFuZ2VyXFxcIj5cXG4gICAgICAgICAgICAgIDxzcGFuPlxcdTA2MkRcXHUwNjMwXFx1MDY0MSA8L3NwYW4+XFxuICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtcmVtb3ZlXFxcIj48L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+XCIpO1xyXG4gICAgfTtcclxuICAgIENvbW1vbkJ1dHRvbnMuU2F2ZUJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJChcIjxidXR0b24gY2xhc3M9XFxcImNvbnRyb2xCdG4gc2F2ZSAgYnRuIGJ0bi1wcmltYXJ5XFxcIj5cXG4gICAgICAgICAgICAgICAgPHNwYW4+XFx1MDYyRFxcdTA2NDFcXHUwNjM4IDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrLWNpcmNsZVxcXCI+PC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlwiKTtcclxuICAgIH07XHJcbiAgICBDb21tb25CdXR0b25zLkVkaXRCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQoXCI8YnV0dG9uIGNsYXNzPVxcXCJjb250cm9sQnRuIGVkaXQgIGJ0biBidG4taW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuPlxcdTA2MkFcXHUwNjM5XFx1MDYyRlxcdTA2NEFcXHUwNjQ0IDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWVkaXRcXFwiPjwvaT5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cIik7XHJcbiAgICB9O1xyXG4gICAgQ29tbW9uQnV0dG9ucy5DdXN0b21CdG4gPSBmdW5jdGlvbiAobGFiZWwsIGljb25DbGFzcykge1xyXG4gICAgICAgIHJldHVybiAkKFwiPGJ1dHRvbiBjbGFzcz1cXFwiY29udHJvbEJ0biBlZGl0ICBidG4gYnRuLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgICA8c3Bhbj5cIiArIGxhYmVsICsgXCIgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgXCIgKyBpY29uQ2xhc3MgKyBcIlxcXCI+PC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlwiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ29tbW9uQnV0dG9ucztcclxufSgpKTtcclxuZXhwb3J0cy5Db21tb25CdXR0b25zID0gQ29tbW9uQnV0dG9ucztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tbW9uVUkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZGVjbGFyYXRpb24uZC50c1wiIC8+XHJcbnJlcXVpcmUoXCIuLi9BZG1pbi9Bc3Nlc3RzL0Jvb3RzdHJhcENvbXBvbmVudHMvYm9vdHN0cmFwTm90aWZ5XCIpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJC5mbi5wZW5kaW5nU3RhdGUgPSBmdW5jdGlvbiAoaXNQZW5kaW5nLCByZW1vdmVkQ2xhc3MsIGFuaW1hdGluZ0NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpbmdDbGFzcylcclxuICAgICAgICAgICAgYW5pbWF0aW5nQ2xhc3MgPSBcImZhLXNwaW5uZXIgZmEtc3BpblwiO1xyXG4gICAgICAgIGlmIChyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YShcImNsYXNzXCIsIHJlbW92ZWRDbGFzcyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZW1vdmVkQ2xhc3MgPSB0aGlzLmRhdGEoXCJjbGFzc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIikudG9nZ2xlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmIChpc1BlbmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kKFwiaVwiKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHJlbW92ZWRDbGFzcylcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmQoXCJpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MocmVtb3ZlZENsYXNzKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGFuaW1hdGluZ0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5zd2l0Y2hQZW5kaW5nU3RhdGUgPSBmdW5jdGlvbiAoaXNQZW5kaW5nLCByZW1vdmVkQ2xhc3MsIGFuaW1hdGluZ0NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpbmdDbGFzcylcclxuICAgICAgICAgICAgYW5pbWF0aW5nQ2xhc3MgPSBcImZhLXNwaW5uZXIgZmEtc3BpblwiO1xyXG4gICAgICAgIGlmIChyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YShcImNsYXNzXCIsIHJlbW92ZWRDbGFzcyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZW1vdmVkQ2xhc3MgPSB0aGlzLmRhdGEoXCJjbGFzc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIikudG9nZ2xlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmIChpc1BlbmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhyZW1vdmVkQ2xhc3MpLmFkZENsYXNzKGFuaW1hdGluZ0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MocmVtb3ZlZENsYXNzKS5yZW1vdmVDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuY29uZmlybU5vdGlmeSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbmZpcm1UZW1wbGF0ZSA9IFwiXFxuICAgICAgICAgICAgPGRpdiBkYXRhLW5vdGlmeT1cXFwiY29udGFpbmVyXFxcIiBcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImNvbC14cy0xMSBjb2wtc20tNCBhbGVydCBhbGVydC1pbmZvIGFsZXJ0LXdpdGgtaWNvbiBhbmltYXRlZCBmYWRlSW5Eb3duIGJvb3RzdHJhcE5vdGlmeVxcXCJcXG4gICAgICAgICAgICAgICAgcm9sZT1cXFwiYWxlcnRcXFwiIGRhdGEtbm90aWZ5LXBvc2l0aW9uPVxcXCJ0b3AtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtbm90aWZ5PVxcXCJkaXNtaXNzXFxcIj5cXHUwMEQ3PC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJpY29uXFxcIiBjbGFzcz1cXFwicGUtN3MtY2hlY2tcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1ub3RpZnk9XFxcInRpdGxlXFxcIj48L3NwYW4+IFxcbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwibWVzc2FnZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGV4dC1jZW50ZXIgY29uZmlybUNvbnRyb2xzXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tc21cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICBcXHUwNjJBXFx1MDYyM1xcdTA2NDNcXHUwNjRBXFx1MDYyRlxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jbG9zZVxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgXFx1MDYyN1xcdTA2NDRcXHUwNjNBXFx1MDYyN1xcdTA2MjFcXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGRhdGEtbm90aWZ5PVxcXCJ1cmxcXFwiPjwvYT5cXG4gICAgICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIG9uQ29uZmlybSkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAkKGNvbmZpcm1UZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sc2J0biA9IHRlbXBsYXRlLmZpbmQoXCIuY29uZmlybUNvbnRyb2xzIGJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY29udHJvbHNidG5cclxuICAgICAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoXCJyZXN1bHRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmVxKDEpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShcInJlc3VsdFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlLmZpbmQoJ3NwYW5bZGF0YS1ub3RpZnk9XCJtZXNzYWdlXCJdJykudGV4dChtZXNzYWdlKTtcclxuICAgICAgICAgICAgY29udHJvbHNidG4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlybS5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBvbkNvbmZpcm0oJCh0aGlzKS5kYXRhKFwicmVzdWx0XCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjb25maXJtID0gJC5ub3RpZnkoe30sIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb0FueUFjdGlvbiA9PT0gdm9pZCAwKSB7IGRvQW55QWN0aW9uID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb0FueUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aW1lcjogNDAwMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG4gICAgJC5mbi5hZGRQYXNzd29yZFNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBhc3N3b3JkSW5wID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAocGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIikgIT0gXCJwYXNzd29yZFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFzc3dvcmRJbnA7XHJcbiAgICAgICAgdmFyIGV5ZUljb24gPSAkKCc8aSBjbGFzcz1cImZhIGZhLWV5ZSBmYS1sZ1wiPjwvaT4nKTtcclxuICAgICAgICBwYXNzd29yZElucC5hZnRlcihleWVJY29uKTtcclxuICAgICAgICB2YXIgdG9wT2Zmc2V0ID0gcGFzc3dvcmRJbnAub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgIHBhc3N3b3JkSW5wLmhlaWdodCgpIC8gMjtcclxuICAgICAgICBleWVJY29uXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICBsZWZ0OiBcIjElXCIsXHJcbiAgICAgICAgICAgIHRvcDogXCJjYWxjKDEwMCUgLSBcIiArIHRvcE9mZnNldCArIFwicHgpXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiMzMzdhYjdcIixcclxuICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwYXNzd29yZElucC5hdHRyKFwidHlwZVwiKSA9PSBcInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgID8gcGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICA6IHBhc3N3b3JkSW5wLmF0dHIoXCJ0eXBlXCIsIFwicGFzc3dvcmRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhc3N3b3JkSW5wO1xyXG4gICAgfTtcclxuICAgICQuZm4uYWpheFN1Ym1pdCA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgSXNTdHJpbmdGaWFibGUsIGNvbXBsZXRlLCBiZWZvcmVTZW5kKSB7XHJcbiAgICAgICAgaWYgKElzU3RyaW5nRmlhYmxlID09PSB2b2lkIDApIHsgSXNTdHJpbmdGaWFibGUgPSB0cnVlOyB9XHJcbiAgICAgICAgdmFyIG9iamVjdERhdGEgPSB7fTtcclxuICAgICAgICBpZiAoISQodGhpcykudmFsaWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmZpbmQoXCJpbnB1dFwiKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoaSwgaW5wKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoaW5wKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5wdXQudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09IFwiZmFsc2VcIilcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKHZhbHVlID09IFwidHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPT0gXCJmYWxzZVwiID8gZmFsc2UgOiB2YWx1ZTtcclxuICAgICAgICAgICAgb2JqZWN0RGF0YVtpbnB1dC5hdHRyKFwibmFtZVwiKV0gPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb21wbGV0ZSgkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSXNTdHJpbmdGaWFibGUgPyBKU09OLnN0cmluZ2lmeShvYmplY3REYXRhKSA6IG9iamVjdERhdGEsXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgb2JqZWN0RGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5yZXNldFBhc3N3b3JkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKFwiXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4udG9nZ2xlQXR0ciA9IGZ1bmN0aW9uIChhdHRyKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wKGF0dHIpID8gdGhpcy5yZW1vdmVBdHRyKGF0dHIpIDogdGhpcy5wcm9wKGF0dHIsIGF0dHIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4uZm9ybUFsZXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmb3JtQWxlcnQgPSB0aGlzLmZpbmQoXCIuZm9ybUFsZXJ0XCIpXHJcbiAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuZmluZChcImlucHV0XCIpLmZvY3VzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9ybUFsZXJ0LmZhZGVPdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybUFsZXJ0O1xyXG4gICAgfTtcclxuICAgICQubm90aWZ5Q2F0Y2ggPSBmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi2YTZhSDZitiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqSAs2YTZiNis2YjYr9mF2LTZg9mE2Kkg2YHZiSDYp9mE2K7Yp9iv2YUs2K3Yp9mI2YQg2YXYsdipINin2K7YsdmJXCI7XHJcbiAgICAgICAgdmFyIG5vdGlmeU1lc3NhZ2UgPSBtb2RlbCAmJiBtb2RlbC5tZXNzYWdlID8gbW9kZWwubWVzc2FnZSA6IG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuICQubm90aWZ5KHsgbWVzc2FnZTogbm90aWZ5TWVzc2FnZSwgdGl0bGU6IFwi2YTZgtivINmB2LTZhNiqINin2YTYudmF2YTZitipXCIgfSk7XHJcbiAgICB9O1xyXG4gICAgJC5VcGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChCdG5IYW5kbGVyLCBPbkdvdEltZ0ZpbGUpIHtcclxuICAgICAgICB2YXIgYnRuQ29udGV4dDtcclxuICAgICAgICB2YXIgaW5wdXQgPSAkKFwiPGlucHV0IHR5cGU9J2ZpbGUnIGFjY2VwdD0naW1hZ2UvKicgaWQ9J3VwbG9hZEltZycgY2xhc3M9XFxcImhpZGRlblxcXCIvPlwiKTtcclxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgQnRuSGFuZGxlci5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xyXG4gICAgICAgICAgICBidG5Db250ZXh0ID0gJChlLnRhcmdldCkucGFyZW50cygnLkNvdXJzZUNhcmRUZW1wbGF0ZTplcSgwKScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0gXCIuXCIgKyBmaWxlLm5hbWUuc3BsaXQoXCIuXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoXCJpbWFnZVwiKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YfYsNipINin2YTZhtmI2LnZitipINmF2YYg2KfZhNi12YjYsSDYutmK2LEg2YXYr9i52YjZhdipXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9uR290SW1nRmlsZS5iaW5kKGJ0bkNvbnRleHQpKGZpbGUsIGV4dGVuc2lvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5TaG93bk9ubHlJZkNoZWNrZWQgPSBmdW5jdGlvbiAoVGFyZ2V0Q2hlY2tlZElucHV0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBUYXJnZXRDaGVja2VkSW5wdXQuaXMoJzpjaGVja2VkJylcclxuICAgICAgICAgICAgPyB0aGlzLnNob3coKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLnNob3coKVxyXG4gICAgICAgICAgICA6IHRoaXMuaGlkZSgpLnBhcmVudHMoJy5mb3JtLWdyb3VwOmVxKDApJykuaGlkZSgpO1xyXG4gICAgICAgIFRhcmdldENoZWNrZWRJbnB1dC5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxufSkoKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVyRG9tZS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9