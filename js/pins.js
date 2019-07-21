'use strict';
(function () {
  var PIN_SIZE_X = 50;
  var PIN_SIZE_Y = 70;

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    // Данные которые будут загружены, изначально их нет
    loadedData: [],

    generatePin: function (pin) {
      var pinItem = pinTemplate.cloneNode(true);
      var pinImg = pinItem.querySelector('img');
      pinItem.style = 'left: ' + (pin.location.x - PIN_SIZE_X / 2) + 'px; top: ' + (pin.location.y - PIN_SIZE_Y) + 'px;';
      pinImg.src = pin.author.avatar;
      pinImg.alt = pin.offer.type;
      return pinItem;
    },

    renderPins: function (pinsArray) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pinsArray.length; i++) {
        fragment.appendChild(window.pins.generatePin(pinsArray[i]));
      }
      mapPinsBlock.appendChild(fragment);
    },

    // Удаляет все метки кроме главной. Срабатывает только в активном режиме
    deletePins: function () {
      var mapPins = document.querySelectorAll('.map__pin');
      if (window.main.isActive) {
        for (var i = 0; i < mapPins.length; i++) {
          if (!mapPins[i].classList.contains('map__pin--main')) {
            mapPinsBlock.removeChild(mapPins[i]);
          }
        }
      }
    },
  };

})();
