# VK Mini Apps Utils

## Установка
```
npm i github:FlyInk13/VKAppsUtils --save
```

## Frontend:
### utils/setAndroidTheme - Заменяет тему на android, если в URL есть web=1.
```jsx
// Вставлять в index.js
import "vkappsutils/utils/setAndroidTheme";
```

### ReverseHorizontalScroll - HorizontalScroll с предопределенным вертикальным скроллом.
```jsx
import ReverseHorizontalScroll from "vkappsutils/dist/ReverseHorizontalScroll";

<ReverseHorizontalScroll>
  <div></div>
  ...
  <div></div>
</ReverseHorizontalScroll>
```

### Args - Выводит параметры location.search.
```jsx
import getArgs from "vkappsutils/dist/Args";

console.log(getArgs()); // { web: "1", access_token_settings: ... }
console.log(getArgs(false)); // { web: "1", vk_access_token_settings ... }
```

### ls - localStorage или объект в случае ошибки
```jsx
import ls from "vkappsutils/dist/localStorage";
```

### PanelHeaderFull - Обертка над PanelHeaderInternal, вставляющая для веба кнопку разворачивания приложения на весь экран
```jsx
import PanelHeaderFull from "vkappsutils/dist/PanelHeader";
```

### PanelHeaderInternal - Обертка над PanelHeader, разрешающая вставлять кнопки в правую сторону
```jsx
import PanelHeaderInternal from "vkappsutils/dist/PanelHeaderInternal";
```

### PromiseAPI - Модуль для работы с API с поддержкой очереди и ввода кода с картинки
```jsx
import PromiseAPI from "vkappsutils/dist/PromiseAPI";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.api = new PromiseAPI();
    this.api.view = this; // для управления setState({ popout, captchaCode })

    connect.subscribe((event) => {
      switch(event.detail.type) {
        case 'VKWebAppAccessTokenReceived':
        // или
        case 'VKWebAppCommunityAccessTokenReceived':
          const token = event.detail.data.access_token;
          this.api.access_token = token; // Устанавливаем токен
      }
    });
  }

  testMethod() {
    this.api.callMethod('storage.get', {
      // Параметры для метода
    }).then((res) => {
     console.log(res)
    }).catch(console.error);
  }
}
```

### ScrollArea - Обертка для включения прокрутки в Alert
```jsx
import ScrollArea from "vkappsutils/dist/ScrollArea";

// ...

<Alert>
  <ScrollArea selector='input'> // selector - Для каких элементов нужно включить скролл
    <Input defaultValue={token}/>
  </ScrollArea>
</Alert>
```

### SetWebTheme - Обертка над vkui-connect автоматически устанавливающая тему
```jsx
import SetWebTheme from "vkappsutils/dist/SetWebTheme";

SetWebTheme(/web=1/.test(location.href)) //  Если нужно установить тему bright_light для веб версии
```

## Backend (Node.js)
### utils/signVerify - Проверяет подпись (sign) приложения
```js
const signVerify = require('vkappsutils/utils/signVerify');
const url = '...'; // location.url | search;
const clientSecret = ''; // Защищённый ключ из настроек приложения

signVerify(url, clientSecret);

```
