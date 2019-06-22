'use strict';

var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;
var housingTypes = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateMocks = function (mocksNumber) {
  var mocks = [];
  for (var i = 0; i < mocksNumber; i++) {
    var mock = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        type: housingTypes[getRandomNumber(0, housingTypes.length)],
      },
      location: {
        x: getRandomNumber(0, 1200),
        y: getRandomNumber(130, 630),
      }
    };
    mocks.push(mock);
  }
  return mocks;
};

var createPin = function (pin) {
  var pinItem = pinTemplate.cloneNode(true);
  var pinImg = pinItem.querySelector('img');
  pinItem.style = 'left: ' + (pin.location.x - (PIN_SIZE_X / 2)) + 'px; top: ' + (pin.location.y - PIN_SIZE_Y) + 'px;';
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.type;
  return pinItem;
};

var renderPins = function (pinsNumber) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsNumber.length; i++) {
    fragment.appendChild(createPin(pinsNumber[i]));
  }
  mapPins.appendChild(fragment);
};

map.classList.remove('map--faded');
var marketOffers = generateMocks(8);
renderPins(marketOffers);
