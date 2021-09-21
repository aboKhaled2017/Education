import { messages } from "./messages";
$.ajaxSettings.contentType = "application/json";
($.ajaxSettings as any).error = (
  jqXHR: XMLHttpRequest,
  errorType: string,
  execptionObj: {}
): void => {
  //handle on error occure
};
enum ResquestStatus {
  Error,
  NotFound,
  NoMean
}
