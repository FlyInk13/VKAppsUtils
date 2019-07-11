
/**
 * Выводит параметры location.search
 *
 * @param clean [true] - Выводить только vk_ ключи и вырезать префикс
 * @returns {{}}
 */
function getArgs(clean = true) {
  return window.location.search
    .substr(1)
    .split("&")
    .reduce(function parseArg(prev, data) {
      const [keyRaw, valueRaw] = data.split("=");
      const value = decodeURIComponent(valueRaw || "");
      let key = keyRaw;

      if (clean && /^vk_/.test(key)) {
        key = key.replace(/^vk_/, '');
      }

      prev[key] = value;

      return prev;
    }, {});
}

export default getArgs;
