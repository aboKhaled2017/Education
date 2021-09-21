"use strict";
jQuery.fn.GetDatatableRow = function (_dataTable) {
    var tr = this.closest("tr");
    var id = tr.closest("table").prop("id");
    return _dataTable.row(tr);
};
//# sourceMappingURL=JqueryExten.js.map