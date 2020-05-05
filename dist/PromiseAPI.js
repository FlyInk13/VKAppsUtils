"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Alert = _interopRequireDefault(require("@vkontakte/vkui/dist/components/Alert/Alert"));

var _Input = _interopRequireDefault(require("@vkontakte/vkui/dist/components/Input/Input"));

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PromiseAPI =
/*#__PURE__*/
function () {
  function PromiseAPI(_data) {
    var _this = this;

    _classCallCheck(this, PromiseAPI);

    _defineProperty(this, "callMethod", function (method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var request_id = (Math.random() * 1e20).toString(32);
        var data = {
          method: method,
          params: _objectSpread({
            access_token: _this.access_token,
            v: _this.v
          }, params),
          request_id: request_id
        };
        _this.requests[request_id] = {
          resolve: resolve,
          reject: reject,
          data: data
        };

        _this.cartCheck(request_id);
      })["catch"](function (error) {
        error = error || {};
        var apiError = error.error_reason || error;
        var errorCode = apiError.error_code || 0;

        switch (errorCode) {
          case 6:
            _this.cartInit();

            return _this.callMethod(method, params);

          case 14:
            return _this.showCaptcha(method, params, apiError);
        }

        throw apiError;
      });
    });

    _defineProperty(this, "parseError", function (data) {
      var error_data = data.error_data,
          request_id = data.request_id;
      if (!_this.requests[request_id]) return;

      _this.requests[request_id].reject(error_data);

      delete _this.requests[request_id];
    });

    _defineProperty(this, "parseResponse", function (data) {
      var response = data.response,
          request_id = data.request_id;
      if (!_this.requests[request_id]) return;

      _this.requests[request_id].resolve(response);

      delete _this.requests[request_id];
    });

    // user data
    this.access_token = (_data ? _data.access_token : false) || false;
    this.view = (_data ? _data.view : false) || false;
    this.v = (_data ? _data.v : false) || '5.92'; // requests map { request_id: request_data };

    this.requests = {}; // requests cart [request_id, request_id, ...];

    this.cart = []; // internal vars

    this.log = false;
    this.pause = false; // bridge transport

    this.subscribe();
  }

  _createClass(PromiseAPI, [{
    key: "subscribe",
    value: function subscribe() {
      var _this2 = this;

      this.bridge = _vkBridge["default"];
      this.bridge.subscribe(function (_ref) {
        var _ref$detail = _ref.detail,
            type = _ref$detail.type,
            data = _ref$detail.data;

        switch (type) {
          case 'VKWebAppCallAPIMethodFailed':
            _this2.parseError(data);

            break;

          case 'VKWebAppCallAPIMethodResult':
            _this2.parseResponse(data);

            break;
        }
      });
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(request) {
      this.bridge.send('VKWebAppCallAPIMethod', request.data);
    }
  }, {
    key: "debug",
    value: function debug() {
      var _console;

      if (!this.log) return;

      (_console = console).log.apply(_console, arguments);
    }
  }, {
    key: "cartCheck",
    value: function cartCheck(request_id, ignoreCart) {
      if (!this.pause && (!this.interval || ignoreCart)) {
        var request = this.requests[request_id];
        this.sendRequest(request);
        this.debug('cartCheck', 'call', request);
        return;
      }

      this.debug('cartCheck', 'push');
      this.cart.push(request_id);
    }
  }, {
    key: "cartTick",
    value: function cartTick() {
      this.debug('cartTick', this.cart.length);

      if (!this.cart.length) {
        clearInterval(this.interval);
        delete this.interval;
        return;
      }

      var request_id = this.cart.shift();
      this.cartCheck(request_id, true);
    }
  }, {
    key: "cartInit",
    value: function cartInit() {
      var _this3 = this;

      this.debug('cartInit');
      if (this.interval) return;
      this.interval = setInterval(function () {
        return _this3.cartTick();
      }, 334);
    }
  }, {
    key: "showCaptcha",
    value: function showCaptcha(method, params, error) {
      var _this4 = this;

      if (!this.view) {
        throw error;
      }

      this.pause = 1;
      return new Promise(function (resolve) {
        var view = _this4.view;
        var oldPopout = view.state.popout;
        view.setState({
          popout: _react["default"].createElement(_Alert["default"], {
            actionsLayout: "vertical",
            actions: [{
              title: 'OK',
              autoclose: true
            }],
            onClose: function onClose() {
              resolve(view.state.captchaCode);
              view.setState({
                popout: oldPopout,
                captchaCode: null
              });
            }
          }, _react["default"].createElement("h2", null, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0441 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438"), _react["default"].createElement("img", {
            src: error.captcha_img,
            style: {
              width: 238,
              borderRadius: 3
            },
            alt: error.captcha_img
          }), _react["default"].createElement(_Input["default"], {
            defaultValue: "",
            onChange: function onChange(e) {
              var captchaCode = e.currentTarget.value;
              view.setState({
                captchaCode: captchaCode
              });
            }
          }))
        });
      }).then(function (captcha_key) {
        _this4.pause = 0;
        var captcha_sid = error.captcha_sid;
        return _this4.callMethod(method, _objectSpread({}, params, {
          captcha_key: captcha_key,
          captcha_sid: captcha_sid
        }));
      });
    }
  }, {
    key: "getMethod",
    value: function getMethod(method) {
      return this.callMethod.bind(this, method);
    }
  }]);

  return PromiseAPI;
}();

var _default = PromiseAPI;
exports["default"] = _default;
//# sourceMappingURL=PromiseAPI.js.map