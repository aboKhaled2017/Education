import "../../../global/helperDome";
import "../../../global/Extensions/NumberExten";
import "../../../global/Extensions/JavascriptExt";
import "../../../global/Extensions/AjaxExte";
import "../../../global/Extensions/JqueryExten";
import { CommonUi } from "../Shared/CommonUI";
import {  CategoryListItem, Course, ICourse } from '../Shared/Interfaces';
import { Binding } from "../Shared/Bindings";
import { CommonFuncs } from "./SharedCoursesFuncs"; 
import { MainObjectOperForCourse } from "./_MainObjectOperForCourse";
import { AddCourseVideoTutorialsOper } from "./_AddCourseVideo";
import { CourseVideosTableOper } from "./_CourseVideosTable";
export let ContentOfCourseOprs = {
  SelectCategoryDataList: [] as CategoryListItem[],
  get DropdownUi() {
    return new CommonUi(this.selectCategoryBtn, this.CategoryIdInp);
  },
  selectCategoryBtn: $("#Categories"),
  CategoryIdInp: $("#CategoryId"),
  EditCourseForm: $("#EditCourse form:eq(0)"),
  submitBtn: $("#EditCourseBtn"),
  NotNowBtn: $(".notNowBtn"),
  ChangeImgBtn: $("#changeImage"),
  VideoCountText: $("#videoCountText"),
  HandleToggleBtn() {
    this.EditCourseForm.find(".toogleBtn:eq(0)").click(e => {
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
      this.EditCourseForm.find(".toggleText:eq(0)").text(text);
      $("#IsOpened")
        .val(`${isOpened}`)
        .triggerHandler("change");
    });
  },
  OnEditCourseFormSubmitted(Menu: any) {
    this.submitBtn.click(() => {
      if (!this.EditCourseForm.valid()) return;
      this.EditCourseForm.ajaxSubmit(
        "/Admin/Courses/Edit",
        "POST",
        false,
          (def, model) => {
          def
            .done(() => {
              let Model: Course = {} as Course;
              for (let prop in model) {
                let Prop =
                  prop.charAt(0).toLocaleLowerCase() + "" + prop.slice(1);
                (Model as any)[Prop] = model[prop];
              }
              Model.categoryName = CommonUi.GetFullCategoryNameById(
                Model.categoryId,
                Menu.SelectCategoryDataList
              );
              $.notify(
                { message: "تم تعديل الكورس بنجاح", target: "#EditCourse" },
                { z_index: 999999999 }
              );
            })
            .catch(e => {
              $.notifyCatch(e.responseJSON);
            })
            .always(e => {
              this.submitBtn.pendingState(false);
            });
        },
        () => {
          this.submitBtn.pendingState(true, "fa-edit");
        }
      );
    });
  },
  ExecuteBindings() {
        MainObjectOperForCourse.a = "ali"; 
        MainObjectOperForCourse.CourseDataController= Binding.controller<ICourse>('courseData', (scope) => {
            scope.VideosCount = this.VideoCountText.data('val');
        }, (value, prop) => {
            switch (prop) {
                case "CostOfCourse":
                    return value ? `${value} جنية` : `غير محددة`;
                case "Period":
                    return value ? `مدة الكورس : ${value}` : `مدة الكورس غير محددة`;
                case "StartDateOfBegin":
                    return value
                        ? `بداية انطلاق الكورس من ${new Date(value).toDateString()}`
                        : `تاريخ بداية الكورس غير محددة`;
                case "IsOpened":
                    return value == "true"
                        ? "الكورس متاح حاليا"
                        : "الكورس غير متاح حتى الان";
                case "CategoryId":
                    return `قسم ${CommonUi.GetFullCategoryNameById(
                        value,
                        this.SelectCategoryDataList
                    )}`;
                case "VideosCount":
                    return ((value as any) as number) > 0
                        ? `عدد الفديوهات ${value}`
                        : "لا يوجد فديوهات مضافة لهذا الكورس";
                default:
                    return value;
            }
            });
     },
  HandleChangeImageBackOfCourse() {
        CommonFuncs.UploadCourseImage(this.ChangeImgBtn, MainObjectOperForCourse.ImgBackOfCourse, $(
      "#Id"
        ).val() as string, (newUrl) => {
            MainObjectOperForCourse.CourseDataController.Model.BackgroundImgSrc = newUrl;
    });
    },
  async DropdownMenuUi() {
        let DropdownMenuUi = this.DropdownUi;
        DropdownMenuUi.SetMenuTextForCategoryId(this.CategoryIdInp.val() as string);
        await DropdownMenuUi.CreateCategoryBtnList(() => {
            this.SelectCategoryDataList = DropdownMenuUi.SelectCategoryDataList;
            this.ExecuteBindings();
        });
      DropdownMenuUi.OnCategorySelected = () => { };
      return DropdownMenuUi;
  },
  async Main() { 
    CommonUi.NotInputForBtnNow(this.NotNowBtn);
      this.OnEditCourseFormSubmitted(await this.DropdownMenuUi());
    this.HandleToggleBtn();
    this.HandleChangeImageBackOfCourse();

  }
};
$(async function () {
    await ContentOfCourseOprs.Main();    
    CourseVideosTableOper.Main();    
    MainObjectOperForCourse.OnTableLoaded.then(table => {
        AddCourseVideoTutorialsOper.Main(); 
    })
});
