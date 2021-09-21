/// <reference types="jquery.datatables" />
/// <reference types="datatables.net" />
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    GetDatatableRow: (_dataTable: DataTables.DataTable) => DataTables.RowMethods;
}
//# sourceMappingURL=JqueryExten.d.ts.map