'use strict';

(function () {

  window.debounce = function (func, data) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    var lastTimeout = setTimeout(function () {
      func(data);
    }, 1000);
  };

})();
