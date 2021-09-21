import "../../../global/helperDome";
$(function() {
  categoriesTbOperations.main();
});
enum categoryStatus {
  disabled = "معطل",
  activated = "مفعل"
}
enum categoryClass {
  active = "enableCategory",
  deActive = "disableCategory"
}
interface Category {
  id: string;
  name: string;
  isEnabled: boolean;
  subs: number;
}
interface CategoryListItem {
  id: string;
  superId: string | null;
  name: string;
  subs: string[];
}
let DeleteBtn = (): JQuery => {
  return $(`<button class="controlBtn delete  btn btn-danger">
              <span>حذف </span>
              <i class="fa fa-remove"></i>
            </button>`);
};
let ListSubCategoriesBtn = (): JQuery => {
  return $(
    `<button class="controlBtn showSubs  btn btn-info">
                  <span>الاقسام الفرعية </span>
                  <i class="fa fa-plus"></i>
       </button>`
  );
};
let SaveBtn = (): JQuery => {
  return $(`<button class="controlBtn save  btn btn-primary">
                <span>حفظ </span>
                <i class="fa fa-check-circle"></i>
            </button>`);
};
let ToggleBtn = (record: Category): JQuery => {
  let btnClass, btnText;
  if (record.isEnabled) {
    btnClass = "fa-toggle-on disableCategory";
  } else {
    btnClass = "fa-toggle-off enableCategory";
  }
  return $(
    `<i class="controlBtn toogleBtn fa fa-2x ${btnClass}"></i> <span></span>`
  );
};

