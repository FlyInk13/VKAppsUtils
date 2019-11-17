import connect from '@vkontakte/vk-connect';

/**
 * Обертка над vkui-connect автоматически устанавливающая тему
 *
 * @param isWeb - Если нужно установить тему bright_light
 * @constructor
 */
function SetWebTheme(isWeb) {
  connect.subscribe((e) => {
    switch (e.detail.type) {
      case 'VKWebAppUpdateConfig':
        let schemeAttribute = document.createAttribute('scheme');
        if (isWeb) {
          schemeAttribute.value = 'bright_light';
        } else {
          schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'bright_light';
        }
        document.body.attributes.setNamedItem(schemeAttribute);

        if (e.detail.data.appearance === 'light') {
          connect.send("VKWebAppSetViewSettings", {
            status_bar_style: "dark",
            action_bar_color: "#fff"
          });
        }
        break;
    }
  });
}

export default SetWebTheme;
