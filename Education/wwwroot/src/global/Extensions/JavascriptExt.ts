interface File extends Blob {
    toHtmlVideoElement :() => HTMLVideoElement;
}
interface Array<T>{
    UniqueValues: () => T[];
    PushIfNotExists: (value: T) => void;
}
File.prototype.toHtmlVideoElement = function (): HTMLVideoElement {
  window.URL = window.URL || (window as any)["webkitURL"];
  let video = document.createElement("video") as HTMLVideoElement;
  video.preload = "metadata";
  video.onloadedmetadata = function(ev: Event) {
    window.URL.revokeObjectURL(video.src);
  };
  video.src = URL.createObjectURL(this);
  return video;
};
Array.prototype.UniqueValues = function () {
    let uniqueSet = new Set(this);
    let uniqueArr = [] as any[];
    uniqueSet.forEach(val => uniqueArr.push(val))
    return uniqueArr;
}
Array.prototype.PushIfNotExists = function (value: any) {
    if (!this.includes(value)) this.push(value);
}
