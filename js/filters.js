'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var featuresList = document.querySelectorAll('#housing-features .map__checkbox');
  var lastTimeout;

  // Экспорт
  window.filters = {
    reset: function () {
      filterForm.reset();
      featuresList = Array.from(featuresList);
      featuresList.forEach(function (currentItem) {
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

  // Устранение дребезга
  var debounce = function (func, data) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      func(data);
    }, 500);
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

  // Сортировка по селектам
  var filterFromSelect = function (obj, filter) {
    currentFilter[filter] = obj.value;
    var tempPins = getFilteredPins();

    debounce(window.pins.refresh, tempPins.slice(0, 5));
  };

  // Сортировка по инпутам
  var filterFromInput = function (obj) {
    currentFilter[obj.value] = obj.value;

    if (obj.hasAttribute('checked')) {
      delete currentFilter[obj.value];
      obj.toggleAttribute('checked');
    } else {
      obj.toggleAttribute('checked');
    }
    var tempPins = getFilteredPins();

    debounce(window.pins.refresh, tempPins.slice(0, 5));

  };

  // Обработчик изменения всей формы
  filterForm.addEventListener('change', function (evt) {
    if (evt.target instanceof HTMLSelectElement) {
      var index = evt.target.id.lastIndexOf('-') + 1;
      var string = evt.target.id.slice(index);
      switch (string) {
        case 'type':
          filterFromSelect(evt.target, 'housingType');
          break;
        case 'price':
          filterFromSelect(evt.target, 'housingPrice');
          break;
        case 'rooms':
          filterFromSelect(evt.target, 'housingRooms');
          break;
        case 'guests':
          filterFromSelect(evt.target, 'housingGuests');
          break;
      }
    } else if (evt.target instanceof HTMLInputElement) {
      filterFromInput(evt.target);
    }
  });

})();
