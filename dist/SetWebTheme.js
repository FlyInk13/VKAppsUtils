"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Обертка над vk-bridge автоматически устанавливающая тему
 *
 * @param isWeb - Если нужно установить тему bright_light
 * @constructor
 */
function SetWebTheme(isWeb) {
  _vkBridge["default"].subscribe(function (_ref) {
    var _ref$detail = _ref.detail,
        type = _ref$detail.type,
        data = _ref$detail.data;

    switch (type) {
      case 'VKWebAppUpdateConfig':
        var schemeAttribute = document.createAttribute('scheme');

        if (isWeb) {
          schemeAttribute.value = 'bright_light';
        } else {
          schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
        }

        document.body.attributes.setNamedItem(schemeAttribute);

        if (data.appearance === 'light') {
          _vkBridge["default"].send("VKWebAppSetViewSettings", {
            status_bar_style: "dark",
            action_bar_color: "#fff"
          });
        }

        break;
    }
  });
}

var _default = SetWebTheme;
exports["default"] = _default;
//# sourceMappingURL=SetWebTheme.js.map