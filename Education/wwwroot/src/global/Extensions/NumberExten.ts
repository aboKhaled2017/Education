interface Number {
    digitCount: () => number,
    toHourFormat: () => string
}
Number.prototype.digitCount = function (this: Number) {
  return this.toString().length;
};
Number.prototype.toHourFormat = function(this: any) {
  let h = Math.floor(this / 3600);
  let m = Math.floor((this - h * 3600) / 60);
  let s = Math.floor(this - h * 3600 - m * 60);
  return `${h.digitCount() > 1 ? h : "0" + h}:${
    m.digitCount() > 1 ? m : "0" + m
  }:${s.digitCount() > 1 ? s : "0" + s}`;
};
