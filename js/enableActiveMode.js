'use strict';
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  window.enableActiveMode = function () {
    for (var i = 0; i < window.adFormElements.length; i++) {
      window.adFormElements[i].removeAttribute('disabled');
    }
    for (i = 0; i < window.filterFormElements.length; i++) {
      window.filterFormElements[i].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.generatePins.renderPins(window.marketOffers);
  };
})();
