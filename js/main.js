'use strict';
var adFormElements = document.querySelectorAll('.ad-form__element, .ad-form-header');
var filterFormElements = document.querySelectorAll('.map__filter, .map__features');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

window.main = {
  disableActiveMode: function () {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }

    for (i = 0; i < filterFormElements.length; i++) {
      filterFormElements[i].setAttribute('disabled', 'disabled');
    }
  },

  enableActiveMode: function () {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    for (i = 0; i < filterFormElements.length; i++) {
      filterFormElements[i].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.generatePins.renderPins(window.marketOffers);
  }
};

// Код приложения
window.main.disableActiveMode();
