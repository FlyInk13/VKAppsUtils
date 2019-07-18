
function setAndroidTheme() {
  window.isWeb = /web=1/.test(window.location.search);
  if (window.isWeb) {
    Object.defineProperties(navigator, {
      userAgent: {
        value: 'web android',
        configurable: false,
        enumerable: true,
        writable: false
      }
    });
  }
}

setAndroidTheme();
