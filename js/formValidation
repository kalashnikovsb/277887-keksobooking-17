'use strict';
(function () {
  var housingTypeSelect = document.querySelector('#type');
  var pricePerNightInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  housingTypeSelect.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        pricePerNightInput.placeholder = '0';
        pricePerNightInput.min = '0';
        break;
      case 'flat':
        pricePerNightInput.placeholder = '1000';
        pricePerNightInput.min = '1000';
        break;
      case 'house':
        pricePerNightInput.placeholder = '5000';
        pricePerNightInput.min = '5000';
        break;
      case 'palace':
        pricePerNightInput.placeholder = '10000';
        pricePerNightInput.min = '10000';
        break;
    }
  });

  timeInSelect.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < 3; i++) {
      if (timeOutSelect.options[i].value === selectedOption) {
        timeOutSelect.options[i].selected = 'true';
      }
    }
  });
  timeOutSelect.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < 3; i++) {
      if (timeInSelect.options[i].value === selectedOption) {
        timeInSelect.options[i].selected = 'true';
      }
    }
  });
})();
