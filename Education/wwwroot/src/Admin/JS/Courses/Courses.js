"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../global/helperDome");
var CommonUI_1 = require("../Shared/CommonUI");
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