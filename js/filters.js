'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var featuresList = document.querySelectorAll('#housing-features .map__checkbox');
  var enterKeyCode = 13;
  var lowPrice = 10000;
  var highPrice = 50000;

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

  var filterType = function (currentItem, type) {
    return type === 'any' || type === currentItem.offer.type;
  };

  var filterPrice = function (currentItem, string) {
    var textValue;
    if (string === 'any') {
      return true;
    }
    if (currentItem.offer.price < lowPrice) {
      textValue = 'low';
    }
    if (currentItem.offer.price > highPrice) {
      textValue = 'high';
    }
    if (currentItem.offer.price >= lowPrice && currentItem.offer.price <= highPrice) {
      textValue = 'middle';
    }

    return textValue === string;
  };

  var filterRooms = function (currentItem, rooms) {
    return rooms === 'any' || +rooms === currentItem.offer.rooms;
  };

  var filterGuests = function (currentItem, guests) {
    return guests === 'any' || +guests === currentItem.offer.rooms;
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

//  filterForm.addEventListener('change', function (evt) {
//    var target = evt.target;
//    switch (evt.target.tagName) {
//      case 'SELECT':
//        var filter = target.id.split('-')[1];
//        currentFilter[filter] = target.value;
//        break;
//      case 'INPUT':
//        currentFilter[target.value] = !target.hasAttribute('checked');
//        target.toggleAttribute('checked');
//    }
//    var tempPins = getFilteredPins();
//    window.utils.debounce(window.pins.refresh, tempPins.slice(0, 5));
//  });

  var changeForm = function (evt) {
    evt.preventDefault();
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
  };

  filterForm.addEventListener('change', changeForm);

  var housingFeatures = document.querySelector('#housing-features');
  housingFeatures.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      changeForm(evt);
    }
  });

})();
