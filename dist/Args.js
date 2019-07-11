"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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