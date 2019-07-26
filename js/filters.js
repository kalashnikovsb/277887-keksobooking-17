'use strict';
(function () {

  var typeFilter = document.querySelector('#housing-type');

  var filterType = function (currentItem, type) {
    switch (type) {
      case 'any':
      case currentItem.offer.type:
        return true;
      default:
        return false;
    }
  };

  var currentFilter = {
    housingType: 'any',
  };

  var filters = {
    housingType: filterType,
  };

  typeFilter.addEventListener('change', function (evt) {
    currentFilter.housingType = evt.target.value;

    var tempPins = window.filteredPins.filter(function (currentItem) {
      for (var key in currentFilter) {
        if (!filters[key](currentItem, currentFilter[key])) {
          return false;
        }
      }
      return true;
    });
    window.pins.deletePins();
    window.pins.renderPins(tempPins);
  });

})();
