import bridge from '@vkontakte/vk-bridge';

/**
 * Обертка над vk-bridge автоматически устанавливающая тему
 *
 * @param isWeb - Если нужно установить тему bright_light
 * @constructor
 */
function SetWebTheme(isWeb) {
  bridge.subscribe(({ detail: { type, data }}) => {
    switch (type) {
      case 'VKWebAppUpdateConfig':
        let schemeAttribute = document.createAttribute('scheme');

        if (isWeb) {
          schemeAttribute.value = 'bright_light';
        } else {
          schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
        }

        document.body.attributes.setNamedItem(schemeAttribute);

        if (data.appearance === 'light') {
          bridge.send("VKWebAppSetViewSettings", {
            status_bar_style: "dark",
            action_bar_color: "#fff"
          });
        }

        break;
    }
  });
}

export default SetWebTheme;
