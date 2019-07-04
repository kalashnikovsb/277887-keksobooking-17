'use strict';
(function () {
  var MAIN_PIN_ACTIVE_SIZE_X = 62;
  var MAIN_PIN_ACTIVE_SIZE_Y = 80;

  var MIN_COORDS_X = 0;
  var MAX_COORDS_X = 1200;
  var MIN_COORDS_Y = 130;
  var MAX_COORDS_Y = 630;

  window.mapMainPin.addEventListener('mousedown', function (evt) {
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
      window.mapMainPin.style.top = (window.mapMainPin.offsetTop - shift.y) + 'px';
      window.mapMainPin.style.left = (window.mapMainPin.offsetLeft - shift.x) + 'px';
      window.addressField.value = (parseInt(window.mapMainPin.style.left, 10) + MAIN_PIN_ACTIVE_SIZE_X / 2) + ', ' + (parseInt(window.mapMainPin.style.top, 10) + MAIN_PIN_ACTIVE_SIZE_Y);

      (function () {
        var minPinX = MIN_COORDS_X - MAIN_PIN_ACTIVE_SIZE_X / 2;
        var maxPinX = MAX_COORDS_X - MAIN_PIN_ACTIVE_SIZE_X / 2;
        var minPinY = MIN_COORDS_Y - MAIN_PIN_ACTIVE_SIZE_Y;
        var maxPinY = MAX_COORDS_Y - MAIN_PIN_ACTIVE_SIZE_Y;
        if (parseInt(window.mapMainPin.style.left, 10) < minPinX) {
          window.mapMainPin.style.left = minPinX + 'px';
        }
        if (parseInt(window.mapMainPin.style.left, 10) > maxPinX) {
          window.mapMainPin.style.left = maxPinX + 'px';
        }
        if (parseInt(window.mapMainPin.style.top, 10) < minPinY) {
          window.mapMainPin.style.top = minPinY + 'px';
        }
        if (parseInt(window.mapMainPin.style.top, 10) > maxPinY) {
          window.mapMainPin.style.top = maxPinY + 'px';
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
          window.mapMainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.mapMainPin.addEventListener('click', onClickPreventDefault);
        window.enableActiveMode();
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
