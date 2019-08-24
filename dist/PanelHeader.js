"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _PanelHeader = _interopRequireDefault(require("@vkontakte/vkui/dist/components/PanelHeader/PanelHeader"));

var _HeaderButton = _interopRequireDefault(require("@vkontakte/vkui/dist/components/HeaderButton/HeaderButton"));

var _fullscreen = _interopRequireDefault(require("@vkontakte/icons/dist/24/fullscreen"));

var _fullscreen_exit = _interopRequireDefault(require("@vkontakte/icons/dist/24/fullscreen_exit"));

var _PanelHeaderInternal = _interopRequireDefault(require("./PanelHeaderInternal"));

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

var PanelHeaderFull =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelHeaderFull, _React$Component);

  function PanelHeaderFull(props) {
    var _this;

    _classCallCheck(this, PanelHeaderFull);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelHeaderFull).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onFullScreenUpdate", function () {
      var fullScreenEnabled = !!document.fullscreenElement;

      _this.setState({
        fullScreenEnabled: fullScreenEnabled
      });
    });

    _this.state = {
      fullScreenEnabled: false
    };
    return _this;
  }

  _createClass(PanelHeaderFull, [{
    key: "fullScreenToggle",
    value: function fullScreenToggle() {
      var self = PanelHeaderFull;

      if (!document.fullscreenElement) {
        self.openFullscreen(document.documentElement);
      } else {
        self.closeFullscreen();
      }

      this.onFullScreenUpdate();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('fullscreenchange', this.onFullScreenUpdate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('fullscreenchange', this.onFullScreenUpdate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;

      if (!props.isWeb) {
        return _react["default"].createElement(_PanelHeader["default"], props);
      }

      var newProps = {};
      newProps.theme = 'alternate';
      newProps.right = _react["default"].createElement(_HeaderButton["default"], {
        onClick: function onClick() {
          return _this2.fullScreenToggle();
        }
      }, this.state.fullScreenEnabled ? _react["default"].createElement(_fullscreen_exit["default"], null) : _react["default"].createElement(_fullscreen["default"], null));
      return _react["default"].createElement(_PanelHeaderInternal["default"], _extends({}, props, newProps));
    }
  }], [{
    key: "openFullscreen",
    value: function openFullscreen() {
      var elem = document.body;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
  }, {
    key: "closeFullscreen",
    value: function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }]);

  return PanelHeaderFull;
}(_react["default"].Component);

var _default = PanelHeaderFull;
exports["default"] = _default;
//# sourceMappingURL=PanelHeader.js.map