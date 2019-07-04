'use strict';
(function () {
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  window.utilities = {
    getRandomNumber: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateMocks: function (mocksNumber) {
      var mocks = [];
      for (var i = 0; i < mocksNumber; i++) {
        var mock = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },
          offer: {
            type: HOUSING_TYPES[window.utilities.getRandomNumber(0, HOUSING_TYPES.length - 1)],
          },
          location: {
            x: window.utilities.getRandomNumber(0, 1200),
            y: window.utilities.getRandomNumber(130, 630),
          }
        };
        mocks.push(mock);
      }
      return mocks;
    }
  };
})();
