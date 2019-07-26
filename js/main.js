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
    adForm.reset();
    window.mainPinRestoreCoords();
    window.pins.deletePins();
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
    // Загрузка данных с сервера
    window.backend.load(successLoad);
    // Отображение начальных меток без фильтра
    window.pins.renderPins(window.filteredPins);
    window.main.isActive = true;
  }
};

// Скопировал загруженные данные
var successLoad = function (data) {
  window.pins.loadedData = data;
  window.filteredPins = window.pins.loadedData.slice();
};

// Код приложения
window.main.disableActiveMode();
