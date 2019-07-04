'use strict';
var MAIN_PIN_INACTIVE_SIZE_X = 62;
var MAIN_PIN_INACTIVE_SIZE_Y = 62;

window.mapMainPin = document.querySelector('.map__pin--main');
window.addressField = document.querySelector('input#address');
window.adFormElements = document.querySelectorAll('.ad-form__element, .ad-form-header');
window.filterFormElements = document.querySelectorAll('.map__filter, .map__features');

// Недоступность элементов в неактивном режиме
for (var i = 0; i < window.adFormElements.length; i++) {
  window.adFormElements[i].setAttribute('disabled', 'disabled');
}
for (i = 0; i < window.filterFormElements.length; i++) {
  window.filterFormElements[i].setAttribute('disabled', 'disabled');
}

// Код приложения
window.marketOffers = window.utilities.generateMocks(8);
window.addressField.value = (parseInt(window.mapMainPin.style.left, 10) + MAIN_PIN_INACTIVE_SIZE_X / 2) + ', ' + (parseInt(window.mapMainPin.style.top, 10) + MAIN_PIN_INACTIVE_SIZE_Y / 2);
