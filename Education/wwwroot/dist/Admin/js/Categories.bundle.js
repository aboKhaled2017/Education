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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Admin/JS/Categories/Category.js");
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

/***/ "./src/Admin/JS/Categories/Category.js":
/*!*********************************************!*\
  !*** ./src/Admin/JS/Categories/Category.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../../global/helperDome */ "./src/global/helperDome.js");
$(function () {
    categoriesTbOperations.main();
});
var categoryStatus;
(function (categoryStatus) {
    categoryStatus["disabled"] = "\u0645\u0639\u0637\u0644";
    categoryStatus["activated"] = "\u0645\u0641\u0639\u0644";
})(categoryStatus || (categoryStatus = {}));
var categoryClass;
(function (categoryClass) {
    categoryClass["active"] = "enableCategory";
    categoryClass["deActive"] = "disableCategory";
})(categoryClass || (categoryClass = {}));
var DeleteBtn = function () {
    return $("<button class=\"controlBtn delete  btn btn-danger\">\n              <span>\u062D\u0630\u0641 </span>\n              <i class=\"fa fa-remove\"></i>\n            </button>");
};
var ListSubCategoriesBtn = function () {
    return $("<button class=\"controlBtn showSubs  btn btn-info\">\n                  <span>\u0627\u0644\u0627\u0642\u0633\u0627\u0645 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 </span>\n                  <i class=\"fa fa-plus\"></i>\n       </button>");
};
var SaveBtn = function () {
    return $("<button class=\"controlBtn save  btn btn-primary\">\n                <span>\u062D\u0641\u0638 </span>\n                <i class=\"fa fa-check-circle\"></i>\n            </button>");
};
var ToggleBtn = function (record) {
    var btnClass, btnText;
    if (record.isEnabled) {
        btnClass = "fa-toggle-on disableCategory";
    }
    else {
        btnClass = "fa-toggle-off enableCategory";
    }
    return $("<i class=\"controlBtn toogleBtn fa fa-2x " + btnClass + "\"></i> <span></span>");
};
var languages = {
    search: "بحث",
    emptyTable: "لا يوجد بيانات متاحة فى الجدول",
    infoEmpty: "لايوجد بيانات للعرض",
    loadingRecords: "تحميل البيانات ....",
    searchPlaceholder: "فلترة البيانات",
    aria: {
        sortAscending: "تصاعدى",
        sortDescending: "تنازلى"
    },
    info: "عرض _START_ الى _END_ من اصل _TOTAL_ حقل",
    processing: "جارى المعالجة....",
    zeroRecords: "لا يوجد بيانات",
    infoFiltered: "(مفلترة من اصل _MAX_ من الحقول الكلية)",
    infoPostFix: "",
    thousands: ",",
    lengthMenu: "عرض _MENU_ حقل",
    //decimal: " ",
    url: "الرابط",
    paginate: {
        first: "الاول",
        last: "الاخير",
        next: "التالى",
        previous: "السابق"
    }
};
var CategoriesTbId = "categoriesTb";
var columns = [
    { data: "id", visible: false, orderable: false },
    { data: "name", className: "name" },
    {
        data: "isEnabled",
        render: function (value, type, record, colDom) {
            return value
                ? "<h5 class='badge alert-success'>" + categoryStatus.activated + "</h5>"
                : "<h5 class='badge alert-danger'>" + categoryStatus.disabled + "</h5>";
        },
        className: "text-center isEnabled",
        searchable: false
    },
    {
        orderable: false,
        searchable: false,
        render: function (value, type, record, colDom) {
            var controls = $('<div class="controls"></div>');
            controls.append(ToggleBtn(record));
            controls.append(DeleteBtn());
            controls.append(SaveBtn());
            if (record.subs > 0) {
                controls.append(ListSubCategoriesBtn());
            }
            return controls.get(0).outerHTML;
        }
    }
];
var HandleOnRowCreated = function (rowNode, rowData, index) {
    var $rowNode = $(rowNode);
    $rowNode.data("id", rowData.id);
    var dataFields = $rowNode.find("td.name");
    dataFields.each(function (ind, el) {
        el.contentEditable = "true";
    });
    $(dataFields).blur(function (e) {
        var td = e.target;
        var text = td.textContent.trim();
        if (rowData.name != text)
            $rowNode.addClass("changed");
        else
            $rowNode.removeClass("changed");
        rowData.name = text;
    });
};
var categoriesTbOperations = {
    TableCounter: 1,
    CategoriesTbId: "categoriesTb",
    addCategoryBtn: $("#saveCategory"),
    selectCategoryBtn: $("#MainCategory"),
    DataTables: [],
    SelectCategoryDataList: [],
    formateTable: function (tableId, html) {
        return "<table id=\"" + tableId + "\">" + html + "</table>";
    },
    GetRowData: function (btn) {
        var tr = btn.closest("tr");
        var data = btn.closest("table").dataTable()["fnGetData"]();
        var id = tr.data("id");
        return data.find(function (cat) { return cat.id == id; });
    },
    GetDatatableRow: function (btn) {
        var tr = btn.closest("tr");
        var id = tr.closest("table").prop("id");
        return this.DataTables[id].row(tr);
    },
    FormateId: function (id) {
        return "details_" + id;
    },
    DetailsTable: $("#TbDetails").html(),
    HandleControlsBtns: function () {
        var mainObj = this;
        $("#" + CategoriesTbId).on("click", ".showSubs", function () {
            var btn = $(this);
            var tr = $(btn).closest("tr");
            var row = mainObj.GetDatatableRow(btn);
            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass("shown");
                btn
                    .find("i")
                    .removeClass("fa-minus")
                    .addClass("fa-plus");
            }
            else {
                var id = mainObj.FormateId(mainObj.TableCounter);
                row.child(mainObj.formateTable(id, mainObj.DetailsTable)).show();
                tr.addClass("shown");
                var detailsTb = $("#" + id)
                    .addClass("innerTb table-hover table-bordered")
                    .DataTable({
                    responsive: true,
                    ajax: {
                        url: "/Admin/Category/subCategories?id=" + row.data().id,
                        dataType: "json",
                        type: "GET",
                        contentType: "application/json"
                    },
                    columns: columns,
                    language: languages,
                    pageLength: 3,
                    lengthMenu: [3, 5, 10, 15, 20, 50, 100],
                    createdRow: function (rowNode, rowData, index) {
                        HandleOnRowCreated(rowNode, rowData, index);
                    }
                });
                mainObj.DataTables[id] = detailsTb;
                btn
                    .find("i")
                    .addClass("fa-minus")
                    .removeClass("fa-plus");
                mainObj.TableCounter = mainObj.TableCounter + 1;
            }
        });
        $("#" + CategoriesTbId).on("click", ".delete  ", function () {
            var btn = $(this);
            var tr = btn.closest("tr");
            var RowDataTable = mainObj.GetDatatableRow(btn);
            var rowData = RowDataTable.data();
            btn.pendingState(true, "fa-remove");
            $.post("/Admin/Category/Delete?id=" + rowData.id)
                .done(function (d) {
                $(RowDataTable.node()).fadeOut();
                mainObj.SelectCategoryDataList = mainObj.SelectCategoryDataList.filter(function (item) {
                    if (item.id != rowData.id)
                        return item;
                });
                mainObj.CreateCategoryBtnList();
            })
                .always(function (d) {
                btn.pendingState(false);
            })
                .catch(function () {
                $.notify({
                    message: "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم",
                    title: "لم يتم تنفيذ العملية"
                });
            });
        });
        $("#" + CategoriesTbId).on("click", ".toogleBtn  ", function () {
            var btn = $(this);
            var classNameIcon = btn.hasClass("fa-toggle-on")
                ? "fa-toggle-on"
                : "fa-toggle-off";
            var tr = btn.closest("tr");
            var rowDataTable = mainObj.GetDatatableRow(btn);
            var rowData = rowDataTable.data();
            var classType = btn.hasClass(categoryClass.active)
                ? categoryClass.active
                : categoryClass.deActive;
            btn.switchPendingState(true, classNameIcon);
            $.post("/Admin/Category/ToggleActive?id=" + rowData.id)
                .done(function (d) {
                rowData.isEnabled = !rowData.isEnabled;
                rowDataTable.data(rowData);
            })
                .always(function (d) {
                btn.switchPendingState(false);
                btn.toggleClass("fa-toggle-on fa-toggle-off");
            })
                .catch(function () {
                $.notify({
                    message: "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم",
                    title: "لم يتم تنفيذ العملية"
                });
            });
        });
        $("#" + CategoriesTbId).on("click", ".save  ", function () {
            var btn = $(this);
            var tr = btn.closest("tr");
            if (!tr.hasClass("changed"))
                return;
            var rowData = mainObj.GetRowData(btn);
            btn.pendingState(true, "fa-check-circle");
            $.post("/Admin/Category/Update", {
                Id: rowData.id,
                Name: rowData.name
            })
                .done(function () {
                mainObj.SelectCategoryDataList.find(function (c) { return c.id == rowData.id; }).name = rowData.name;
                mainObj.CreateCategoryBtnList();
            })
                .always(function (d) {
                btn.pendingState(false);
            })
                .catch(function () {
                $.notify({
                    message: "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم",
                    title: "لم يتم تنفيذ العملية"
                });
            });
        });
    },
    HandleAddCategory: function () {
        var _this = this;
        var mainObj = this;
        this.addCategoryBtn.click(function () {
            var nameInp = $("#Cat_Name");
            var name = nameInp.val();
            if (!(nameInp.valid() && name.length > 2))
                return false;
            var state = $('input[name="state"]:checked').val();
            var superId = mainObj.selectCategoryBtn.data("superId") || null;
            _this.addCategoryBtn.pendingState(true, "fa-check");
            $.post("/Admin/Category/Add", {
                Name: name,
                IsEnabled: state,
                SuperId: superId
            })
                .done(function (data) {
                $.notify({
                    message: "تمت اضافة القسم بنجاح",
                    title: "تمت الاضافة"
                });
                mainObj.Table.rows.add(data);
                _this.SelectCategoryDataList.push(data);
                _this.CreateCategoryBtnList();
                console.log(data);
            })
                .always(function () {
                _this.addCategoryBtn.pendingState(false);
                nameInp.val("");
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
        });
    },
    Table: (function (listUrl) {
        return $("#" + CategoriesTbId).DataTable({
            ajax: {
                url: listUrl,
                dataType: "json",
                type: "GET",
                contentType: "application/json"
            },
            columns: columns,
            language: languages,
            pageLength: 3,
            lengthMenu: [3, 5, 10, 15, 20, 50, 100],
            info: true,
            serverSide: true,
            createdRow: function (rowNode, rowData, index) {
                HandleOnRowCreated(rowNode, rowData, index);
            }
        });
    })("/Admin/Category/List"),
    MakeDropDownMenu: function (data, SuperId) {
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
                var item = $("<li class=\"dropdown\">\n                      <a class=\"sub dropdown-toggle\" data-toggle=\"dropdown\" tabindex=\"-1\">\n                          " + category.name + " <span class=\"caret\"></span>\n                      </a>\n                    </li>");
                var SubMenu = $("<ul class=\"dropdown-menu subMenu dropdown-menu-right\" role=\"menu\" style=\"display: none\">\n                       </ul>");
                var SubList = this_1.SelectCategoryDataList.filter(function (item, index) {
                    if (category.subs.indexOf(item.id) >= 0)
                        return item;
                });
                SubMenu.append(this_1.MakeDropDownMenu(SubList, category.id));
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
            .find("li")
            .css("cursor", "pointer")
            .not(".dropdown")
            .on("click", function (e) {
            var el = $(this);
            mainObj.selectCategoryBtn.find("button .text").text(el.data("name"));
            el.parents(".subMenu").hide();
            mainObj.selectCategoryBtn.data("superId", el.data("id"));
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
                .append(_this.MakeDropDownMenu(result.data));
            _this.HandleDropDownMenu();
        });
    },
    main: function () {
        this.CreateCategoryBtnList();
        this.DataTables[CategoriesTbId] = this.Table;
        this.HandleControlsBtns();
        this.HandleAddCategory();
    }
};
var b = { a: 10, OnPropertyChanges: function () {
        var _loop_2 = function (prop) {
            Object.defineProperty(this_2, prop, {
                set: function (v) {
                    console.log('new value is ' + v);
                    this[prop] = v;
                }
            });
        };
        var this_2 = this;
        for (var prop in this) {
            _loop_2(prop);
        }
    } };
Object.defineProperty(b, "ahmed", {
    value: "waleed",
    writable: true,
    configurable: true,
    set: function (v) {
        console.log(this);
    }
});
//# sourceMappingURL=Category.js.map

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0Fzc2VzdHMvQm9vdHN0cmFwQ29tcG9uZW50cy9ib290c3RyYXBOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkbWluL0pTL0NhdGVnb3JpZXMvQ2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC9oZWxwZXJEb21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYjtBQUNBLGdIQUFnSCxFQUFFLG9IQUFvSCwrRUFBK0UsRUFBRSw0Q0FBNEMsRUFBRSxpSEFBaUgsRUFBRSx3R0FBd0csOENBQThDLEVBQUUsYUFBYSxFQUFFO0FBQy9uQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekMscUNBQXFDLGtCQUFrQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Li9BZG1pbi9qcy9DYXRlZ29yaWVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0FkbWluL0pTL0NhdGVnb3JpZXMvQ2F0ZWdvcnkuanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYm9vdHN0cmFwTm90aWZ5LmQudHNcIiAvPlxyXG52YXIgbm90aWZ5VGVtcGxhdGUgPSBcIlxcbiA8ZGl2IGRhdGEtbm90aWZ5PVxcXCJjb250YWluZXJcXFwiIGNsYXNzPVxcXCJjb2wteHMtMTEgY29sLXNtLTQgYWxlcnQgYm9vdHN0cmFwTm90aWZ5IGFsZXJ0LXswfVxcXCIgcm9sZT1cXFwiYWxlcnRcXFwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1ub3RpZnk9XFxcImRpc21pc3NcXFwiPiZ0aW1lczs8L2J1dHRvbj5cXG4gICAgPHNwYW4gZGF0YS1ub3RpZnk9XFxcImljb25cXFwiPjwvc3Bhbj4gPHNwYW4gZGF0YS1ub3RpZnk9XFxcInRpdGxlXFxcIj57MX08L3NwYW4+XFxuICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJtZXNzYWdlXFxcIj57Mn08L3NwYW4+XFxuICAgIDxkaXYgY2xhc3M9XFxcInByb2dyZXNzXFxcIiBkYXRhLW5vdGlmeT1cXFwicHJvZ3Jlc3NiYXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItezB9XFxcIiByb2xlPVxcXCJwcm9ncmVzc2JhclxcXCIgYXJpYS12YWx1ZW5vdz1cXFwiMFxcXCIgYXJpYS12YWx1ZW1pbj1cXFwiMFxcXCIgYXJpYS12YWx1ZW1heD1cXFwiMTAwXFxcIiBzdHlsZT1cXFwid2lkdGg6IDAlO1xcXCI+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8YSBocmVmPVxcXCJ7M31cXFwiIHRhcmdldD1cXFwiezR9XFxcIiBkYXRhLW5vdGlmeT1cXFwidXJsXFxcIj48L2E+XFxuPC9kaXY+XFxuXCI7XHJcbnZhciBkZWZhdWx0cyA9IHtcclxuICAgIGVsZW1lbnQ6ICdib2R5JyxcclxuICAgIHBvc2l0aW9uOiBudWxsLFxyXG4gICAgdHlwZTogXCJpbmZvXCIsXHJcbiAgICBhbGxvd19kaXNtaXNzOiB0cnVlLFxyXG4gICAgYWxsb3dfZHVwbGljYXRlczogdHJ1ZSxcclxuICAgIG5ld2VzdF9vbl90b3A6IGZhbHNlLFxyXG4gICAgc2hvd1Byb2dyZXNzYmFyOiBmYWxzZSxcclxuICAgIHBsYWNlbWVudDoge1xyXG4gICAgICAgIGZyb206IFwidG9wXCIsXHJcbiAgICAgICAgYWxpZ246IFwicmlnaHRcIlxyXG4gICAgfSxcclxuICAgIG9mZnNldDogMjAsXHJcbiAgICBzcGFjaW5nOiAxMCxcclxuICAgIHpfaW5kZXg6IDk5OTk5OTk5OTk5OTksXHJcbiAgICBkZWxheTogNTAwMCxcclxuICAgIHRpbWVyOiAxMDAwLFxyXG4gICAgdXJsX3RhcmdldDogJ19ibGFuaycsXHJcbiAgICBtb3VzZV9vdmVyOiBudWxsLFxyXG4gICAgYW5pbWF0ZToge1xyXG4gICAgICAgIGVudGVyOiAnYW5pbWF0ZWQgZmFkZUluRG93bicsXHJcbiAgICAgICAgZXhpdDogJ2FuaW1hdGVkIGZhZGVPdXRVcCdcclxuICAgIH0sXHJcbiAgICBvblNob3c6IG51bGwsXHJcbiAgICBvblNob3duOiBudWxsLFxyXG4gICAgb25DbG9zZTogbnVsbCxcclxuICAgIG9uQ2xvc2VkOiBudWxsLFxyXG4gICAgaWNvbl90eXBlOiAnY2xhc3MnLFxyXG4gICAgdGVtcGxhdGU6IG5vdGlmeVRlbXBsYXRlXHJcbn07XHJcblN0cmluZy5mb3JtYXQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICB2YXIgc3RyID0gYXJndW1lbnRzWzBdO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShSZWdFeHAoXCJcXFxce1wiICsgKGkgLSAxKSArIFwiXFxcXH1cIiwgXCJnbVwiKSwgYXJndW1lbnRzW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHI7XHJcbn07XHJcbmZ1bmN0aW9uIGlzRHVwbGljYXRlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbikge1xyXG4gICAgdmFyIGlzRHVwZSA9IGZhbHNlO1xyXG4gICAgJCgnW2RhdGEtbm90aWZ5PVwiY29udGFpbmVyXCJdJykuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcclxuICAgICAgICB2YXIgJGVsID0gJChlbCk7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gJGVsLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInRpdGxlXCJdJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9ICRlbC5maW5kKCdbZGF0YS1ub3RpZnk9XCJtZXNzYWdlXCJdJykuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAvLyBUaGUgaW5wdXQgc3RyaW5nIG1pZ2h0IGJlIGRpZmZlcmVudCB0aGFuIHRoZSBhY3R1YWwgcGFyc2VkIEhUTUwgc3RyaW5nIVxyXG4gICAgICAgIC8vICg8YnI+IHZzIDxiciAvPiBmb3IgZXhhbXBsZSlcclxuICAgICAgICAvLyBTbyB3ZSBoYXZlIHRvIGZvcmNlLXBhcnNlIHRoaXMgYXMgSFRNTCBoZXJlIVxyXG4gICAgICAgIHZhciBpc1NhbWVUaXRsZSA9IHRpdGxlID09PSAkKFwiPGRpdj5cIiArIG5vdGlmaWNhdGlvbi5zZXR0aW5ncy5jb250ZW50LnRpdGxlICsgXCI8L2Rpdj5cIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICB2YXIgaXNTYW1lTXNnID0gbWVzc2FnZSA9PT0gJChcIjxkaXY+XCIgKyBub3RpZmljYXRpb24uc2V0dGluZ3MuY29udGVudC5tZXNzYWdlICsgXCI8L2Rpdj5cIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICB2YXIgaXNTYW1lVHlwZSA9ICRlbC5oYXNDbGFzcygnYWxlcnQtJyArIG5vdGlmaWNhdGlvbi5zZXR0aW5ncy50eXBlKTtcclxuICAgICAgICBpZiAoaXNTYW1lVGl0bGUgJiYgaXNTYW1lTXNnICYmIGlzU2FtZVR5cGUpIHtcclxuICAgICAgICAgICAgLy93ZSBmb3VuZCB0aGUgZHVwZS4gU2V0IHRoZSB2YXIgYW5kIHN0b3AgY2hlY2tpbmcuXHJcbiAgICAgICAgICAgIGlzRHVwZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAhaXNEdXBlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXNEdXBlO1xyXG59XHJcbnZhciBOb3RpZnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOb3RpZnkoZWxlbWVudCwgY29udGVudCwgb3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuY29udGVudE9iaiA9IHtcclxuICAgICAgICAgICAgY29udGVudDoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdHlwZW9mIGNvbnRlbnQgPT09ICdvYmplY3QnID8gY29udGVudC5tZXNzYWdlIDogY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBjb250ZW50LnRpdGxlID8gY29udGVudC50aXRsZSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogY29udGVudC5pY29uID8gY29udGVudC5pY29uIDogJ3BlLTdzLWJlbGwnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBjb250ZW50LnVybCA/IGNvbnRlbnQudXJsIDogJyMnLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBjb250ZW50LnRhcmdldCA/IGNvbnRlbnQudGFyZ2V0IDogJy0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubm90aWZ5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLiRlbGUgPSAkKCk7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbnRlbnRPYmosIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGVudC50YXJnZXQgPT09IFwiLVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuY29udGVudC50YXJnZXQgPSB0aGlzLnNldHRpbmdzLnVybF90YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcclxuICAgICAgICAgICAgc3RhcnQ6ICd3ZWJraXRBbmltYXRpb25TdGFydCBvYW5pbWF0aW9uc3RhcnQgTVNBbmltYXRpb25TdGFydCBhbmltYXRpb25zdGFydCcsXHJcbiAgICAgICAgICAgIGVuZDogJ3dlYmtpdEFuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIE1TQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vZmZzZXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub2Zmc2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogdGhpcy5zZXR0aW5ncy5vZmZzZXQsXHJcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnNldHRpbmdzLm9mZnNldFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIGR1cGxpY2F0ZSBtZXNzYWdlcyBhcmUgbm90IGFsbG93ZWQsIHRoZW4gb25seSBjb250aW51ZSBpZiB0aGlzIG5ldyBtZXNzYWdlIGlzIG5vdCBhIGR1cGxpY2F0ZSBvZiBvbmUgdGhhdCBpdCBhbHJlYWR5IHNob3dpbmdcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbGxvd19kdXBsaWNhdGVzIHx8ICghdGhpcy5zZXR0aW5ncy5hbGxvd19kdXBsaWNhdGVzICYmICFpc0R1cGxpY2F0ZU5vdGlmaWNhdGlvbih0aGlzKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmJ1aWxkTm90aWZ5KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGVudC5pY29uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SWNvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250ZW50LnVybCAhPSBcIiNcIikge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlVVJMKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3R5bGVEaXNtaXNzKCk7XHJcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQoKTtcclxuICAgICAgICB0aGlzLmJpbmQoKTtcclxuICAgICAgICB0aGlzLm5vdGlmeSA9IHtcclxuICAgICAgICAgICAgJGVsZTogdGhpcy4kZWxlLFxyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChjb21tYW5kLCB1cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21tYW5kcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHNbY29tbWFuZF0gPSB1cGRhdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcyA9IGNvbW1hbmQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjbWQgaW4gY29tbWFuZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNtZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHlwZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLnJlbW92ZUNsYXNzKCdhbGVydC0nICsgc2VsZi5zZXR0aW5ncy50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXSA+IC5wcm9ncmVzcy1iYXInKS5yZW1vdmVDbGFzcygncHJvZ3Jlc3MtYmFyLScgKyBzZWxmLnNldHRpbmdzLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy50eXBlID0gY29tbWFuZHNbY21kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5hZGRDbGFzcygnYWxlcnQtJyArIGNvbW1hbmRzW2NtZF0pLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gLnByb2dyZXNzLWJhcicpLmFkZENsYXNzKCdwcm9ncmVzcy1iYXItJyArIGNvbW1hbmRzW2NtZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpY29uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGljb24gPSB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MuaWNvbl90eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaWNvbi5yZW1vdmVDbGFzcyhzZWxmLnNldHRpbmdzLmNvbnRlbnQuaWNvbikuYWRkQ2xhc3MoY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRpY29uLmlzKCdpbWcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaWNvbi5maW5kKCdpbWcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGljb24uYXR0cignc3JjJywgY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb2dyZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RGVsYXkgPSBzZWxmLnNldHRpbmdzLmRlbGF5IC0gKHNlbGYuc2V0dGluZ3MuZGVsYXkgKiAoY29tbWFuZHNbY21kXSAvIDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmRhdGEoJ25vdGlmeS1kZWxheScsIG5ld0RlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXSA+IGRpdicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCBjb21tYW5kc1tjbWRdKS5jc3MoJ3dpZHRoJywgY29tbWFuZHNbY21kXSArICclJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVybFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInVybFwiXScpLmF0dHIoJ2hyZWYnLCBjb21tYW5kc1tjbWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGFyZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwidXJsXCJdJykuYXR0cigndGFyZ2V0JywgY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCInICsgY21kICsgJ1wiXScpLmh0bWwoY29tbWFuZHNbY21kXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHBvc1ggPSB0aGlzLiRlbGUub3V0ZXJIZWlnaHQoKSArIHBhcnNlSW50KHNlbGYuc2V0dGluZ3Muc3BhY2luZykgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLm9mZnNldC55LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZXBvc2l0aW9uKHBvc1gpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKGRvQW55QWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKGRvQW55QWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5idWlsZE5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuc2V0dGluZ3MuY29udGVudDtcclxuICAgICAgICB0aGlzLiRlbGUgPSAodHlwZW9mIHRoaXMuc2V0dGluZ3MudGVtcGxhdGUgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgPyAkKFN0cmluZy5mb3JtYXQodGhpcy5zZXR0aW5ncy50ZW1wbGF0ZSwgdGhpcy5zZXR0aW5ncy50eXBlLCBjb250ZW50LnRpdGxlLCBjb250ZW50Lm1lc3NhZ2UsIGNvbnRlbnQudXJsLCBjb250ZW50LnRhcmdldCkpXHJcbiAgICAgICAgICAgIDogdGhpcy5zZXR0aW5ncy50ZW1wbGF0ZTtcclxuICAgICAgICB0aGlzLiRlbGUuYXR0cignZGF0YS1ub3RpZnktcG9zaXRpb24nLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24pO1xyXG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5hbGxvd19kaXNtaXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh0aGlzLnNldHRpbmdzLmRlbGF5IDw9IDAgJiYgIXRoaXMuc2V0dGluZ3Muc2hvd1Byb2dyZXNzYmFyKSB8fCAhdGhpcy5zZXR0aW5ncy5zaG93UHJvZ3Jlc3NiYXIpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuc2V0SWNvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLiRlbGUuYWRkQ2xhc3MoJ2FsZXJ0LXdpdGgtaWNvbicpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmljb25fdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5jb250ZW50Lmljb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJykuaXMoJ2ltZycpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiaWNvblwiXScpLmF0dHIoJ3NyYycsIHRoaXMuc2V0dGluZ3MuY29udGVudC5pY29uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJykuYXBwZW5kKCc8aW1nIHNyYz1cIicgKyB0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbiArICdcIiBhbHQ9XCJOb3RpZnkgSWNvblwiIC8+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5zdHlsZURpc21pc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgbGVmdDogJzEwcHgnLFxyXG4gICAgICAgICAgICB0b3A6ICc1MCUnLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICctMTNweCcsXHJcbiAgICAgICAgICAgIHpJbmRleDogdGhpcy5zZXR0aW5ncy56X2luZGV4ICsgMlxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUuc3R5bGVVUkwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInVybFwiXScpLmNzcyh7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcpJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHpJbmRleDogdGhpcy5zZXR0aW5ncy56X2luZGV4ICsgMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE5vdGlmeS5wcm90b3R5cGUucGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBvZmZzZXRBbXQgPSB0aGlzLnNldHRpbmdzLm9mZnNldC55LCBjc3MgPSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBtYXJnaW46ICcwcHggYXV0bycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnNldHRpbmdzLnBvc2l0aW9uID8gdGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA6ICh0aGlzLnNldHRpbmdzLmVsZW1lbnQgPT09ICdib2R5JyA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAuNXMgZWFzZS1pbi1vdXQnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRoaXMuc2V0dGluZ3Muel9pbmRleFxyXG4gICAgICAgIH0sIGhhc0FuaW1hdGlvbiA9IGZhbHNlLCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XHJcbiAgICAgICAgJCgnW2RhdGEtbm90aWZ5LXBvc2l0aW9uPVwiJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmZyb20gKyAnLScgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5hbGlnbiArICdcIl06bm90KFtkYXRhLWNsb3Npbmc9XCJ0cnVlXCJdKScpXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGggPSAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIG9mZnNldEFtdCA9IE1hdGgubWF4KG9mZnNldEFtdCwgcGFyc2VJbnQoJCh0aGlzKS5jc3Moc2V0dGluZ3MucGxhY2VtZW50LmZyb20pKSArIGggKyBwYXJzZUludChzZXR0aW5ncy5zcGFjaW5nKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubmV3ZXN0X29uX3RvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBvZmZzZXRBbXQgPSB0aGlzLnNldHRpbmdzLm9mZnNldC55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjc3NbKHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmZyb20pXSA9IG9mZnNldEFtdCArICdweCc7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5hbGlnbikge1xyXG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICAgICAgICAgIGNzc1t0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5hbGlnbl0gPSB0aGlzLnNldHRpbmdzLm9mZnNldC54ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2VudGVyXCI6XHJcbiAgICAgICAgICAgICAgICBjc3MubGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjc3MucmlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGVsZS5jc3MoY3NzKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFuaW1hdGUuZW50ZXIpO1xyXG4gICAgICAgICQuZWFjaChBcnJheSgnd2Via2l0LScsICdtb3otJywgJ28tJywgJ21zLScsICcnKSwgZnVuY3Rpb24gKGluZGV4LCBwcmVmaXgpIHtcclxuICAgICAgICAgICAgc2VsZi4kZWxlWzBdLnN0eWxlW3ByZWZpeCArICdBbmltYXRpb25JdGVyYXRpb25Db3VudCddID0gMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3MuZWxlbWVudCA9PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAkKHRoaXMuc2V0dGluZ3MuZWxlbWVudCkuYXBwZW5kKHRoaXMuJGVsZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmVsZW1lbnQuYXBwZW5kKHRoaXMuJGVsZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubmV3ZXN0X29uX3RvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBvZmZzZXRBbXQgPSAob2Zmc2V0QW10ICsgcGFyc2VJbnQodGhpcy5zZXR0aW5ncy5zcGFjaW5nKSkgKyB0aGlzLiRlbGUub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgdGhpcy5yZXBvc2l0aW9uKG9mZnNldEFtdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2VsZi5zZXR0aW5ncy5vblNob3cpKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25TaG93LmNhbGwodGhpcy4kZWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kZWxlLm9uZSh0aGlzLmFuaW1hdGlvbnMuc3RhcnQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGFzQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9KS5vbmUodGhpcy5hbmltYXRpb25zLmVuZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25TaG93bikpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25TaG93bi5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25TaG93bikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvd24uY2FsbChfdGhpcy4kZWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDYwMCk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZ5LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGVsZS5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2RhdGEtaG92ZXInLCBcInRydWVcIik7XHJcbiAgICAgICAgfSkubW91c2VvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2RhdGEtaG92ZXInLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGVsZS5kYXRhKCdkYXRhLWhvdmVyJywgXCJmYWxzZVwiKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWxheSA+IDApIHtcclxuICAgICAgICAgICAgc2VsZi4kZWxlLmRhdGEoJ25vdGlmeS1kZWxheScsIHNlbGYuc2V0dGluZ3MuZGVsYXkpO1xyXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsYXkgPSBwYXJzZUludChzZWxmLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5JykpIC0gc2VsZi5zZXR0aW5ncy50aW1lcjtcclxuICAgICAgICAgICAgICAgIGlmICgoc2VsZi4kZWxlLmRhdGEoJ2RhdGEtaG92ZXInKSA9PT0gJ2ZhbHNlJyAmJiBzZWxmLnNldHRpbmdzLm1vdXNlX292ZXIgPT09IFwicGF1c2VcIikgfHwgc2VsZi5zZXR0aW5ncy5tb3VzZV9vdmVyICE9IFwicGF1c2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gKChzZWxmLnNldHRpbmdzLmRlbGF5IC0gZGVsYXkpIC8gc2VsZi5zZXR0aW5ncy5kZWxheSkgKiAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlLmRhdGEoJ25vdGlmeS1kZWxheScsIGRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiBkaXYnKS5hdHRyKCdhcmlhLXZhbHVlbm93JywgcGVyY2VudCkuY3NzKCd3aWR0aCcsIHBlcmNlbnQgKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGF5IDw9IC0oc2VsZi5zZXR0aW5ncy50aW1lcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHNlbGYuc2V0dGluZ3MudGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGRvQW55QWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBwb3NYID0gcGFyc2VJbnQodGhpcy4kZWxlLmNzcyh0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tKSksIGhhc0FuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGVsZS5kYXRhKCdjbG9zaW5nJywgJ3RydWUnKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFuaW1hdGUuZXhpdCk7XHJcbiAgICAgICAgc2VsZi5yZXBvc2l0aW9uKHBvc1gpO1xyXG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2VsZi5zZXR0aW5ncy5vbkNsb3NlKSkge1xyXG4gICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ2xvc2UuY2FsbCh0aGlzLiRlbGUsIGRvQW55QWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kZWxlLm9uZSh0aGlzLmFuaW1hdGlvbnMuc3RhcnQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGFzQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9KS5vbmUodGhpcy5hbmltYXRpb25zLmVuZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25DbG9zZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ2xvc2VkLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNsb3NlZChzZWxmLiRlbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNjAwKTtcclxuICAgIH07XHJcbiAgICBOb3RpZnkucHJvdG90eXBlLnJlcG9zaXRpb24gPSBmdW5jdGlvbiAocG9zWCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgbm90aWZpZXMgPSAnW2RhdGEtbm90aWZ5LXBvc2l0aW9uPVwiJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmZyb20gKyAnLScgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5hbGlnbiArICdcIl06bm90KFtkYXRhLWNsb3Npbmc9XCJ0cnVlXCJdKScsICRlbGVtZW50cyA9IHRoaXMuJGVsZS5uZXh0QWxsKG5vdGlmaWVzKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5uZXdlc3Rfb25fdG9wID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50cyA9IHRoaXMuJGVsZS5wcmV2QWxsKG5vdGlmaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcyhzZWxmLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tLCBwb3NYKTtcclxuICAgICAgICAgICAgdmFyIGggPSAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHBvc1ggPSAocGFyc2VJbnQocG9zWC50b1N0cmluZygpKSArIHBhcnNlSW50KHNlbGYuc2V0dGluZ3Muc3BhY2luZykpICsgaDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTm90aWZ5O1xyXG59KCkpO1xyXG4kLm5vdGlmeSA9IGZ1bmN0aW9uIChjb250ZW50LCBvcHRpb25zKSB7XHJcbiAgICB2YXIgcGx1Z2luID0gbmV3IE5vdGlmeSh0aGlzLCBjb250ZW50LCBvcHRpb25zKTtcclxuICAgIHJldHVybiBwbHVnaW4ubm90aWZ5O1xyXG59O1xyXG4kLm5vdGlmeURlZmF1bHRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIGRlZmF1bHRzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBkZWZhdWx0cztcclxufTtcclxuJC5ub3RpZnlDbG9zZSA9IGZ1bmN0aW9uIChjb21tYW5kKSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbW1hbmQgPT09IFwidW5kZWZpbmVkXCIgfHwgY29tbWFuZCA9PT0gXCJhbGxcIikge1xyXG4gICAgICAgICQoJ1tkYXRhLW5vdGlmeV0nKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyBjb21tYW5kICsgJ1wiXScpLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290c3RyYXBOb3RpZnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxucmVxdWlyZShcIi4uLy4uLy4uL2dsb2JhbC9oZWxwZXJEb21lXCIpO1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIGNhdGVnb3JpZXNUYk9wZXJhdGlvbnMubWFpbigpO1xyXG59KTtcclxudmFyIGNhdGVnb3J5U3RhdHVzO1xyXG4oZnVuY3Rpb24gKGNhdGVnb3J5U3RhdHVzKSB7XHJcbiAgICBjYXRlZ29yeVN0YXR1c1tcImRpc2FibGVkXCJdID0gXCJcXHUwNjQ1XFx1MDYzOVxcdTA2MzdcXHUwNjQ0XCI7XHJcbiAgICBjYXRlZ29yeVN0YXR1c1tcImFjdGl2YXRlZFwiXSA9IFwiXFx1MDY0NVxcdTA2NDFcXHUwNjM5XFx1MDY0NFwiO1xyXG59KShjYXRlZ29yeVN0YXR1cyB8fCAoY2F0ZWdvcnlTdGF0dXMgPSB7fSkpO1xyXG52YXIgY2F0ZWdvcnlDbGFzcztcclxuKGZ1bmN0aW9uIChjYXRlZ29yeUNsYXNzKSB7XHJcbiAgICBjYXRlZ29yeUNsYXNzW1wiYWN0aXZlXCJdID0gXCJlbmFibGVDYXRlZ29yeVwiO1xyXG4gICAgY2F0ZWdvcnlDbGFzc1tcImRlQWN0aXZlXCJdID0gXCJkaXNhYmxlQ2F0ZWdvcnlcIjtcclxufSkoY2F0ZWdvcnlDbGFzcyB8fCAoY2F0ZWdvcnlDbGFzcyA9IHt9KSk7XHJcbnZhciBEZWxldGVCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gJChcIjxidXR0b24gY2xhc3M9XFxcImNvbnRyb2xCdG4gZGVsZXRlICBidG4gYnRuLWRhbmdlclxcXCI+XFxuICAgICAgICAgICAgICA8c3Bhbj5cXHUwNjJEXFx1MDYzMFxcdTA2NDEgPC9zcGFuPlxcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXJlbW92ZVxcXCI+PC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlwiKTtcclxufTtcclxudmFyIExpc3RTdWJDYXRlZ29yaWVzQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICQoXCI8YnV0dG9uIGNsYXNzPVxcXCJjb250cm9sQnRuIHNob3dTdWJzICBidG4gYnRuLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxcdTA2MjdcXHUwNjQ0XFx1MDYyN1xcdTA2NDJcXHUwNjMzXFx1MDYyN1xcdTA2NDUgXFx1MDYyN1xcdTA2NDRcXHUwNjQxXFx1MDYzMVxcdTA2MzlcXHUwNjRBXFx1MDYyOSA8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXBsdXNcXFwiPjwvaT5cXG4gICAgICAgPC9idXR0b24+XCIpO1xyXG59O1xyXG52YXIgU2F2ZUJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAkKFwiPGJ1dHRvbiBjbGFzcz1cXFwiY29udHJvbEJ0biBzYXZlICBidG4gYnRuLXByaW1hcnlcXFwiPlxcbiAgICAgICAgICAgICAgICA8c3Bhbj5cXHUwNjJEXFx1MDY0MVxcdTA2MzggPC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtY2hlY2stY2lyY2xlXFxcIj48L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+XCIpO1xyXG59O1xyXG52YXIgVG9nZ2xlQnRuID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgdmFyIGJ0bkNsYXNzLCBidG5UZXh0O1xyXG4gICAgaWYgKHJlY29yZC5pc0VuYWJsZWQpIHtcclxuICAgICAgICBidG5DbGFzcyA9IFwiZmEtdG9nZ2xlLW9uIGRpc2FibGVDYXRlZ29yeVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYnRuQ2xhc3MgPSBcImZhLXRvZ2dsZS1vZmYgZW5hYmxlQ2F0ZWdvcnlcIjtcclxuICAgIH1cclxuICAgIHJldHVybiAkKFwiPGkgY2xhc3M9XFxcImNvbnRyb2xCdG4gdG9vZ2xlQnRuIGZhIGZhLTJ4IFwiICsgYnRuQ2xhc3MgKyBcIlxcXCI+PC9pPiA8c3Bhbj48L3NwYW4+XCIpO1xyXG59O1xyXG52YXIgbGFuZ3VhZ2VzID0ge1xyXG4gICAgc2VhcmNoOiBcItio2K3Yq1wiLFxyXG4gICAgZW1wdHlUYWJsZTogXCLZhNinINmK2YjYrNivINio2YrYp9mG2KfYqiDZhdiq2KfYrdipINmB2Ykg2KfZhNis2K/ZiNmEXCIsXHJcbiAgICBpbmZvRW1wdHk6IFwi2YTYp9mK2YjYrNivINio2YrYp9mG2KfYqiDZhNmE2LnYsdi2XCIsXHJcbiAgICBsb2FkaW5nUmVjb3JkczogXCLYqtit2YXZitmEINin2YTYqNmK2KfZhtin2KogLi4uLlwiLFxyXG4gICAgc2VhcmNoUGxhY2Vob2xkZXI6IFwi2YHZhNiq2LHYqSDYp9mE2KjZitin2YbYp9iqXCIsXHJcbiAgICBhcmlhOiB7XHJcbiAgICAgICAgc29ydEFzY2VuZGluZzogXCLYqti12KfYudiv2YlcIixcclxuICAgICAgICBzb3J0RGVzY2VuZGluZzogXCLYqtmG2KfYstmE2YlcIlxyXG4gICAgfSxcclxuICAgIGluZm86IFwi2LnYsdi2IF9TVEFSVF8g2KfZhNmJIF9FTkRfINmF2YYg2KfYtdmEIF9UT1RBTF8g2K3ZgtmEXCIsXHJcbiAgICBwcm9jZXNzaW5nOiBcItis2KfYsdmJINin2YTZhdi52KfZhNis2KkuLi4uXCIsXHJcbiAgICB6ZXJvUmVjb3JkczogXCLZhNinINmK2YjYrNivINio2YrYp9mG2KfYqlwiLFxyXG4gICAgaW5mb0ZpbHRlcmVkOiBcIijZhdmB2YTYqtix2Kkg2YXZhiDYp9i12YQgX01BWF8g2YXZhiDYp9mE2K3ZgtmI2YQg2KfZhNmD2YTZitipKVwiLFxyXG4gICAgaW5mb1Bvc3RGaXg6IFwiXCIsXHJcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxyXG4gICAgbGVuZ3RoTWVudTogXCLYudix2LYgX01FTlVfINit2YLZhFwiLFxyXG4gICAgLy9kZWNpbWFsOiBcIiBcIixcclxuICAgIHVybDogXCLYp9mE2LHYp9io2LdcIixcclxuICAgIHBhZ2luYXRlOiB7XHJcbiAgICAgICAgZmlyc3Q6IFwi2KfZhNin2YjZhFwiLFxyXG4gICAgICAgIGxhc3Q6IFwi2KfZhNin2K7ZitixXCIsXHJcbiAgICAgICAgbmV4dDogXCLYp9mE2KrYp9mE2YlcIixcclxuICAgICAgICBwcmV2aW91czogXCLYp9mE2LPYp9io2YJcIlxyXG4gICAgfVxyXG59O1xyXG52YXIgQ2F0ZWdvcmllc1RiSWQgPSBcImNhdGVnb3JpZXNUYlwiO1xyXG52YXIgY29sdW1ucyA9IFtcclxuICAgIHsgZGF0YTogXCJpZFwiLCB2aXNpYmxlOiBmYWxzZSwgb3JkZXJhYmxlOiBmYWxzZSB9LFxyXG4gICAgeyBkYXRhOiBcIm5hbWVcIiwgY2xhc3NOYW1lOiBcIm5hbWVcIiB9LFxyXG4gICAge1xyXG4gICAgICAgIGRhdGE6IFwiaXNFbmFibGVkXCIsXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAodmFsdWUsIHR5cGUsIHJlY29yZCwgY29sRG9tKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgPyBcIjxoNSBjbGFzcz0nYmFkZ2UgYWxlcnQtc3VjY2Vzcyc+XCIgKyBjYXRlZ29yeVN0YXR1cy5hY3RpdmF0ZWQgKyBcIjwvaDU+XCJcclxuICAgICAgICAgICAgICAgIDogXCI8aDUgY2xhc3M9J2JhZGdlIGFsZXJ0LWRhbmdlcic+XCIgKyBjYXRlZ29yeVN0YXR1cy5kaXNhYmxlZCArIFwiPC9oNT5cIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBpc0VuYWJsZWRcIixcclxuICAgICAgICBzZWFyY2hhYmxlOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBvcmRlcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIHNlYXJjaGFibGU6IGZhbHNlLFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKHZhbHVlLCB0eXBlLCByZWNvcmQsIGNvbERvbSkge1xyXG4gICAgICAgICAgICB2YXIgY29udHJvbHMgPSAkKCc8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgY29udHJvbHMuYXBwZW5kKFRvZ2dsZUJ0bihyZWNvcmQpKTtcclxuICAgICAgICAgICAgY29udHJvbHMuYXBwZW5kKERlbGV0ZUJ0bigpKTtcclxuICAgICAgICAgICAgY29udHJvbHMuYXBwZW5kKFNhdmVCdG4oKSk7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQuc3VicyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLmFwcGVuZChMaXN0U3ViQ2F0ZWdvcmllc0J0bigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29udHJvbHMuZ2V0KDApLm91dGVySFRNTDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbl07XHJcbnZhciBIYW5kbGVPblJvd0NyZWF0ZWQgPSBmdW5jdGlvbiAocm93Tm9kZSwgcm93RGF0YSwgaW5kZXgpIHtcclxuICAgIHZhciAkcm93Tm9kZSA9ICQocm93Tm9kZSk7XHJcbiAgICAkcm93Tm9kZS5kYXRhKFwiaWRcIiwgcm93RGF0YS5pZCk7XHJcbiAgICB2YXIgZGF0YUZpZWxkcyA9ICRyb3dOb2RlLmZpbmQoXCJ0ZC5uYW1lXCIpO1xyXG4gICAgZGF0YUZpZWxkcy5lYWNoKGZ1bmN0aW9uIChpbmQsIGVsKSB7XHJcbiAgICAgICAgZWwuY29udGVudEVkaXRhYmxlID0gXCJ0cnVlXCI7XHJcbiAgICB9KTtcclxuICAgICQoZGF0YUZpZWxkcykuYmx1cihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciB0ZCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIHZhciB0ZXh0ID0gdGQudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICAgIGlmIChyb3dEYXRhLm5hbWUgIT0gdGV4dClcclxuICAgICAgICAgICAgJHJvd05vZGUuYWRkQ2xhc3MoXCJjaGFuZ2VkXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJHJvd05vZGUucmVtb3ZlQ2xhc3MoXCJjaGFuZ2VkXCIpO1xyXG4gICAgICAgIHJvd0RhdGEubmFtZSA9IHRleHQ7XHJcbiAgICB9KTtcclxufTtcclxudmFyIGNhdGVnb3JpZXNUYk9wZXJhdGlvbnMgPSB7XHJcbiAgICBUYWJsZUNvdW50ZXI6IDEsXHJcbiAgICBDYXRlZ29yaWVzVGJJZDogXCJjYXRlZ29yaWVzVGJcIixcclxuICAgIGFkZENhdGVnb3J5QnRuOiAkKFwiI3NhdmVDYXRlZ29yeVwiKSxcclxuICAgIHNlbGVjdENhdGVnb3J5QnRuOiAkKFwiI01haW5DYXRlZ29yeVwiKSxcclxuICAgIERhdGFUYWJsZXM6IFtdLFxyXG4gICAgU2VsZWN0Q2F0ZWdvcnlEYXRhTGlzdDogW10sXHJcbiAgICBmb3JtYXRlVGFibGU6IGZ1bmN0aW9uICh0YWJsZUlkLCBodG1sKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiPHRhYmxlIGlkPVxcXCJcIiArIHRhYmxlSWQgKyBcIlxcXCI+XCIgKyBodG1sICsgXCI8L3RhYmxlPlwiO1xyXG4gICAgfSxcclxuICAgIEdldFJvd0RhdGE6IGZ1bmN0aW9uIChidG4pIHtcclxuICAgICAgICB2YXIgdHIgPSBidG4uY2xvc2VzdChcInRyXCIpO1xyXG4gICAgICAgIHZhciBkYXRhID0gYnRuLmNsb3Nlc3QoXCJ0YWJsZVwiKS5kYXRhVGFibGUoKVtcImZuR2V0RGF0YVwiXSgpO1xyXG4gICAgICAgIHZhciBpZCA9IHRyLmRhdGEoXCJpZFwiKTtcclxuICAgICAgICByZXR1cm4gZGF0YS5maW5kKGZ1bmN0aW9uIChjYXQpIHsgcmV0dXJuIGNhdC5pZCA9PSBpZDsgfSk7XHJcbiAgICB9LFxyXG4gICAgR2V0RGF0YXRhYmxlUm93OiBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgICAgICAgdmFyIHRyID0gYnRuLmNsb3Nlc3QoXCJ0clwiKTtcclxuICAgICAgICB2YXIgaWQgPSB0ci5jbG9zZXN0KFwidGFibGVcIikucHJvcChcImlkXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLkRhdGFUYWJsZXNbaWRdLnJvdyh0cik7XHJcbiAgICB9LFxyXG4gICAgRm9ybWF0ZUlkOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gXCJkZXRhaWxzX1wiICsgaWQ7XHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1RhYmxlOiAkKFwiI1RiRGV0YWlsc1wiKS5odG1sKCksXHJcbiAgICBIYW5kbGVDb250cm9sc0J0bnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWFpbk9iaiA9IHRoaXM7XHJcbiAgICAgICAgJChcIiNcIiArIENhdGVnb3JpZXNUYklkKS5vbihcImNsaWNrXCIsIFwiLnNob3dTdWJzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGJ0biA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB0ciA9ICQoYnRuKS5jbG9zZXN0KFwidHJcIik7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBtYWluT2JqLkdldERhdGF0YWJsZVJvdyhidG4pO1xyXG4gICAgICAgICAgICBpZiAocm93LmNoaWxkLmlzU2hvd24oKSkge1xyXG4gICAgICAgICAgICAgICAgcm93LmNoaWxkLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHRyLnJlbW92ZUNsYXNzKFwic2hvd25cIik7XHJcbiAgICAgICAgICAgICAgICBidG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZChcImlcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJmYS1taW51c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImZhLXBsdXNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBtYWluT2JqLkZvcm1hdGVJZChtYWluT2JqLlRhYmxlQ291bnRlcik7XHJcbiAgICAgICAgICAgICAgICByb3cuY2hpbGQobWFpbk9iai5mb3JtYXRlVGFibGUoaWQsIG1haW5PYmouRGV0YWlsc1RhYmxlKSkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgdHIuYWRkQ2xhc3MoXCJzaG93blwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZXRhaWxzVGIgPSAkKFwiI1wiICsgaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW5uZXJUYiB0YWJsZS1ob3ZlciB0YWJsZS1ib3JkZXJlZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5EYXRhVGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWpheDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL0FkbWluL0NhdGVnb3J5L3N1YkNhdGVnb3JpZXM/aWQ9XCIgKyByb3cuZGF0YSgpLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY29sdW1ucyxcclxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VMZW5ndGg6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoTWVudTogWzMsIDUsIDEwLCAxNSwgMjAsIDUwLCAxMDBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRSb3c6IGZ1bmN0aW9uIChyb3dOb2RlLCByb3dEYXRhLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVPblJvd0NyZWF0ZWQocm93Tm9kZSwgcm93RGF0YSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWFpbk9iai5EYXRhVGFibGVzW2lkXSA9IGRldGFpbHNUYjtcclxuICAgICAgICAgICAgICAgIGJ0blxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKFwiaVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImZhLW1pbnVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZmEtcGx1c1wiKTtcclxuICAgICAgICAgICAgICAgIG1haW5PYmouVGFibGVDb3VudGVyID0gbWFpbk9iai5UYWJsZUNvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIiNcIiArIENhdGVnb3JpZXNUYklkKS5vbihcImNsaWNrXCIsIFwiLmRlbGV0ZSAgXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGJ0biA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB0ciA9IGJ0bi5jbG9zZXN0KFwidHJcIik7XHJcbiAgICAgICAgICAgIHZhciBSb3dEYXRhVGFibGUgPSBtYWluT2JqLkdldERhdGF0YWJsZVJvdyhidG4pO1xyXG4gICAgICAgICAgICB2YXIgcm93RGF0YSA9IFJvd0RhdGFUYWJsZS5kYXRhKCk7XHJcbiAgICAgICAgICAgIGJ0bi5wZW5kaW5nU3RhdGUodHJ1ZSwgXCJmYS1yZW1vdmVcIik7XHJcbiAgICAgICAgICAgICQucG9zdChcIi9BZG1pbi9DYXRlZ29yeS9EZWxldGU/aWQ9XCIgKyByb3dEYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgICQoUm93RGF0YVRhYmxlLm5vZGUoKSkuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgbWFpbk9iai5TZWxlY3RDYXRlZ29yeURhdGFMaXN0ID0gbWFpbk9iai5TZWxlY3RDYXRlZ29yeURhdGFMaXN0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkICE9IHJvd0RhdGEuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtYWluT2JqLkNyZWF0ZUNhdGVnb3J5QnRuTGlzdCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgYnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YTYpyDZitmF2YPZhiDYqtmG2YHZitiwINin2YTYudmF2YTZitipINin2YTYp9mGLNmE2K3Yr9mI2Ksg2YXYtNmD2YTYqSDYudmG2K8g2KfZhNiu2KfYr9mFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi2YTZhSDZitiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIiNcIiArIENhdGVnb3JpZXNUYklkKS5vbihcImNsaWNrXCIsIFwiLnRvb2dsZUJ0biAgXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGJ0biA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc05hbWVJY29uID0gYnRuLmhhc0NsYXNzKFwiZmEtdG9nZ2xlLW9uXCIpXHJcbiAgICAgICAgICAgICAgICA/IFwiZmEtdG9nZ2xlLW9uXCJcclxuICAgICAgICAgICAgICAgIDogXCJmYS10b2dnbGUtb2ZmXCI7XHJcbiAgICAgICAgICAgIHZhciB0ciA9IGJ0bi5jbG9zZXN0KFwidHJcIik7XHJcbiAgICAgICAgICAgIHZhciByb3dEYXRhVGFibGUgPSBtYWluT2JqLkdldERhdGF0YWJsZVJvdyhidG4pO1xyXG4gICAgICAgICAgICB2YXIgcm93RGF0YSA9IHJvd0RhdGFUYWJsZS5kYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc1R5cGUgPSBidG4uaGFzQ2xhc3MoY2F0ZWdvcnlDbGFzcy5hY3RpdmUpXHJcbiAgICAgICAgICAgICAgICA/IGNhdGVnb3J5Q2xhc3MuYWN0aXZlXHJcbiAgICAgICAgICAgICAgICA6IGNhdGVnb3J5Q2xhc3MuZGVBY3RpdmU7XHJcbiAgICAgICAgICAgIGJ0bi5zd2l0Y2hQZW5kaW5nU3RhdGUodHJ1ZSwgY2xhc3NOYW1lSWNvbik7XHJcbiAgICAgICAgICAgICQucG9zdChcIi9BZG1pbi9DYXRlZ29yeS9Ub2dnbGVBY3RpdmU/aWQ9XCIgKyByb3dEYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGEuaXNFbmFibGVkID0gIXJvd0RhdGEuaXNFbmFibGVkO1xyXG4gICAgICAgICAgICAgICAgcm93RGF0YVRhYmxlLmRhdGEocm93RGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uc3dpdGNoUGVuZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50b2dnbGVDbGFzcyhcImZhLXRvZ2dsZS1vbiBmYS10b2dnbGUtb2ZmXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcItmE2Kcg2YrZhdmD2YYg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqSDYp9mE2KfZhizZhNit2K/ZiNirINmF2LTZg9mE2Kkg2LnZhtivINin2YTYrtin2K/ZhVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItmE2YUg2YrYqtmFINiq2YbZgdmK2LAg2KfZhNi52YXZhNmK2KlcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIjXCIgKyBDYXRlZ29yaWVzVGJJZCkub24oXCJjbGlja1wiLCBcIi5zYXZlICBcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHRyID0gYnRuLmNsb3Nlc3QoXCJ0clwiKTtcclxuICAgICAgICAgICAgaWYgKCF0ci5oYXNDbGFzcyhcImNoYW5nZWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciByb3dEYXRhID0gbWFpbk9iai5HZXRSb3dEYXRhKGJ0bik7XHJcbiAgICAgICAgICAgIGJ0bi5wZW5kaW5nU3RhdGUodHJ1ZSwgXCJmYS1jaGVjay1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgICQucG9zdChcIi9BZG1pbi9DYXRlZ29yeS9VcGRhdGVcIiwge1xyXG4gICAgICAgICAgICAgICAgSWQ6IHJvd0RhdGEuaWQsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiByb3dEYXRhLm5hbWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1haW5PYmouU2VsZWN0Q2F0ZWdvcnlEYXRhTGlzdC5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmlkID09IHJvd0RhdGEuaWQ7IH0pLm5hbWUgPSByb3dEYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBtYWluT2JqLkNyZWF0ZUNhdGVnb3J5QnRuTGlzdCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgYnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YTYpyDZitmF2YPZhiDYqtmG2YHZitiwINin2YTYudmF2YTZitipINin2YTYp9mGLNmE2K3Yr9mI2Ksg2YXYtNmD2YTYqSDYudmG2K8g2KfZhNiu2KfYr9mFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi2YTZhSDZitiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgSGFuZGxlQWRkQ2F0ZWdvcnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBtYWluT2JqID0gdGhpcztcclxuICAgICAgICB0aGlzLmFkZENhdGVnb3J5QnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWVJbnAgPSAkKFwiI0NhdF9OYW1lXCIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IG5hbWVJbnAudmFsKCk7XHJcbiAgICAgICAgICAgIGlmICghKG5hbWVJbnAudmFsaWQoKSAmJiBuYW1lLmxlbmd0aCA+IDIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSAkKCdpbnB1dFtuYW1lPVwic3RhdGVcIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgc3VwZXJJZCA9IG1haW5PYmouc2VsZWN0Q2F0ZWdvcnlCdG4uZGF0YShcInN1cGVySWRcIikgfHwgbnVsbDtcclxuICAgICAgICAgICAgX3RoaXMuYWRkQ2F0ZWdvcnlCdG4ucGVuZGluZ1N0YXRlKHRydWUsIFwiZmEtY2hlY2tcIik7XHJcbiAgICAgICAgICAgICQucG9zdChcIi9BZG1pbi9DYXRlZ29yeS9BZGRcIiwge1xyXG4gICAgICAgICAgICAgICAgTmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIElzRW5hYmxlZDogc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBTdXBlcklkOiBzdXBlcklkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2KrZhdiqINin2LbYp9mB2Kkg2KfZhNmC2LPZhSDYqNmG2KzYp9itXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi2KrZhdiqINin2YTYp9i22KfZgdipXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWFpbk9iai5UYWJsZS5yb3dzLmFkZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLlNlbGVjdENhdGVnb3J5RGF0YUxpc3QucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLkNyZWF0ZUNhdGVnb3J5QnRuTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZENhdGVnb3J5QnRuLnBlbmRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBuYW1lSW5wLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBlLnJlc3BvbnNlSlNPTiAmJiBlLnJlc3BvbnNlSlNPTi5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgPyBlLnJlc3BvbnNlSlNPTi5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcItmE2Kcg2YrZhdmD2YYg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqSDYp9mE2KfZhizZhNit2K/ZiNirINmF2LTZg9mE2Kkg2LnZhtivINin2YTYrtin2K/ZhVwiO1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi2YTZhSDZitiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgVGFibGU6IChmdW5jdGlvbiAobGlzdFVybCkge1xyXG4gICAgICAgIHJldHVybiAkKFwiI1wiICsgQ2F0ZWdvcmllc1RiSWQpLkRhdGFUYWJsZSh7XHJcbiAgICAgICAgICAgIGFqYXg6IHtcclxuICAgICAgICAgICAgICAgIHVybDogbGlzdFVybCxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29sdW1uczogY29sdW1ucyxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlcyxcclxuICAgICAgICAgICAgcGFnZUxlbmd0aDogMyxcclxuICAgICAgICAgICAgbGVuZ3RoTWVudTogWzMsIDUsIDEwLCAxNSwgMjAsIDUwLCAxMDBdLFxyXG4gICAgICAgICAgICBpbmZvOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBjcmVhdGVkUm93OiBmdW5jdGlvbiAocm93Tm9kZSwgcm93RGF0YSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIEhhbmRsZU9uUm93Q3JlYXRlZChyb3dOb2RlLCByb3dEYXRhLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pKFwiL0FkbWluL0NhdGVnb3J5L0xpc3RcIiksXHJcbiAgICBNYWtlRHJvcERvd25NZW51OiBmdW5jdGlvbiAoZGF0YSwgU3VwZXJJZCkge1xyXG4gICAgICAgIGlmIChTdXBlcklkID09PSB2b2lkIDApIHsgU3VwZXJJZCA9IG51bGw7IH1cclxuICAgICAgICB2YXIgRWxzQ29udGFpbmVyID0gJCgpO1xyXG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIGlmIChjYXRlZ29yeS5zdXBlcklkICE9IFN1cGVySWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xyXG4gICAgICAgICAgICBpZiAoY2F0ZWdvcnkuc3Vicy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKFwiPGxpPjxhIHRhYmluZGV4PVxcXCItMVxcXCI+XCIgKyBjYXRlZ29yeS5uYW1lICsgXCI8L2E+PC9saT5cIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGEoXCJpZFwiLCBjYXRlZ29yeS5pZCkuZGF0YShcIm5hbWVcIiwgY2F0ZWdvcnkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBFbHNDb250YWluZXIgPSBFbHNDb250YWluZXIuYWRkKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKFwiPGxpIGNsYXNzPVxcXCJkcm9wZG93blxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJzdWIgZHJvcGRvd24tdG9nZ2xlXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIHRhYmluZGV4PVxcXCItMVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArIGNhdGVnb3J5Lm5hbWUgKyBcIiA8c3BhbiBjbGFzcz1cXFwiY2FyZXRcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgU3ViTWVudSA9ICQoXCI8dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgc3ViTWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XFxcIiByb2xlPVxcXCJtZW51XFxcIiBzdHlsZT1cXFwiZGlzcGxheTogbm9uZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBTdWJMaXN0ID0gdGhpc18xLlNlbGVjdENhdGVnb3J5RGF0YUxpc3QuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXRlZ29yeS5zdWJzLmluZGV4T2YoaXRlbS5pZCkgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFN1Yk1lbnUuYXBwZW5kKHRoaXNfMS5NYWtlRHJvcERvd25NZW51KFN1Ykxpc3QsIGNhdGVnb3J5LmlkKSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZChTdWJNZW51KTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YShcImlkXCIsIGNhdGVnb3J5LmlkKTtcclxuICAgICAgICAgICAgICAgIEVsc0NvbnRhaW5lciA9IEVsc0NvbnRhaW5lci5hZGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgZGF0YV8xID0gZGF0YTsgX2kgPCBkYXRhXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeSA9IGRhdGFfMVtfaV07XHJcbiAgICAgICAgICAgIF9sb29wXzEoY2F0ZWdvcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRWxzQ29udGFpbmVyO1xyXG4gICAgfSxcclxuICAgIEhhbmRsZURyb3BEb3duTWVudTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtYWluT2JqID0gdGhpcztcclxuICAgICAgICAkKFwiLmRyb3Bkb3duIGEuc3ViLC5kcm9wdXAgYS5zdWJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAubmV4dChcInVsXCIpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbGVjdENhdGVnb3J5QnRuXHJcbiAgICAgICAgICAgIC5maW5kKFwibGlcIilcclxuICAgICAgICAgICAgLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIilcclxuICAgICAgICAgICAgLm5vdChcIi5kcm9wZG93blwiKVxyXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBtYWluT2JqLnNlbGVjdENhdGVnb3J5QnRuLmZpbmQoXCJidXR0b24gLnRleHRcIikudGV4dChlbC5kYXRhKFwibmFtZVwiKSk7XHJcbiAgICAgICAgICAgIGVsLnBhcmVudHMoXCIuc3ViTWVudVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIG1haW5PYmouc2VsZWN0Q2F0ZWdvcnlCdG4uZGF0YShcInN1cGVySWRcIiwgZWwuZGF0YShcImlkXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBDcmVhdGVDYXRlZ29yeUJ0bkxpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBFbHNDb250YWluZXIgPSAkKCk7XHJcbiAgICAgICAgJC5nZXQoXCIvQWRtaW4vQ2F0ZWdvcnkvSXRlbXNMaXN0XCIpLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBfdGhpcy5TZWxlY3RDYXRlZ29yeURhdGFMaXN0ID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIF90aGlzLnNlbGVjdENhdGVnb3J5QnRuXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIi5kcm9wZG93bi1tZW51XCIpXHJcbiAgICAgICAgICAgICAgICAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZChfdGhpcy5NYWtlRHJvcERvd25NZW51KHJlc3VsdC5kYXRhKSk7XHJcbiAgICAgICAgICAgIF90aGlzLkhhbmRsZURyb3BEb3duTWVudSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIG1haW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLkNyZWF0ZUNhdGVnb3J5QnRuTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuRGF0YVRhYmxlc1tDYXRlZ29yaWVzVGJJZF0gPSB0aGlzLlRhYmxlO1xyXG4gICAgICAgIHRoaXMuSGFuZGxlQ29udHJvbHNCdG5zKCk7XHJcbiAgICAgICAgdGhpcy5IYW5kbGVBZGRDYXRlZ29yeSgpO1xyXG4gICAgfVxyXG59O1xyXG52YXIgYiA9IHsgYTogMTAsIE9uUHJvcGVydHlDaGFuZ2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpc18yLCBwcm9wLCB7XHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyB2YWx1ZSBpcyAnICsgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXSA9IHY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRoaXNfMiA9IHRoaXM7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzKSB7XHJcbiAgICAgICAgICAgIF9sb29wXzIocHJvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSB9O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoYiwgXCJhaG1lZFwiLCB7XHJcbiAgICB2YWx1ZTogXCJ3YWxlZWRcIixcclxuICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgfVxyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2F0ZWdvcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZGVjbGFyYXRpb24uZC50c1wiIC8+XHJcbnJlcXVpcmUoXCIuLi9BZG1pbi9Bc3Nlc3RzL0Jvb3RzdHJhcENvbXBvbmVudHMvYm9vdHN0cmFwTm90aWZ5XCIpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJC5mbi5wZW5kaW5nU3RhdGUgPSBmdW5jdGlvbiAoaXNQZW5kaW5nLCByZW1vdmVkQ2xhc3MsIGFuaW1hdGluZ0NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpbmdDbGFzcylcclxuICAgICAgICAgICAgYW5pbWF0aW5nQ2xhc3MgPSBcImZhLXNwaW5uZXIgZmEtc3BpblwiO1xyXG4gICAgICAgIGlmIChyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YShcImNsYXNzXCIsIHJlbW92ZWRDbGFzcyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZW1vdmVkQ2xhc3MgPSB0aGlzLmRhdGEoXCJjbGFzc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIikudG9nZ2xlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmIChpc1BlbmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kKFwiaVwiKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHJlbW92ZWRDbGFzcylcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmQoXCJpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MocmVtb3ZlZENsYXNzKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGFuaW1hdGluZ0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5zd2l0Y2hQZW5kaW5nU3RhdGUgPSBmdW5jdGlvbiAoaXNQZW5kaW5nLCByZW1vdmVkQ2xhc3MsIGFuaW1hdGluZ0NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpbmdDbGFzcylcclxuICAgICAgICAgICAgYW5pbWF0aW5nQ2xhc3MgPSBcImZhLXNwaW5uZXIgZmEtc3BpblwiO1xyXG4gICAgICAgIGlmIChyZW1vdmVkQ2xhc3MpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YShcImNsYXNzXCIsIHJlbW92ZWRDbGFzcyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZW1vdmVkQ2xhc3MgPSB0aGlzLmRhdGEoXCJjbGFzc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIikudG9nZ2xlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmIChpc1BlbmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhyZW1vdmVkQ2xhc3MpLmFkZENsYXNzKGFuaW1hdGluZ0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MocmVtb3ZlZENsYXNzKS5yZW1vdmVDbGFzcyhhbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuY29uZmlybU5vdGlmeSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbmZpcm1UZW1wbGF0ZSA9IFwiXFxuICAgICAgICAgICAgPGRpdiBkYXRhLW5vdGlmeT1cXFwiY29udGFpbmVyXFxcIiBcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImNvbC14cy0xMSBjb2wtc20tNCBhbGVydCBhbGVydC1pbmZvIGFsZXJ0LXdpdGgtaWNvbiBhbmltYXRlZCBmYWRlSW5Eb3duIGJvb3RzdHJhcE5vdGlmeVxcXCJcXG4gICAgICAgICAgICAgICAgcm9sZT1cXFwiYWxlcnRcXFwiIGRhdGEtbm90aWZ5LXBvc2l0aW9uPVxcXCJ0b3AtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtbm90aWZ5PVxcXCJkaXNtaXNzXFxcIj5cXHUwMEQ3PC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtbm90aWZ5PVxcXCJpY29uXFxcIiBjbGFzcz1cXFwicGUtN3MtY2hlY2tcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1ub3RpZnk9XFxcInRpdGxlXFxcIj48L3NwYW4+IFxcbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLW5vdGlmeT1cXFwibWVzc2FnZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGV4dC1jZW50ZXIgY29uZmlybUNvbnRyb2xzXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tc21cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICBcXHUwNjJBXFx1MDYyM1xcdTA2NDNcXHUwNjRBXFx1MDYyRlxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jbG9zZVxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgXFx1MDYyN1xcdTA2NDRcXHUwNjNBXFx1MDYyN1xcdTA2MjFcXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGRhdGEtbm90aWZ5PVxcXCJ1cmxcXFwiPjwvYT5cXG4gICAgICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIG9uQ29uZmlybSkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAkKGNvbmZpcm1UZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sc2J0biA9IHRlbXBsYXRlLmZpbmQoXCIuY29uZmlybUNvbnRyb2xzIGJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY29udHJvbHNidG5cclxuICAgICAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoXCJyZXN1bHRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmVxKDEpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShcInJlc3VsdFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlLmZpbmQoJ3NwYW5bZGF0YS1ub3RpZnk9XCJtZXNzYWdlXCJdJykudGV4dChtZXNzYWdlKTtcclxuICAgICAgICAgICAgY29udHJvbHNidG4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlybS5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBvbkNvbmZpcm0oJCh0aGlzKS5kYXRhKFwicmVzdWx0XCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjb25maXJtID0gJC5ub3RpZnkoe30sIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChkb0FueUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb0FueUFjdGlvbiA9PT0gdm9pZCAwKSB7IGRvQW55QWN0aW9uID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb0FueUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aW1lcjogNDAwMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG4gICAgJC5mbi5hZGRQYXNzd29yZFNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBhc3N3b3JkSW5wID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAocGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIikgIT0gXCJwYXNzd29yZFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFzc3dvcmRJbnA7XHJcbiAgICAgICAgdmFyIGV5ZUljb24gPSAkKCc8aSBjbGFzcz1cImZhIGZhLWV5ZSBmYS1sZ1wiPjwvaT4nKTtcclxuICAgICAgICBwYXNzd29yZElucC5hZnRlcihleWVJY29uKTtcclxuICAgICAgICB2YXIgdG9wT2Zmc2V0ID0gcGFzc3dvcmRJbnAub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgIHBhc3N3b3JkSW5wLmhlaWdodCgpIC8gMjtcclxuICAgICAgICBleWVJY29uXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICBsZWZ0OiBcIjElXCIsXHJcbiAgICAgICAgICAgIHRvcDogXCJjYWxjKDEwMCUgLSBcIiArIHRvcE9mZnNldCArIFwicHgpXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiMzMzdhYjdcIixcclxuICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwYXNzd29yZElucC5hdHRyKFwidHlwZVwiKSA9PSBcInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgID8gcGFzc3dvcmRJbnAuYXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICA6IHBhc3N3b3JkSW5wLmF0dHIoXCJ0eXBlXCIsIFwicGFzc3dvcmRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhc3N3b3JkSW5wO1xyXG4gICAgfTtcclxuICAgICQuZm4uYWpheFN1Ym1pdCA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgSXNTdHJpbmdGaWFibGUsIGNvbXBsZXRlLCBiZWZvcmVTZW5kKSB7XHJcbiAgICAgICAgaWYgKElzU3RyaW5nRmlhYmxlID09PSB2b2lkIDApIHsgSXNTdHJpbmdGaWFibGUgPSB0cnVlOyB9XHJcbiAgICAgICAgdmFyIG9iamVjdERhdGEgPSB7fTtcclxuICAgICAgICBpZiAoISQodGhpcykudmFsaWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmZpbmQoXCJpbnB1dFwiKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoaSwgaW5wKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoaW5wKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5wdXQudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09IFwiZmFsc2VcIilcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKHZhbHVlID09IFwidHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPT0gXCJmYWxzZVwiID8gZmFsc2UgOiB2YWx1ZTtcclxuICAgICAgICAgICAgb2JqZWN0RGF0YVtpbnB1dC5hdHRyKFwibmFtZVwiKV0gPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb21wbGV0ZSgkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSXNTdHJpbmdGaWFibGUgPyBKU09OLnN0cmluZ2lmeShvYmplY3REYXRhKSA6IG9iamVjdERhdGEsXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgb2JqZWN0RGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5yZXNldFBhc3N3b3JkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKFwiXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4udG9nZ2xlQXR0ciA9IGZ1bmN0aW9uIChhdHRyKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wKGF0dHIpID8gdGhpcy5yZW1vdmVBdHRyKGF0dHIpIDogdGhpcy5wcm9wKGF0dHIsIGF0dHIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICQuZm4uZm9ybUFsZXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmb3JtQWxlcnQgPSB0aGlzLmZpbmQoXCIuZm9ybUFsZXJ0XCIpXHJcbiAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuZmluZChcImlucHV0XCIpLmZvY3VzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9ybUFsZXJ0LmZhZGVPdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybUFsZXJ0O1xyXG4gICAgfTtcclxuICAgICQubm90aWZ5Q2F0Y2ggPSBmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi2YTZhSDZitiq2YUg2KrZhtmB2YrYsCDYp9mE2LnZhdmE2YrYqSAs2YTZiNis2YjYr9mF2LTZg9mE2Kkg2YHZiSDYp9mE2K7Yp9iv2YUs2K3Yp9mI2YQg2YXYsdipINin2K7YsdmJXCI7XHJcbiAgICAgICAgdmFyIG5vdGlmeU1lc3NhZ2UgPSBtb2RlbCAmJiBtb2RlbC5tZXNzYWdlID8gbW9kZWwubWVzc2FnZSA6IG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuICQubm90aWZ5KHsgbWVzc2FnZTogbm90aWZ5TWVzc2FnZSwgdGl0bGU6IFwi2YTZgtivINmB2LTZhNiqINin2YTYudmF2YTZitipXCIgfSk7XHJcbiAgICB9O1xyXG4gICAgJC5VcGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChCdG5IYW5kbGVyLCBPbkdvdEltZ0ZpbGUpIHtcclxuICAgICAgICB2YXIgYnRuQ29udGV4dDtcclxuICAgICAgICB2YXIgaW5wdXQgPSAkKFwiPGlucHV0IHR5cGU9J2ZpbGUnIGFjY2VwdD0naW1hZ2UvKicgaWQ9J3VwbG9hZEltZycgY2xhc3M9XFxcImhpZGRlblxcXCIvPlwiKTtcclxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgQnRuSGFuZGxlci5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xyXG4gICAgICAgICAgICBidG5Db250ZXh0ID0gJChlLnRhcmdldCkucGFyZW50cygnLkNvdXJzZUNhcmRUZW1wbGF0ZTplcSgwKScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0gXCIuXCIgKyBmaWxlLm5hbWUuc3BsaXQoXCIuXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoXCJpbWFnZVwiKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgJC5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi2YfYsNipINin2YTZhtmI2LnZitipINmF2YYg2KfZhNi12YjYsSDYutmK2LEg2YXYr9i52YjZhdipXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9uR290SW1nRmlsZS5iaW5kKGJ0bkNvbnRleHQpKGZpbGUsIGV4dGVuc2lvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgJC5mbi5TaG93bk9ubHlJZkNoZWNrZWQgPSBmdW5jdGlvbiAoVGFyZ2V0Q2hlY2tlZElucHV0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBUYXJnZXRDaGVja2VkSW5wdXQuaXMoJzpjaGVja2VkJylcclxuICAgICAgICAgICAgPyB0aGlzLnNob3coKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLnNob3coKVxyXG4gICAgICAgICAgICA6IHRoaXMuaGlkZSgpLnBhcmVudHMoJy5mb3JtLWdyb3VwOmVxKDApJykuaGlkZSgpO1xyXG4gICAgICAgIFRhcmdldENoZWNrZWRJbnB1dC5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoKS5wYXJlbnRzKCcuZm9ybS1ncm91cDplcSgwKScpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxufSkoKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVyRG9tZS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9