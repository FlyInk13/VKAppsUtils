const {createHmac} = require('crypto');
const querystring = require('querystring');
const sha256 = (string, pwd) => createHmac('sha256', pwd).update(string).digest('base64');

function signVerify(url, clientSecret) {
  const parsedSearch = querystring.parse(url);

  const checkSumRaw = Object
    .keys(parsedSearch)
    .filter((key) => /^vk_/.test(key))
    .sort()
    .map((key) => {
      const val = parsedSearch[key];
      return key + '=' + val;
    })
    .join('&');

  const checkSum = sha256(checkSumRaw, clientSecret)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return checkSum === parsedSearch['sign'];
}

module.exports = signVerify;
