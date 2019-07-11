"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ls = {};

try {
  localStorage.test = 1;
  ls = localStorage;
  delete localStorage.test;
} catch (e) {
  if (console && console.warn) {
    console.warn("localStorage error");
  }
}

var _default = ls;
exports["default"] = _default;
//# sourceMappingURL=localStorage.js.map