let languages: DataTables.LanguageSettings = {
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
let CategoriesTbId: string = "categoriesTb";
let columns: DataTables.ColumnSettings[] = [
  { data: "id", visible: false, orderable: false },
  { data: "name", className: "name" },
  {
    data: "isEnabled",
    render: function(value, type, record, colDom) {
      return value
        ? `<h5 class='badge alert-success'>${categoryStatus.activated}</h5>`
        : `<h5 class='badge alert-danger'>${categoryStatus.disabled}</h5>`;
    },
    className: "text-center isEnabled",
    searchable: false
  },
  {
    orderable: false,
    searchable: false,
    render: function(value, type, record: Category, colDom) {
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
let HandleOnRowCreated = (
  rowNode: HTMLElement,
  rowData: Category,
  index: number
) => {
  let $rowNode = $(rowNode);
  $rowNode.data("id", rowData.id);
  let dataFields = $rowNode.find("td.name");
  dataFields.each((ind, el) => {
    (el as HTMLElement).contentEditable = "true";
  });
  $(dataFields).blur(e => {
    let td = e.target;
    let text = (td.textContent as string).trim();
    if (rowData.name != text) $rowNode.addClass("changed");
    else $rowNode.removeClass("changed");
    rowData.name = text;
  });
};
let categoriesTbOperations = {
  TableCounter: 1,
  CategoriesTbId: "categoriesTb",
  addCategoryBtn: $("#saveCategory"),
  selectCategoryBtn: $("#MainCategory"),
  DataTables: [] as DataTables.DataTable[],
  SelectCategoryDataList: [] as CategoryListItem[],
  formateTable(tableId: string, html: string) {
    return `<table id="${tableId}">${html}</table>`;
  },
  GetRowData(btn: JQuery): Category {
    let tr = btn.closest("tr");
    let data = (btn.closest("table").dataTable() as any)[
      "fnGetData"
    ]() as Category[];
    let id = tr.data("id");
    return data.find(cat => cat.id == id) as Category;
  },
  GetDatatableRow(btn: JQuery<HTMLElement>): DataTables.RowMethods {
    let tr = btn.closest("tr");
    let id: string = tr.closest("table").prop("id");
    return this.DataTables[id as any].row(tr);
  },
  FormateId(id: number) {
    return `details_${id}`;
  },
  DetailsTable: $("#TbDetails").html(),
  HandleControlsBtns() {
    var mainObj = this;
    $(`#${CategoriesTbId}`).on("click", ".showSubs", function() {
      let btn = $(this);
      let tr = $(btn).closest("tr");
      let row = mainObj.GetDatatableRow(btn);
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass("shown");
        btn
          .find("i")
          .removeClass("fa-minus")
          .addClass("fa-plus");
      } else {
        var id = mainObj.FormateId(mainObj.TableCounter);
        row.child(mainObj.formateTable(id, mainObj.DetailsTable)).show();
        tr.addClass("shown");
        let detailsTb = $(`#${id}`)
          .addClass("innerTb table-hover table-bordered")
          .DataTable({
            responsive: true,
            ajax: {
              url: `/Admin/Category/subCategories?id=${
                (row.data() as Category).id
              }`,
              dataType: "json",
              type: "GET",
              contentType: "application/json"
            },
            columns: columns,
            language: languages,
            pageLength: 3,
            lengthMenu: [3, 5, 10, 15, 20, 50, 100],
            createdRow(rowNode, rowData, index) {
              HandleOnRowCreated(
                rowNode as HTMLElement,
                rowData as Category,
                index
              );
            }
          });
        mainObj.DataTables[id as any] = detailsTb;
        btn
          .find("i")
          .addClass("fa-minus")
          .removeClass("fa-plus");
        mainObj.TableCounter = mainObj.TableCounter + 1;
      }
    });
    $(`#${CategoriesTbId}`).on("click", ".delete  ", function() {
      var btn = $(this);
      let tr = btn.closest("tr");
      let RowDataTable = mainObj.GetDatatableRow(btn);
      let rowData = RowDataTable.data() as Category;
      btn.pendingState(true, "fa-remove");
      $.post(`/Admin/Category/Delete?id=${rowData.id}`)
        .done(d => {
          $(RowDataTable.node()).fadeOut();
          mainObj.SelectCategoryDataList = mainObj.SelectCategoryDataList.filter(
            item => {
              if (item.id != rowData.id) return item;
            }
          );
          mainObj.CreateCategoryBtnList();
        })
        .always(d => {
          btn.pendingState(false);
        })
        .catch(() => {
          $.notify({
            message: "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم",
            title: "لم يتم تنفيذ العملية"
          });
        });
    });
    $(`#${CategoriesTbId}`).on("click", ".toogleBtn  ", function() {
      var btn = $(this);
      let classNameIcon = btn.hasClass("fa-toggle-on")
        ? "fa-toggle-on"
        : "fa-toggle-off";
      let tr = btn.closest("tr");
      let rowDataTable = mainObj.GetDatatableRow(btn);
      let rowData = rowDataTable.data() as Category;
      var classType = btn.hasClass(categoryClass.active)
        ? categoryClass.active
        : categoryClass.deActive;
      btn.switchPendingState(true, classNameIcon);
      $.post(`/Admin/Category/ToggleActive?id=${rowData.id}`)
        .done(d => {
          rowData.isEnabled = !rowData.isEnabled;
          rowDataTable.data(rowData);
        })
        .always(d => {
          btn.switchPendingState(false);
          btn.toggleClass("fa-toggle-on fa-toggle-off");
        })
        .catch(() => {
          $.notify({
            message: "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم",
            title: "لم يتم تنفيذ العملية"
          });
        });
    });
    $(`#${CategoriesTbId}`).on("click", ".save  ", function() {
      var btn = $(this);
      let tr = btn.closest("tr");
      if (!tr.hasClass("changed")) return;
      let rowData = mainObj.GetRowData(btn);
      btn.pendingState(true, "fa-check-circle");
      $.post(`/Admin/Category/Update`, {
        Id: rowData.id,
        Name: rowData.name
      })
        .done(() => {
          (mainObj.SelectCategoryDataList.find(
            c => c.id == rowData.id
          ) as CategoryListItem).name = rowData.name;
          mainObj.CreateCategoryBtnList();
        })
        .always(d => {
          btn.pendingState(false);
        })
        .catch(() => {
          $.notify({
            message: "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم",
            title: "لم يتم تنفيذ العملية"
          });
        });
    });
  },
  HandleAddCategory() {
    var mainObj = this;
    this.addCategoryBtn.click(() => {
      let nameInp = $("#Cat_Name");
      let name = nameInp.val() as string;
      if (!(nameInp.valid() && name.length > 2)) return false;
      let state = $('input[name="state"]:checked').val();
      let superId = mainObj.selectCategoryBtn.data("superId") || null;
      this.addCategoryBtn.pendingState(true, "fa-check");
      $.post("/Admin/Category/Add", {
        Name: name,
        IsEnabled: state,
        SuperId: superId
      })
        .done((data: Category) => {
          $.notify({
            message: "تمت اضافة القسم بنجاح",
            title: "تمت الاضافة"
          });
          mainObj.Table.rows.add(data as any);
          this.SelectCategoryDataList.push(data as any);
          this.CreateCategoryBtnList();
          console.log(data);
        })
        .always(() => {
          this.addCategoryBtn.pendingState(false);
          nameInp.val("");
        })
        .catch(e => {
          let message =
            e.responseJSON && e.responseJSON.message
              ? e.responseJSON.message
              : "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم";
          $.notify({
            message: message,
            title: "لم يتم تنفيذ العملية"
          });
        });
    });
  },
  Table: (function(listUrl) {
    return $(`#${CategoriesTbId}`).DataTable({
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
      createdRow(rowNode, rowData, index) {
        HandleOnRowCreated(rowNode as HTMLElement, rowData as Category, index);
      }
    });
  })("/Admin/Category/List"),
  MakeDropDownMenu(
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
        let item = $(`<li class="dropdown">
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
        SubMenu.append(this.MakeDropDownMenu(SubList, category.id as any));
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
      .find("li")
      .css("cursor", "pointer")
      .not(".dropdown")
      .on("click", function(e) {
        let el = $(this);
        mainObj.selectCategoryBtn.find("button .text").text(el.data("name"));
        el.parents(".subMenu").hide();
        mainObj.selectCategoryBtn.data("superId", el.data("id"));
      });
  },
  CreateCategoryBtnList() {
    let ElsContainer = $();
    $.get("/Admin/Category/ItemsList").done(result => {
      this.SelectCategoryDataList = result.data;
      this.selectCategoryBtn
        .find(".dropdown-menu")
        .empty()
        .append(this.MakeDropDownMenu(result.data));
      this.HandleDropDownMenu();
    });
  },
  main() {
    this.CreateCategoryBtnList();
    this.DataTables[CategoriesTbId as any] = this.Table;
    this.HandleControlsBtns();
    this.HandleAddCategory();
  }
};
var b={a:10,OnPropertyChanges:function(){
for(let prop in this){
  Object.defineProperty(this,prop,{
  set:function(v){
    console.log('new value is '+v)
    this[prop]=v;
  }
  });
}
}};

Object.defineProperty(b,"ahmed",{
  value:"waleed",
  writable:true,
  configurable:true,
  set:function(v){
    console.log(this)
  }
})