interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    GetDatatableRow: (_dataTable: DataTables.DataTable) => DataTables.RowMethods;
    ShownOnlyIfChecked: (TargetCheckedInput: JQuery<HTMLInputElement>) => JQuery<HTMLElement>;
    ajaxSubmit: (url: string, method: string, IsStringFiable: boolean = true, complete: (def: JQuery.jqXHR<any>, model: { [key: string]: any; }) => void, beforeSend: () => void) => false | JQuery<HTMLElement>;
  switchPendingState: (
    isPending: boolean,
    removedClass?: string | undefined,
    animatingClass?: string | undefined
  ) => JQuery<HTMLElement>;
  formAlert: () => JQuery<HTMLElement>;
  toggleAttr: (attr: string) => JQuery<HTMLElement>;
  resetPassword: () => JQuery<HTMLElement>;
  addPasswordShow: () => void;
  pendingState: (
    isPending: boolean,
    removedClass?: string | undefined,
    animatingClass?: string | undefined
  ) => JQuery<HTMLElement>;
}
interface JQueryStatic {
    AjaxXHRProgress: (OnUploading: (percentage: number) => void) => () => any;
    UploadImage: (BtnHandler: JQuery<HTMLElement>,OnGotImgFile: (file: File, ext: string) => void) => void;
    notifyCatch: (model: any) => notifyObject | null;
    confirmNotify: (message: string, onConfirm: (isConfirmed: boolean) => void) => void;
    notifyClose: (command: string) => void;
    notifyDefaults: (options: {}) => notifySetting;
    notify: (content: contentObject, options?: notifyOptions) => notifyObject | null;
}