'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var featuresList = document.querySelectorAll('#housing-features .map__checkbox');

  // Экспорт
  window.filters = {
    reset: function () {
      filterForm.reset();
      featuresList = Array.from(featuresList);
      featuresList.forEach(function (currentItem) {
        currentItem.removeAttribute('checked');
      });
      currentFilter = {
        type: 'any',
        price: 'any',
        rooms: 'any',
        guests: 'any',
        wifi: false,
        dishwasher: false,
        parking: false,
        washer: false,
        elevator: false,
        conditioner: false,
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

  var filterFeature = function (currentItem, isNecessary, feature) {
    if (isNecessary) {
      return currentItem.offer.features.indexOf(feature) !== -1;
    }
    return true;
  };

  // Текущие настройки фильтра. Фильтры по чекбоксам появляются при нажатии
  var currentFilter = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
  };

  // Список функций для фильтрации
  var filters = {
    type: filterType,
    price: filterPrice,
    rooms: filterRooms,
    guests: filterGuests,
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
        if (!filters[key](currentItem, currentFilter[key], key)) {
          return false;
        }
      }
      return true;
    });
    return tempPins;
  };

  filterForm.addEventListener('change', function (evt) {
    var target = evt.target;
    switch (evt.target.tagName) {
      case 'SELECT':
        var filter = target.id.split('-')[1];
        currentFilter[filter] = target.value;
        break;
      case 'INPUT':
        currentFilter[target.value] = !target.hasAttribute('checked');
        target.toggleAttribute('checked');
    }
    var tempPins = getFilteredPins();
    window.utils.debounce(window.pins.refresh, tempPins.slice(0, 5));
  });

})();
