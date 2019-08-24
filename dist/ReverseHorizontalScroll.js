"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _HorizontalScroll = _interopRequireDefault(require("@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReverseHorizontalScroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReverseHorizontalScroll, _React$Component);

  function ReverseHorizontalScroll(props) {
    var _this;

    _classCallCheck(this, ReverseHorizontalScroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReverseHorizontalScroll).call(this, props));
    _this.onWheel = _this.onWheel.bind(_assertThisInitialized(_this));
    _this.scrollArea = _react["default"].createRef();
    return _this;
  }

  _createClass(ReverseHorizontalScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollElement = this.scrollArea.current.querySelector('.HorizontalScroll__in');

      if (this.scrollElement) {
        this.scrollElement.addEventListener('wheel', this.onWheel, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollElement) {
        this.scrollElement.removeEventListener('wheel', this.onWheel);
      }
    }
  }, {
    key: "onWheel",
    value: function onWheel(e) {
      if (!this.scrollElement) {
        return;
      }

      var props = this.props;
      var reverse = props.reverse ? -1 : 1;
      var scrollDelta = (e.deltaY || 0) * reverse;
      var oldValue = this.scrollElement.scrollLeft;
      this.scrollElement.scrollLeft -= scrollDelta;

      if (props.onWheel) {
        return props.onWheel(e);
      }

      if (this.scrollElement.scrollLeft === oldValue) {
        return;
      }

      e.cancelBubble = true;
      e.preventDefault();
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return _react["default"].createElement("div", {
        ref: this.scrollArea,
        style: {
          overflow: 'auto'
        }
      }, _react["default"].createElement(_HorizontalScroll["default"], props));
    }
  }]);

  return ReverseHorizontalScroll;
}(_react["default"].Component);

var _default = ReverseHorizontalScroll;
exports["default"] = _default;
//# sourceMappingURL=ReverseHorizontalScroll.js.map