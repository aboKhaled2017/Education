"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../global/helperDome");
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