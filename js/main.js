'use strict';

var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;
var MAIN_PIN_INACTIVE_SIZE_X = 62;
var MAIN_PIN_INACTIVE_SIZE_Y = 62;
var MAIN_PIN_ACTIVE_SIZE_X = 62;
var MAIN_PIN_ACTIVE_SIZE_Y = 80;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapMainPin = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormElements = document.querySelectorAll('.ad-form__element, .ad-form-header');
var filterFormElements = document.querySelectorAll('.map__filter, .map__features');
var addressField = document.querySelector('input#address');
var marketOffers;
var housingTypeSelect = document.querySelector('#type');
var pricePerNightInput = document.querySelector('#price');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

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
  pinItem.style = 'left: ' + (pin.location.x - PIN_SIZE_X / 2) + 'px; top: ' + (pin.location.y - PIN_SIZE_Y) + 'px;';
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

var onMapMainPinClick = function () {
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
  for (i = 0; i < filterFormElements.length; i++) {
    filterFormElements[i].removeAttribute('disabled');
  }
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderPins(marketOffers);
};

// Функция перемещения первоначальной метки по карте
var movePin = function () {
  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
      mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
      // Координаты в поле адрес при активном режиме, метка с острием, координаты соответствуют острию метки
      addressField.value = (parseInt(mapMainPin.style.left, 10) + MAIN_PIN_ACTIVE_SIZE_X / 2) + ', ' + (parseInt(mapMainPin.style.top, 10) + MAIN_PIN_ACTIVE_SIZE_Y);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapMainPin.removeEventListener('click', onClickPreventDefault);
        };
        mapMainPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};

// Зависимость цены за ночь от типа жилья
housingTypeSelect.addEventListener('change', function (evt) {
  var option = evt.target.value;
  if (option === 'bungalo') {
    pricePerNightInput.placeholder = '0';
    pricePerNightInput.min = '0';
  } else if (option === 'flat') {
    pricePerNightInput.placeholder = '1000';
    pricePerNightInput.min = '1000';
  } else if (option === 'house') {
    pricePerNightInput.placeholder = '5000';
    pricePerNightInput.min = '5000';
  } else if (option === 'palace') {
    pricePerNightInput.placeholder = '10000';
    pricePerNightInput.min = '10000';
  }
});

// Синхронизация времени заезда и выезда
timeInSelect.addEventListener('change', function (evt) {
  var selectedOption = evt.target.value;
  for (i = 0; i < 3; i++) {
    if (timeOutSelect.options[i].value === selectedOption) {
      timeOutSelect.options[i].selected = 'true';
    }
  }
});
timeOutSelect.addEventListener('change', function (evt) {
  var selectedOption = evt.target.value;
  for (i = 0; i < 3; i++) {
    if (timeInSelect.options[i].value === selectedOption) {
      timeInSelect.options[i].selected = 'true';
    }
  }
});

// Скрываю элементы форм в неактивном режиме
for (var i = 0; i < adFormElements.length; i++) {
  adFormElements[i].setAttribute('disabled', 'disabled');
}
for (i = 0; i < filterFormElements.length; i++) {
  filterFormElements[i].setAttribute('disabled', 'disabled');
}

// Координаты в поле адрес при неактивном режиме, метка круглая, координаты соответствуют центру метки
addressField.value = (parseInt(mapMainPin.style.left, 10) + MAIN_PIN_INACTIVE_SIZE_X / 2) + ', ' + (parseInt(mapMainPin.style.top, 10) + MAIN_PIN_INACTIVE_SIZE_Y / 2);

// Код приложения
movePin();
marketOffers = generateMocks(8);
mapMainPin.addEventListener('click', onMapMainPinClick);
