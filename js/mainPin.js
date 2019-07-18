'use strict';
(function () {
  var MAIN_PIN_ACTIVE_SIZE_X = 62;
  var MAIN_PIN_ACTIVE_SIZE_Y = 80;
  var MAIN_PIN_INACTIVE_SIZE_X = 62;
  var MAIN_PIN_INACTIVE_SIZE_Y = 62;
  var MIN_COORDS_X = 0;
  var MAX_COORDS_X = 1200;
  var MIN_COORDS_Y = 130;
  var MAX_COORDS_Y = 630;

  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('input#address');

  // Координаты соответстуют середине основного пина
  addressField.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_INACTIVE_SIZE_X / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_INACTIVE_SIZE_Y / 2);

  // Начальные координаты главной метки
  var mainPinStartCoordsX = parseInt(mainPin.style.left, 10);
  var mainPinStartCoordsY = parseInt(mainPin.style.top, 10);

  // Восстановление координат главной метки
  window.mainPinRestoreCoords = function () {
    mainPin.style.left = mainPinStartCoordsX + 'px';
    mainPin.style.top = mainPinStartCoordsY + 'px';
    addressField.value = (mainPinStartCoordsX + MAIN_PIN_INACTIVE_SIZE_X / 2) + ', ' + (mainPinStartCoordsY + MAIN_PIN_INACTIVE_SIZE_Y / 2);
  };

  mainPin.addEventListener('mousedown', function (evt) {
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
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      // Координаты соответстуют острому концу основного пина
      addressField.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_ACTIVE_SIZE_X / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_ACTIVE_SIZE_Y);

      (function () {
        var minPinX = MIN_COORDS_X - MAIN_PIN_ACTIVE_SIZE_X / 2;
        var maxPinX = MAX_COORDS_X - MAIN_PIN_ACTIVE_SIZE_X / 2;
        var minPinY = MIN_COORDS_Y - MAIN_PIN_ACTIVE_SIZE_Y;
        var maxPinY = MAX_COORDS_Y - MAIN_PIN_ACTIVE_SIZE_Y;
        if (parseInt(mainPin.style.left, 10) < minPinX) {
          mainPin.style.left = minPinX + 'px';
        }
        if (parseInt(mainPin.style.left, 10) > maxPinX) {
          mainPin.style.left = maxPinX + 'px';
        }
        if (parseInt(mainPin.style.top, 10) < minPinY) {
          mainPin.style.top = minPinY + 'px';
        }
        if (parseInt(mainPin.style.top, 10) > maxPinY) {
          mainPin.style.top = maxPinY + 'px';
        }
      })();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
        window.main.enableActiveMode();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
