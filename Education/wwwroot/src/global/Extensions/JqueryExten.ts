interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    GetDatatableRow: (_dataTable: DataTables.DataTable) => DataTables.RowMethods;
}
jQuery.fn.GetDatatableRow = function (_dataTable: DataTables.DataTable): DataTables.RowMethods {
    let tr = this.closest("tr");
    let id: string = tr.closest("table").prop("id");
    return _dataTable.row(tr);
}