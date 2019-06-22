'use strict';

var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormElements = document.querySelectorAll('.ad-form fieldset');
var filterFormElements = document.querySelectorAll('.map__filters > *');
var addressField = document.querySelector('input#address');

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
        type: HOUSING_TYPES[getRandomNumber(0, HOUSING_TYPES.length - 1)],
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

var enableActiveMode = function () {
  for (i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
  for (i = 0; i < filterFormElements.length; i++) {
    filterFormElements[i].removeAttribute('disabled');
  }
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderPins(marketOffers);
};

for (var i = 0; i < adFormElements.length; i++) {
  adFormElements[i].setAttribute('disabled', 'disabled');
}

for (i = 0; i < filterFormElements.length; i++) {
  filterFormElements[i].setAttribute('disabled', 'disabled');
}

var marketOffers = generateMocks(8);
mapPinMain.addEventListener('click', enableActiveMode);
addressField.value = parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10);
