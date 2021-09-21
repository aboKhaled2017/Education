import {CategoryListItem } from './Interfaces';
export class CommonUi {
  public static NotInputForBtnNow(GeneralBtn: JQuery) {
    GeneralBtn.click(function(e) {
      let btn = $(this);
      let input = btn.parents(".form-group:eq(0)").find("input:eq(0)");
      if (btn.is(":checked")) {
        input.data("value", input.val() as string);
        input.attr("disabled", "disabled").val("");
        input.prop("placeholder", input.data("notnow"));
        if (input.is(".withDate")) {
          input.attr("type", "text");
        }
      } else {
        let dataVal = input.data("value");
        input.removeAttr("disabled").prop("placeholder", input.data("prompt"));
        if (dataVal) input.val(dataVal);
        if (input.is(".withDate")) {
          input.attr("type", "date");
        }
      }
      input.triggerHandler("change");
    });
  }
  public static GetCategoryNameById(
    id: string,
    dataList: CategoryListItem[]
  ): string {
    return (dataList.find(v => v.id == id) as CategoryListItem).name;
  }
  public static GetFullCategoryNameById(
    id: string,
    dataList: CategoryListItem[]
  ): string {
    let superId = (dataList.find(v => v.id == id) as CategoryListItem).superId;
    return superId == null
      ? (dataList.find(v => v.id == id) as CategoryListItem).name
      : `${(dataList.find(v => v.id == superId) as CategoryListItem).name}/
               ${(dataList.find(v => v.id == id) as CategoryListItem).name}`;
  }
  public SelectCategoryDataList: CategoryListItem[] = [];
  public OnCategorySelected: () => void = () => {};
  public DefaultMenuValues = {
    text: "اختر اسم القسم",
    id: ""
  };
  constructor(
    private selectCategoryBtn: JQuery,
    private CategoryIdInp: JQuery,
    private dataUrl: string = "/Admin/Category/ItemsList"
  ) {}
  private MakeDropDownMenuForCategories(
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
        SubMenu.append(
          this.MakeDropDownMenuForCategories(SubList, category.id as any)
        );
        item.append(SubMenu);
        item.data("id", category.id);
        ElsContainer = ElsContainer.add(item);
      }
    }
    return ElsContainer;
  }
  private HandleDropDownMenu() {
    let mainObj = this;
    $(".dropdown a.sub,.dropup a.sub").on("click", function(e) {
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
      .on("click", function(e) {
        let el = $(this);
        let text = CommonUi.GetFullCategoryNameById(
          el.data("id") as string,
          mainObj.SelectCategoryDataList
        );
        mainObj.selectCategoryBtn.find("button .text").text(text);
        el.parents(".subMenu").hide();
        mainObj.CategoryIdInp.val(el.data("id")).trigger("change");
        mainObj.OnCategorySelected();
        e.stopPropagation();
      });
  }
  public async CreateCategoryBtnList(AfterCreated: () => void) {
    let ElsContainer = $();
    await $.get(this.dataUrl).done(result => {
      this.SelectCategoryDataList = result.data;
      this.SetMenuTextForCurrentId();
      this.selectCategoryBtn
        .find(".text")
        .text(this.DefaultMenuValues.text)
        .end()
        .find(".dropdown-menu")
        .empty()
        .append(this.MakeDropDownMenuForCategories(result.data));
      this.HandleDropDownMenu();
      AfterCreated();
    });
  }
  private SetMenuTextForCurrentId() {
    if (this.DefaultMenuValues.id == "") return;
    this.DefaultMenuValues.text = CommonUi.GetFullCategoryNameById(
      this.DefaultMenuValues.id,
      this.SelectCategoryDataList
    );
  }
  public SetMenuTextForCategoryId(id: string, text?: string): CommonUi {
    if (text) this.DefaultMenuValues.text = text;
    this.DefaultMenuValues.id = id;
    return this;
  }
}
export class CommonButtons {
    public static DeleteBtn = (): JQuery => {
        return $(`<button class="controlBtn delete  btn btn-danger">
              <span>حذف </span>
              <i class="fa fa-remove"></i>
            </button>`);
    }
    public static SaveBtn = (): JQuery => {
    return $(`<button class="controlBtn save  btn btn-primary">
                <span>حفظ </span>
                <i class="fa fa-check-circle"></i>
            </button>`);
    }
    public static EditBtn = (): JQuery => {
        return $(`<button class="controlBtn edit  btn btn-info">
                <span>تعديل </span>
                <i class="fa fa-edit"></i>
            </button>`);
    }
    public static CustomBtn = (label:string,iconClass:string): JQuery => {
        return $(`<button class="controlBtn edit  btn btn-info">
                <span>${label} </span>
                <i class="fa ${iconClass}"></i>
            </button>`);
    }
}