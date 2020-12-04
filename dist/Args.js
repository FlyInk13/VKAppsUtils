"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Выводит параметры location.search
 *
 * @param clean [true] - Выводить только vk_ ключи и вырезать префикс
 * @returns {{}}
 */
function getArgs() {
  var clean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return window.location.search.substr(1).split("&").reduce(function parseArg(prev, data) {
    var _data$split = data.split("="),
        _data$split2 = _slicedToArray(_data$split, 2),
        keyRaw = _data$split2[0],
        valueRaw = _data$split2[1];

    var value = decodeURIComponent(valueRaw || "");
    var key = keyRaw;

    if (clean && /^vk_/.test(key)) {
      key = key.replace(/^vk_/, '');
    }

    prev[key] = value;
    return prev;
  }, {});
}

var _default = getArgs;
exports["default"] = _default;
//# sourceMappingURL=Args.js.map