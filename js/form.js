'use strict';
(function () {
  var housingTypeSelect = document.querySelector('#type');
  var pricePerNightInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var adForm = document.querySelector('.ad-form');

  var mainElement = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');

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

  // Успешная отправка данных. Возврат неактивного состояния и отображение сообщения
  window.successUpload = function () {
    mainElement.appendChild(successMessage);
    window.addEventListener('click', function () {
      mainElement.removeChild(successMessage);
    });
    window.main.disableActiveMode();
  };

  // Неуспешная отправка, окно закрывается при нажатии на кнопку
  window.unsuccessUpload = function () {
    mainElement.appendChild(errorMessage);
    errorButton.addEventListener('click', function () {
      mainElement.removeChild(successMessage);
    });
  };

  // Отправка данных на сервер
  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), window.successUpload, window.unsuccessUpload);
    evt.preventDefault();
  });

})();
