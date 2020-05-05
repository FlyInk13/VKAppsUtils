"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vkui = require("@vkontakte/vkui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSONP_PromiseAPI =
/*#__PURE__*/
function () {
  function JSONP_PromiseAPI() {
    var _this = this;

    _classCallCheck(this, JSONP_PromiseAPI);

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

          default:
            throw apiError;
        }
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
    this.access_token = false;
    this.view = false;
    this.v = 5.92; // requests map { request_id: request_data };

    this.requests = {}; // requests cart [request_id, request_id, ...];

    this.cart = []; // internal vars

    this.log = false;
    this.pause = false; // connect transport

    this.subscribe();
  }

  _createClass(JSONP_PromiseAPI, [{
    key: "subscribe",
    value: function subscribe() {
      window.apiCallback = window.apiCallback || {};
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
      var _this2 = this;

      this.debug('cartInit');
      if (this.interval) return;
      this.interval = setInterval(function () {
        return _this2.cartTick();
      }, 334);
    }
  }, {
    key: "showCaptcha",
    value: function showCaptcha(method, params, error) {
      var _this3 = this;

      if (!this.view) {
        throw error;
      }

      this.pause = 1;
      return new Promise(function (resolve) {
        var view = _this3.view;
        var oldPopout = view.state.popout;
        var captcha_img = error.captcha_img;
        view.setState({
          popout: _react["default"].createElement(_vkui.Alert, {
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
            src: captcha_img,
            style: {
              width: 238,
              borderRadius: 3
            },
            alt: captcha_img
          }), _react["default"].createElement(_vkui.Input, {
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
        _this3.pause = 0;
        var captcha_sid = error.captcha_sid;
        return _this3.callMethod(method, _objectSpread({}, params, {
          captcha_key: captcha_key,
          captcha_sid: captcha_sid
        }));
      });
    }
  }, {
    key: "callback",
    value: function callback(request_id, callback_name, _ref) {
      var error_data = _ref.error,
          response = _ref.response;

      if (error_data) {
        this.parseError({
          error_data: error_data,
          request_id: request_id
        });
      } else {
        this.parseResponse({
          response: response,
          request_id: request_id
        });
      }

      document.getElementById(callback_name).outerHTML = '';
      delete window.apiCallback[callback_name];
    }
  }, {
    key: "sendJSON",
    value: function sendJSON(callback_name, method, params) {
      var script = document.createElement('script');
      var src = 'https://api.vk.com/method/' + method + '/?';
      params.callback = 'apiCallback.' + callback_name;
      Object.entries(params).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        value = encodeURIComponent(String(value));
        src += "&".concat(key, "=").concat(value);
      });
      script.id = callback_name;
      script.src = src;

      script.onerror = function (error) {
        window.apiCallback[callback_name]({
          error: error
        });
      };

      document.head.appendChild(script);
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(_ref4) {
      var _ref4$data = _ref4.data,
          method = _ref4$data.method,
          params = _ref4$data.params,
          request_id = _ref4$data.request_id;
      var callback_name = 'fn' + request_id.replace('.', '_');
      window.apiCallback[callback_name] = this.callback.bind(this, request_id, callback_name);
      this.sendJSON(callback_name, method, params);
    }
  }]);

  return JSONP_PromiseAPI;
}();

var _default = JSONP_PromiseAPI;
exports["default"] = _default;
//# sourceMappingURL=JSONP_PromiseAPI.js.map