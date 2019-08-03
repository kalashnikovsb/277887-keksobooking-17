'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var housingTypeSelect = document.querySelector('#type');
  var pricePerNightInput = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var adFormReset = document.querySelector('.ad-form__reset');
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img[alt=\'Аватар пользователя\']');
  var avatarDefaultSrc = 'img/muffin-grey.svg';
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = document.querySelector('.ad-form__input');
  var escKeyCode = 27;
  var photoHeight = 70;
  var photoWidth = 70;
  var minBungaloPrice = '0';
  var minFlatPrice = '1000';
  var minHousePrice = '5000';
  var minPalacePrice = '10000';

  window.form = {

    reset: function () {
      adForm.reset();

      // Удаляю фото аватара
      avatarPreview.src = avatarDefaultSrc;

      // Удаляю фото недвижимости
      var photoPreviews = document.querySelectorAll('.ad-form__photo');
      if (photoPreviews[0].lastElementChild) {
        photoPreviews[0].lastElementChild.remove();
      }
      for (var i = 1; i < photoPreviews.length; i++) {
        photoPreviews[i].remove();
      }
    },
  };

  // Отображение фото аватара
  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // Отображение фото недвижимости
  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var imgElement = document.createElement('img');
        var divElement = document.createElement('div');
        imgElement.width = photoWidth;
        imgElement.height = photoHeight;
        imgElement.alt = 'Изображение недвижимости';
        imgElement.src = reader.result;
        photoContainer.lastElementChild.appendChild(imgElement);
        divElement.classList.add('ad-form__photo');
        photoContainer.appendChild(divElement);
      });

      reader.readAsDataURL(file);
    }

  });

  housingTypeSelect.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        pricePerNightInput.placeholder = minBungaloPrice;
        pricePerNightInput.min = minBungaloPrice;
        break;
      case 'flat':
        pricePerNightInput.placeholder = minFlatPrice;
        pricePerNightInput.min = minFlatPrice;
        break;
      case 'house':
        pricePerNightInput.placeholder = minHousePrice;
        pricePerNightInput.min = minHousePrice;
        break;
      case 'palace':
        pricePerNightInput.placeholder = minPalacePrice;
        pricePerNightInput.min = minPalacePrice;
        break;
    }
  });

  // Синхронизация комнат с гостями
  rooms.addEventListener('change', function (evt) {

    // Остальные комнаты
    Array.from(guests.options).forEach(function (option) {
      option.removeAttribute('disabled');
      if (+evt.target.value < +option.value) {
        option.setAttribute('disabled', '');
      }
      if (option.value === evt.target.value) {
        guests.querySelector('[selected = \'\' ]').removeAttribute('selected');
        option.setAttribute('selected', '');
      }
      if (option.value === '0') {
        option.removeAttribute('selected');
        option.setAttribute('disabled', '');
      }
    });

    // 100 комнат
    if (evt.target.value === '100') {
      Array.from(guests.options).forEach(function (option) {
        if (option.value !== '0') {
          option.setAttribute('disabled', '');
          option.removeAttribute('selected');
        } else {
          option.removeAttribute('disabled');
          option.setAttribute('selected', '');
        }
      });
    }

  });

  // Синхронизация времени заезда с выездом
  timeIn.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < timeIn.children.length; i++) {
      if (timeOut.options[i].value === selectedOption) {
        timeOut.options[i].selected = 'true';
      }
    }
  });

  // Синхронизация времени выезда с заездом
  timeOut.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < timeOut.children.length; i++) {
      if (timeIn.options[i].value === selectedOption) {
        timeIn.options[i].selected = 'true';
      }
    }
  });

  // Кнопка очистить
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.reset();
    window.main.disableActiveMode();
  });

  // Успешная отправка данных. Возврат неактивного состояния и отображение сообщения
  var onUploadSuccess = function () {
    main.appendChild(successMessage);

    var onWindowClick = function () {
      main.removeChild(successMessage);
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('keydown', onWindowEscPress);
    };

    var onWindowEscPress = function (evt) {
      if (evt.keyCode === escKeyCode) {
        onWindowClick();
      }
    };

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowEscPress);
    window.main.disableActiveMode();
  };

  // Неуспешная отправка, окно закрывается при нажатии на кнопку
  var onUploadError = function () {
    main.appendChild(errorMessage);

    var onWindowClick = function () {
      main.removeChild(errorMessage);
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('keydown', onWindowEscPress);
      errorButton.removeEventListener('click', onWindowClick);
    };

    var onWindowEscPress = function (evt) {
      if (evt.keyCode === escKeyCode) {
        onWindowClick();
      }
    };

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowEscPress);
    errorButton.addEventListener('click', onWindowClick);
  };

  // Отправляю данные на сервер
  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  });

})();
