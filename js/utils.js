'use strict';
(function () {

  window.utils = {

    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13,

    getRandomNumber: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    debounce: function (func, data) {
      var milliseconds = 500;
      if (window.lastTimeout) {
        window.clearTimeout(window.lastTimeout);
      }
      window.lastTimeout = window.setTimeout(function () {
        func(data);
      }, milliseconds);
    },

  };
})();
