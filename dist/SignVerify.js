"use strict";

var _require = require('crypto'),
    createHmac = _require.createHmac;

var querystring = require('querystring');

var sha256 = function sha256(string, pwd) {
  return createHmac('sha256', pwd).update(string).digest('base64');
};

function signVerify(url, clientSecret) {
  var parsedSearch = querystring.parse(url);
  var checkSumRaw = Object.keys(parsedSearch).filter(function (key) {
    return /^vk_/.test(key);
  }).sort().map(function (key) {
    var val = parsedSearch[key];
    return key + '=' + val;
  }).join('&');
  var checkSum = sha256(checkSumRaw, clientSecret).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return checkSum === parsedSearch['sign'];
}

module.exports = signVerify;
//# sourceMappingURL=SignVerify.js.map