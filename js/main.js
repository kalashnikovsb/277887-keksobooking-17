'use strict';

var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;
var housingTypes = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomHousingType = function (types) {
  var randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

var mocksGeneration = function (mocksNumber) {
  var mocks = [];
  for (var i = 0; i < mocksNumber; i++) {
    var mock = {};
    mock.author = {};
    mock.offer = {};
    mock.location = {};
    mock.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    mock.offer.type = getRandomHousingType(housingTypes);
    mock.location.x = getRandomNumber(0, 1200);
    mock.location.y = getRandomNumber(130, 630);
    mocks[i] = mock;
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
var marketOffers = mocksGeneration(8);
renderPins(marketOffers);
