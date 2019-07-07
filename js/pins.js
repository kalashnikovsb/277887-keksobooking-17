'use strict';
(function () {
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_SIZE_X = 50;
  var PIN_SIZE_Y = 70;

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.generatePins = {
    createPin: function (pin) {
      var pinItem = pinTemplate.cloneNode(true);
      var pinImg = pinItem.querySelector('img');
      pinItem.style = 'left: ' + (pin.location.x - PIN_SIZE_X / 2) + 'px; top: ' + (pin.location.y - PIN_SIZE_Y) + 'px;';
      pinImg.src = pin.author.avatar;
      pinImg.alt = pin.offer.type;
      return pinItem;
    },

    renderPins: function (pinsNumber) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pinsNumber.length; i++) {
        fragment.appendChild(window.generatePins.createPin(pinsNumber[i]));
      }
      mapPins.appendChild(fragment);
    }
  };

  var generateMocks = function (mocksNumber) {
    var mocks = [];
    for (var i = 0; i < mocksNumber; i++) {
      var mock = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          type: HOUSING_TYPES[window.utils.getRandomNumber(0, HOUSING_TYPES.length - 1)],
        },
        location: {
          x: window.utils.getRandomNumber(0, 1200),
          y: window.utils.getRandomNumber(130, 630),
        }
      };
      mocks.push(mock);
    }
    return mocks;
  };

  window.marketOffers = generateMocks(8);
})();
