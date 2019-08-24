"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollArea =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ScrollArea, _React$Component);

  function ScrollArea(props) {
    var _this;

    _classCallCheck(this, ScrollArea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollArea).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTouch", function (event) {
      var el = event.currentTarget;
      var posOld = el.pos;
      var posNew = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };

      if (event.type !== 'touchstart') {
        var offsetX = posOld.x - posNew.x;
        var offsetY = posOld.y - posNew.y;
        el.scrollLeft += offsetX;
        el.scrollTop += offsetY;
      }

      el.pos = posNew;
    });

    _this.scrollArea = _react["default"].createRef();
    return _this;
  }

  _createClass(ScrollArea, [{
    key: "getElements",
    value: function getElements() {
      return this.scrollArea.current.querySelectorAll(this.props.selector);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.getElements().forEach(function (el) {
        el.addEventListener('touchstart', _this2.onTouch, false);
        el.addEventListener('touchmove', _this2.onTouch, false);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.getElements().forEach(function (el) {
        el.removeEventListener('touchstart', _this3.onTouch);
        el.removeEventListener('touchmove', _this3.onTouch);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", _extends({
        ref: this.scrollArea,
        className: "scrollArea"
      }, this.props));
    }
  }]);

  return ScrollArea;
}(_react["default"].Component);

var _default = ScrollArea;
exports["default"] = _default;
//# sourceMappingURL=ScrollArea.js.map