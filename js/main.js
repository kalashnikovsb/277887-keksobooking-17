'use strict';
var adFormElements = document.querySelectorAll('.ad-form__element, .ad-form-header');
var filterFormElements = document.querySelectorAll('.map__filter, .map__features');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

window.main = {
  // По умолчанию страница в неактивном режиме
  isActive: false,

  disableActiveMode: function () {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < filterFormElements.length; i++) {
      filterFormElements[i].setAttribute('disabled', 'disabled');
    }
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    // Сбрасываю форму объявления
    window.form.reset();

    // Сбрасываю форму фильтроа
    window.filters.reset();

    window.mainPinRestoreCoords();
    window.pins.remove();
    window.card.remove();
    window.main.isActive = false;
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

    // Отображение начальных меток без фильтра
    window.pins.render(window.pins.loadedData.slice(0, 5));
    window.main.isActive = true;
  }
};

// Код приложения
window.main.disableActiveMode();
