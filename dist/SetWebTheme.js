"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vkuiConnect = _interopRequireDefault(require("@vkontakte/vkui-connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Обертка над vkui-connect автоматически устанавливающая тему
 *
 * @param isWeb - Если нужно установить тему bright_light
 * @constructor
 */
function SetWebTheme(isWeb) {
  _vkuiConnect["default"].subscribe(function (e) {
    switch (e.detail.type) {
      case 'VKWebAppUpdateConfig':
        var schemeAttribute = document.createAttribute('scheme');

        if (isWeb) {
          schemeAttribute.value = 'bright_light';
        } else {
          schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'bright_light';
        }

        document.body.attributes.setNamedItem(schemeAttribute);

        if (e.detail.data.appearance === 'light') {
          _vkuiConnect["default"].send("VKWebAppSetViewSettings", {
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