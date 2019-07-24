'use strict';

(function () {
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var wifiFilter = document.querySelector('#filter-wifi');
  var dishwasherFilter = document.querySelector('#filter-dishwasher');
  var parkingFilter = document.querySelector('#filter-parking');
  var washerFilter = document.querySelector('#filter-washer');
  var elevatorFilter = document.querySelector('#filter-elevator');
  var conditionerFilter = document.querySelector('#filter-conditioner');

  // В функции successLoad в pins.js присвоено window.pins.loadedData
  window.filteredPins;
  window.summaryPins = [];

  // Сортировка по типу жилья
  typeFilter.addEventListener('change', function (evt) {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      if (evt.target.value === 'any') {
        return currentItem.offer.type || currentItem.offer.type === false;
      } else {
        return currentItem.offer.type === evt.target.value;
      }
    });

    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  // Сортировка по цене
  priceFilter.addEventListener('change', function (evt) {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      if (evt.target.value === 'any') {
        return currentItem.offer.price || currentItem.offer.price === false;
      } else if (evt.target.value === 'low') {
        return currentItem.offer.price < 10000;
      } else if (evt.target.value === 'high') {
        return currentItem.offer.price > 50000;
      } else if (evt.target.value === 'middle') {
        return currentItem.offer.price >= 10000 && currentItem.offer.price <= 50000;
      }
    });

    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  // Сортировка по количеству комнат
  roomsFilter.addEventListener('change', function (evt) {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      if (evt.target.value === 'any') {
        return currentItem.offer.rooms || currentItem.offer.rooms === false;
      } else if (evt.target.value === '1') {
        return currentItem.offer.rooms === 1;
      } else if (evt.target.value === '2') {
        return currentItem.offer.rooms === 2;
      } else if (evt.target.value === '3') {
        return currentItem.offer.rooms === 3;
      }
    });

    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  // Сортировка по количеству гостей
  guestsFilter.addEventListener('change', function (evt) {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      if (evt.target.value === 'any') {
        return currentItem.offer.guests || currentItem.offer.guests === false;
      } else if (evt.target.value === '0') {
        return currentItem.offer.guests === 0;
      } else if (evt.target.value === '1') {
        return currentItem.offer.guests === 1;
      } else if (evt.target.value === '2') {
        return currentItem.offer.guests === 2;
      }
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  wifiFilter.addEventListener('change', function () {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      return currentItem.offer.features.indexOf('wifi') !== -1;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  dishwasherFilter.addEventListener('change', function () {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      return currentItem.offer.features.indexOf('dishwasher') !== -1;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  parkingFilter.addEventListener('change', function () {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      return currentItem.offer.features.indexOf('parking') !== -1;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  washerFilter.addEventListener('change', function () {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      return currentItem.offer.features.indexOf('washer') !== -1;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  elevatorFilter.addEventListener('change', function () {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      return currentItem.offer.features.indexOf('elevator') !== -1;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

  conditionerFilter.addEventListener('change', function () {
    var tempPins = window.filteredPins.filter(function (currentItem) {
      return currentItem.offer.features.indexOf('conditioner') !== -1;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

})();
