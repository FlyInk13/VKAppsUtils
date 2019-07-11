let ls = {};

try {
  localStorage.test = 1;
  ls = localStorage;
  delete localStorage.test;
} catch (e) {
  if (console && console.warn) {
    console.warn("localStorage error");
  }
}

export default ls;

