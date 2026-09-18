if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    if (typeof callback !== "function") {
      throw new TypeError("callback must be a function");
    }

    const array = Object(this);
    const length = array.length >>> 0;

    // Идем с конца массива к началу
    for (let i = length - 1; i >= 0; i--) {
      if (callback.call(thisArg, array[i], i, array)) {
        return i;
      }
    }

    return -1;
  };
}
