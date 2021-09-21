import "../../../global/helperDome";
import { Category, CategoryListItem, CommonUi, Course } from '../Shared/CommonUI';
$(function () {
    AddCourseOperations.main();
    GetCoursesOperations.main();  
});
interface IAddCourseOperations {
    SelectCategoryDataList: CategoryListItem[],
    selectCategoryBtn: JQuery,
    CategoryIdInp: JQuery,
    AddCourseBtn: JQuery,
    AddCourseForm: JQuery,
    NotNowBtn: JQuery,
    GetCategoryNameById(is: string): string
    MakeDropDownMenuForCategories(data: CategoryListItem[], SuperId?:null): JQuery<HTMLElement>,
    HandleDropDownMenu(): void,
    CreateCategoryBtnList(): void,
    HandleAddCourseSubmit(): void,
    ResetDropdownMenu(): void,
    ResetAddCourseForm(): void,
    HandleToggleBtn(): void,
    HandleSomeFormOperations(): void,
    main(): void
}
interface IGetCoursesOperations {
    CurrentSelectedUpdatableCard: JQuery,
    CoursesCount: number,
    CoursesSection: JQuery,
    CourseCountText: JQuery,
    EditCourseModal: JQuery,
    GetCoursesUrl: string,
    DeleteCourseUrl: string,
    EditCourseUrl: string,
    CourseCardTemplate: JQuery,
    EditCourseImgBgUrl: string,
    CardImgBaseUrl: string,
    CourseCard: JQuery
    EditCourse: JQuery,
    EditCourseForm: JQuery,
    EditBgImgBtn: JQuery,
    EditCourseSubmitBtn: JQuery,
    loadingIcon: JQuery,
    HandleOnCardImgChange():void,
    DesignCourseCard(course: Course): JQuery,
    EditDesignCourseCard(course: Course, template: JQuery):void,
    DrawCourses(courses: Course[]) :void,
    GetCourses() :void,
    Refresh() :void,
    HandleDesignCardOperations() :void,
    ToggleFormForModal():void,
    FormatDateTo_yyyy_mm_dd(dateStr: string): string ,
    BindDataToTargetForm(TargetForm: JQuery < HTMLFormElement >, data: Course):void,
    HandleOnCourseUD() :void,
    HandleModals() :void,
    main():void
}
class CommonFuncs{
    public static OnAddCourseFormSubmitted = function (this: IAddCourseOperations,
        e: JQuery.ClickEvent<HTMLElement, undefined, any, any>): void {
        if (!this.AddCourseForm.valid()) return;
        this.AddCourseForm.ajaxSubmit('/Admin/Courses/Add', 'POST', false, (def, model) => {
            def.done(id => {
                $.notify({ message: "تم اضافة الكورس بنجاح" });
                this.ResetAddCourseForm();
                GetCoursesOperations.Refresh();
            }).catch(e => {
                $.notifyCatch(e.responseJSON);
            }).always(e => {
                this.AddCourseBtn.pendingState(false);
            })
        }, () => { this.AddCourseBtn.pendingState(true, 'fa-plus'); });
    }
    public static OnEditCourseFormSubmitted = function (this: IGetCoursesOperations,
        e: JQuery.ClickEvent<HTMLElement, undefined, any, any>): void {
        if (!this.EditCourseForm.valid()) return;
        this.EditCourseForm.ajaxSubmit('/Admin/Courses/Edit', 'POST', false, (def, model) => {
            def.done(() => {
                let Model: Course = {} as Course;
                for (let prop in model) {
                    let Prop = prop.charAt(0).toLocaleLowerCase() + '' + prop.slice(1);
                    (Model as any)[Prop] = model[prop];
                }
                Model.categoryName = AddCourseOperations.GetCategoryNameById(Model.categoryId);
                $.notify({ message: "تم تعديل الكورس بنجاح", target: "#EditCourseModal" }, { z_index: 999999999 });
                this.EditDesignCourseCard(Model as Course, this.CurrentSelectedUpdatableCard);
                //GetCoursesOperations.Refresh();
            }).catch(e => {
                $.notifyCatch(e.responseJSON);
                }).always(e => {
                    this.EditCourseSubmitBtn.pendingState(false);
                })
        }, () => { this.EditCourseSubmitBtn.pendingState(true, 'fa-edit'); });
    }
}
let AddCourseOperations: IAddCourseOperations = {
  SelectCategoryDataList: [] as CategoryListItem[],
  selectCategoryBtn: $("#Categories"),
  CategoryIdInp: $("#CategoryId"),
  AddCourseBtn: $("#AddCourseBtn"),
    AddCourseForm: $("#AddCourse form:eq(0)"),
    NotNowBtn: $('.notNowBtn'),
    GetCategoryNameById(id: string): string{
        let superId = (this.SelectCategoryDataList.find(v => v.id == id) as CategoryListItem).superId;
        return superId == null
            ? (this.SelectCategoryDataList.find(v => v.id == id) as CategoryListItem).name
            : `${(this.SelectCategoryDataList.find(v => v.id == superId) as CategoryListItem).name}/
               ${(this.SelectCategoryDataList.find(v => v.id == id) as CategoryListItem).name}`;
    },
    MakeDropDownMenuForCategories: function(
    data: CategoryListItem[],
    SuperId: null = null
    ): JQuery<HTMLElement> {
    let ElsContainer = $();
    for (let category of data) {
        if (category.superId != SuperId) continue;
        if (category.subs.length == 0) {
        let item = $(`<li><a tabindex="-1">${category.name}</a></li>`);
        item.data("id", category.id).data("name", category.name);
        ElsContainer = ElsContainer.add(item);
        } else {
            let item = $(`<li class="dropup">
                        <a class="sub dropdown-toggle" data-toggle="dropdown" tabindex="-1">
                            ${category.name} <span class="caret"></span>
                        </a>
                    </li>`);
        let SubMenu = $(`<ul class="dropdown-menu subMenu dropdown-menu-right" role="menu" style="display: none">
                        </ul>`);
        let SubList: CategoryListItem[] = this.SelectCategoryDataList.filter(
            (item, index) => {
            if (category.subs.indexOf(item.id) >= 0) return item;
            }
        );
            SubMenu.append(this.MakeDropDownMenuForCategories(SubList, category.id as any));
        item.append(SubMenu);
        item.data("id", category.id);
        ElsContainer = ElsContainer.add(item);
        }
    }
    return ElsContainer;
    },
    HandleDropDownMenu() {
    let mainObj = this;
    $(".dropdown a.sub,.dropup a.sub").on("click", function(e) {
        $(this)
        .next("ul")
        .toggle();
        e.stopPropagation();
        e.preventDefault();
    });
        this.selectCategoryBtn
        .data('text','اختر القسم')
        .find("li")
        .css("cursor", "pointer")
        .not(".dropdown")
        .on("click", function(e) {
        let el = $(this);
        mainObj.selectCategoryBtn.find("button .text").text(el.data("name"));
        el.parents(".subMenu").hide();
        mainObj.CategoryIdInp.val(el.data("id"));
        mainObj.AddCourseForm.valid();
        });
    },
    CreateCategoryBtnList() {
    let ElsContainer = $();
    $.get("/Admin/Category/ItemsList").done(result => {
        this.SelectCategoryDataList = result.data;
        this.selectCategoryBtn
        .find(".dropdown-menu")
        .empty()
            .append(this.MakeDropDownMenuForCategories(result.data));
        this.HandleDropDownMenu();
    });
    },
    HandleAddCourseSubmit() {
        this.AddCourseForm.data("validator").settings.ignore = "[Name='Id']";
        $("body").on('click', '#AddCourseBtn', CommonFuncs.OnAddCourseFormSubmitted.bind(this));
    },
    ResetDropdownMenu() {
        this.selectCategoryBtn.find('.text').text(this.selectCategoryBtn.data('text'));
    },
    ResetAddCourseForm() {
        this.AddCourseForm.find('input:not(#Id)').val('');
        $('#IsOpened').val('false');
        $('.toogleBtn:eq(0)').removeClass("fa-toggle-on").addClass('fa-toggle-off');
        this.ResetDropdownMenu();
    },
    HandleToggleBtn() {
    this.AddCourseForm.find(".toogleBtn:eq(0)").click(e => {
        let iconbtn = $(e.target);
        iconbtn.toggleClass("fa-toggle-on fa-toggle-off");
        let text = "",
        isOpened = false;
        if (iconbtn.hasClass("fa-toggle-on")) {
        text = "الكورس متاح الان";
        isOpened = true;
        } else {
        text = "الكورس غير متاح الان";
        isOpened = false;
        }
        this.AddCourseForm.find(".toggleText:eq(0)").text(text);
        $("#IsOpened").val(`${isOpened}`);
    });
    },
    HandleSomeFormOperations() {
        this.AddCourseForm.find('input').each(function (i, el){
            let input = $(this); 
            if (input.prop('id') == "CostOfCourse") {
                input.data('prompt', input.prop('placeholder'));
                input.data('notnow', 'لم تحدد التكلفة الان')
            } 
            if (input.prop('id') == "Period") {
                input.data('prompt', input.prop('placeholder'));
                input.data('notnow', 'لم تحدد المدة الان')
            }
            if (input.prop('id') == "StartDateOfBegin") {
                input.data('prompt', input.prop('placeholder'));
                input.data('notnow','لم يحدد موعد بداية الكورس الان')
            }
            if (input.is('[type="date"]')) {
                input.addClass('withDate');
            }
        });
        CommonUi.NotInputForBtnNow(this.NotNowBtn);
    },
    main() {
    this.HandleToggleBtn();
    this.HandleAddCourseSubmit();
      this.CreateCategoryBtnList();
        this.HandleSomeFormOperations();
  }
};
let GetCoursesOperations: IGetCoursesOperations = {
    CurrentSelectedUpdatableCard: $(),
    CoursesCount: 0,
    CoursesSection: $('#GetCourses .courses'),
    CourseCountText: $('.CourcesCount .count:eq(0)'),
    EditCourseModal: $('#EditCourseModal'),
    GetCoursesUrl: '/Admin/Courses/List',
    DeleteCourseUrl: '/Admin/Courses/Delete',
    EditCourseUrl: '/Admin/Courses/Edit',
    EditCourseImgBgUrl: '/Admin/Courses/EditBgImg',
    CardImgBaseUrl:'/images/admin/courses/',
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
    DesignCourseCard(course: Course): JQuery{
        let template = this.CourseCardTemplate.clone(true).removeClass('hidden');
        template.data('course', course);
        let costText = course.costOfCourse ? `سعر الكورس ${course.costOfCourse} جنية` : 'سعر الكورس غير محدد';
        let DateText = course.startDateOfBegin ? `يبدأ من ${new Date(course.startDateOfBegin).toLocaleDateString()}`
            : `لم يحدد تاريخ بداية الكورس`;
        let periodText = course.period ? course.period : `لم تحددة مدة الكورس`;
        let statusText = course.isOpened ? "الكورس متاح حاليا" : "الكورس غير متاح حاليا";
        template.find('.Name:eq(0)').text(course.name);
        template.find('.Desc:eq(0)').text(course.description).prop('title', course.description);
        template.find('.Category:eq(0)').text(`قسم ${course.categoryName}`).data('id', course.categoryId);
        template.find('.Cost:eq(0)').text(costText);
        template.find('.Date:eq(0)').text(DateText);
        template.find('.IsOpened:eq(0)').text(statusText);
        template.find('.Period:eq(0)').text(periodText);
        template.find('.videoCount:eq(0)').text(course.videosCount);
        if (course.backgroundImgSrc)
            template.find('img:eq(0)').attr('src', `/images/admin/courses/${course.backgroundImgSrc}`);
        template.find('a.content').prop('href', `/Admin/Courses/Content?id=${course.id}`);
        return template;
    },
    EditDesignCourseCard(course: Course, template: JQuery) {
        template.data('course', course);
        let costText = course.costOfCourse ? `سعر الكورس ${course.costOfCourse} جنية` : 'سعر الكورس غير محدد';
        let DateText = course.startDateOfBegin ? `يبدأ من ${new Date(course.startDateOfBegin).toLocaleDateString()}`
            : `لم يحدد تاريخ بداية الكورس`;
        let periodText = course.period ? course.period : `لم تحددة مدة الكورس`;
        let statusText = course.isOpened ? "الكورس متاح حاليا" : "الكورس غير متاح حاليا";
        template.find('.Name:eq(0)').text(course.name);
        template.find('.Desc:eq(0)').text(course.description).prop('title', course.description);;
        template.find('.Category:eq(0)').text(`قسم ${course.categoryName}`).data('id', course.categoryId);
        template.find('.Cost:eq(0)').text(costText);
        template.find('.Date:eq(0)').text(DateText);
        template.find('.IsOpened:eq(0)').text(statusText);
        template.find('.Period:eq(0)').text(periodText);
        template.find('.videoCount:eq(0)').text(course.videosCount);
        if (course.backgroundImgSrc)
            template.find('img:eq(0)').attr('src', `/images/admin/courses/${course.backgroundImgSrc}`);
    },
    DrawCourses(courses: Course[]) {
        this.CoursesCount = courses.length;
        this.CourseCountText.text(this.CoursesCount);
        this.CoursesSection.empty();
        let coursesContainer = $();
        for (let c of courses)
            coursesContainer = coursesContainer.add(this.DesignCourseCard(c));
        this.CoursesSection.append(coursesContainer);
    },
    GetCourses() {
         $.get(this.GetCoursesUrl).done(data => {
            this.DrawCourses(data);
        }).catch(e => {
            $.notify({ message: "تعذر عملية تحميل البيانات من الخادم" });
        }).always(() => {
            this.loadingIcon.hide();
        });       
    },
    Refresh() {
        this.GetCourses();
    },
    HandleDesignCardOperations() {
        let showInfoIcon = this.CourseCard.find('.showInfo');
        this.CourseCard.on('click', '.details', function () {
            let showInfoIcon = $(this);
            let designParent = showInfoIcon.parents('.CourseCardTemplate');
            let cardInfo = designParent.find('.courseInfo:eq(0)');
            cardInfo.css({top:0});
        })
            .on('click', '.closeInfo', function () {
                $(this).parents('.courseInfo').css({top:'-100%'})
        })
    },
    ToggleFormForModal() {       
        if ($('#EditCourse').hasClass('noForm')) {
            AddCourseOperations.ResetAddCourseForm();
            let form = $("#AddCourse form:eq(0)").detach();
            form.find('#AddCourseBtn').attr('id', 'EditCourseBtn')
                .find('i').removeClass('fa-plus').addClass('fa-edit').end()
                .find('.text').text('حفظ');
            $('#EditCourse').append(form);
            $('#EditCourse').removeClass('noForm');
        }
        else {
            let form = $("#EditCourse form:eq(0)").detach();
            form.find('#EditCourseBtn').attr('id', 'AddCourseBtn')
                .find('i').addClass('fa-plus').removeClass('fa-edit').end()
                .find('.text').text('اضافة');
            $("#AddCourse").append(form);
            $('#EditCourse').addClass('noForm');
            AddCourseOperations.ResetAddCourseForm();
        }
    },
    FormatDateTo_yyyy_mm_dd(dateStr: string): string {
        let date = new Date(dateStr);
        let mm = date.getMonth() + 1 as any as string;
        mm = ((mm as any as number) > 9) ? mm : `0${mm}`;
        let dd = date.getDate() as any as string;
        dd = ((dd as any as number) > 9) ? dd : `0${dd}`;
        return dateStr = `${date.getFullYear()}-${mm}-${dd}`;
    },
    BindDataToTargetForm(TargetForm: JQuery<HTMLFormElement>, data: Course) {
        let dateStr = data.startDateOfBegin ? this.FormatDateTo_yyyy_mm_dd(data.startDateOfBegin) : "";
        $('#EditCourse #Categories .text').text(data.categoryName);
        let statusText = "", RemoveToggleClass = "",AddToggleClass="";
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
        for (let item in data) {
            let Uitem = item.charAt(0).toUpperCase() + item.slice(1);
            if (Uitem == "StartDateOfBegin") {
                TargetForm.find(`#StartDateOfBegin`).val(dateStr);
                continue;
            }
            TargetForm.find(`#${Uitem}`).val((data as any)[item]);
        }
    },
    HandleOnCourseUD() {
        let mainObject = this;
        this.CourseCard.on('click', '.deleteCourse', function () {
            $.confirmNotify("عند حذف الكورس سيتم حذف كل الفيديوهاتالمتعلقة به,هل تريد الحذف", IsConfimed => {
                if (!IsConfimed) return;
                let btn = $(this);
                let card = $(this).parents('.CourseCardTemplate');
                let id = card.data('course').id;  
                btn.pendingState(true, 'fa-remove');
                $.post(`${mainObject.DeleteCourseUrl}?Id=${id}`).done(() => {
                    btn.pendingState(false);
                    card.fadeOut();
                    mainObject.CoursesCount = mainObject.CoursesCount - 1;
                    mainObject.CourseCountText.text(mainObject.CoursesCount);
                }).catch(e => {
                    $.notifyCatch(e);
                })
                
            });
        });
        $("body").on('click', '#EditCourseBtn', CommonFuncs.OnEditCourseFormSubmitted.bind(this));
        this.CourseCard.on('click', '.editCourse', function () {
            mainObject.ToggleFormForModal();
            $('#EditCourseModal').modal('show');
            let card = $(this).parents('.CourseCardTemplate');
            let data = card.data('course') as Course;
            mainObject.CurrentSelectedUpdatableCard = card;
            mainObject.BindDataToTargetForm($('#EditCourse form:eq(0)'), data);           
        });
    },
    HandleModals() {
        $(document.body).append(this.EditCourseModal.clone(true));
        this.EditCourseModal.remove();
        $(document.body).on('hide.bs.modal', '#EditCourseModal', () => {
            this.ToggleFormForModal();
        })
    },
    HandleOnCardImgChange() {
        let id = "";
        let mainObject = this;
        let formData: FormData;
        $.UploadImage(this.EditBgImgBtn, function (this: JQuery, file: File, ext: string) {
            id = (this.data('course') as Course).id;
            let Name = `${Date.now()}${ext}`;
            formData = new FormData();
            formData.append("Id", id);
            formData.append("Name", Name);   
            formData.append("Image", file);
            let icon = this.find('i.EditBcImg:eq(0)');
            icon.switchPendingState(true, "fa-picture-o");
            $.ajax({
                url:mainObject.EditCourseImgBgUrl,
                data: formData,
                method: "POST",
                processData: false,
                cache: false,
                contentType: false
            })
            .done(() => {
                this.find('img:eq(0)').prop('src', `${mainObject.CardImgBaseUrl}${Name}`)
                $.notify({
                    message: "تم حفظ الصورة بنجاح"
                });
            })
                .always(() => {
                    icon.switchPendingState(false);
            })
            .catch(e => {
                $.notify({
                    message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
                });
            });
        });        
    },
    main() {
        this.GetCourses();
        this.HandleDesignCardOperations();
        this.HandleOnCourseUD();
        this.HandleModals();
        this.HandleOnCardImgChange();
    }
}
