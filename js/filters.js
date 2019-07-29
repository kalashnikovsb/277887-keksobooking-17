'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelectorAll('#housing-features input');

  // Экспорт
  window.filters = {
    resetFilters: function () {
      filterForm.reset();
      featuresFilter = Array.from(featuresFilter);
      featuresFilter.forEach(function (currentItem) {
        currentItem.removeAttribute('checked');
      });
      currentFilter = {
        housingType: 'any',
        housingPrice: 'any',
        housingRooms: 'any',
        housingGuests: 'any',
      };
    },
  };

  // Функции фильтрации:
  var filterType = function (currentItem, type) {
    switch (type) {
      case 'any':
      case currentItem.offer.type:
        return true;
      default:
        return false;
    }
  };

  var filterPrice = function (currentItem, string) {
    var textValue;
    if (string === 'any') {
      return true;
    }
    if (currentItem.offer.price < 10000) {
      textValue = 'low';
    }
    if (currentItem.offer.price > 50000) {
      textValue = 'high';
    }
    if (currentItem.offer.price >= 10000 && currentItem.offer.price <= 50000) {
      textValue = 'middle';
    }
    switch (string) {
      case textValue:
        return true;
      default:
        return false;
    }
  };

  var filterRooms = function (currentItem, rooms) {
    if (rooms === 'any') {
      return true;
    }
    switch (currentItem.offer.rooms) {
      case +rooms:
        return true;
      default:
        return false;
    }
  };

  var filterGuests = function (currentItem, guests) {
    if (guests === 'any') {
      return true;
    }
    switch (currentItem.offer.guests) {
      case +guests:
        return true;
      default:
        return false;
    }
  };

  var filterFeature = function (currentItem, feature) {
    if (currentItem.offer.features.indexOf(feature) !== -1) {
      return true;
    }
    return false;
  };

  // Текущие настройки фильтра. Фильтры по чекбоксам появляются при нажатии
  var currentFilter = {
    housingType: 'any',
    housingPrice: 'any',
    housingRooms: 'any',
    housingGuests: 'any',
  };

  // Список функций для фильтрации
  var filters = {
    housingType: filterType,
    housingPrice: filterPrice,
    housingRooms: filterRooms,
    housingGuests: filterGuests,
    wifi: filterFeature,
    dishwasher: filterFeature,
    parking: filterFeature,
    washer: filterFeature,
    elevator: filterFeature,
    conditioner: filterFeature,
  };

  // Функция фильтрации для всех фильтров
  var getFilteredPins = function () {
    var tempPins = window.pins.loadedData.filter(function (currentItem) {
      for (var key in currentFilter) {
        if (!filters[key](currentItem, currentFilter[key])) {
          return false;
        }
      }
      return true;
    });
    return tempPins;
  };

  // Обработчики для фильтрации по Селектам
  typeFilter.addEventListener('change', function (evt) {
    currentFilter.housingType = evt.target.value;
    var tempPins = getFilteredPins();
    window.debounce(window.pins.refreshPins, tempPins.slice(0, 5));
  });

  priceFilter.addEventListener('change', function (evt) {
    currentFilter.housingPrice = evt.target.value;
    var tempPins = getFilteredPins();
    window.debounce(window.pins.refreshPins, tempPins.slice(0, 5));
  });

  roomsFilter.addEventListener('change', function (evt) {
    currentFilter.housingRooms = evt.target.value;
    var tempPins = getFilteredPins();
    window.debounce(window.pins.refreshPins, tempPins.slice(0, 5));
  });

  guestsFilter.addEventListener('change', function (evt) {
    currentFilter.housingGuests = evt.target.value;
    var tempPins = getFilteredPins();
    window.debounce(window.pins.refreshPins, tempPins.slice(0, 5));
  });

  // Обработчики для фильтрафии по чекбоксам
  for (var i = 0; i < featuresFilter.length; i++) {
    featuresFilter[i].addEventListener('change', function (evt) {

      // Создается ключ типа wifi: 'wifi'
      currentFilter[evt.target.value] = evt.target.value;

      // Проверка включен или выключен чекбокс
      if (evt.target.hasAttribute('checked')) {
        delete currentFilter[evt.target.value];
        evt.target.removeAttribute('checked');
      } else if (!evt.target.hasAttribute('checked')) {
        evt.target.setAttribute('checked', '');
      }

      var tempPins = getFilteredPins();
      window.debounce(window.pins.refreshPins, tempPins.slice(0, 5));
    });
  }

})();
