'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_HEIGHT = 70;
  var PHOTO_WIDTH = 70;
  var MIN_BUNGALO_PRICE = '0';
  var MIN_FLAT_PRICE = '1000';
  var MIN_HOUSE_PRICE = '5000';
  var MIN_PALACE_PRICE = '10000';

  var adForm = document.querySelector('.ad-form');
  var types = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var adFormFeatures = document.querySelector('.features');
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
        imgElement.width = PHOTO_WIDTH;
        imgElement.height = PHOTO_HEIGHT;
        imgElement.alt = 'Изображение недвижимости';
        imgElement.src = reader.result;
        photoContainer.lastElementChild.appendChild(imgElement);
        divElement.classList.add('ad-form__photo');
        photoContainer.appendChild(divElement);
      });

      reader.readAsDataURL(file);
    }

  });

  types.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        price.placeholder = MIN_BUNGALO_PRICE;
        price.min = MIN_BUNGALO_PRICE;
        break;
      case 'flat':
        price.placeholder = MIN_FLAT_PRICE;
        price.min = MIN_FLAT_PRICE;
        break;
      case 'house':
        price.placeholder = MIN_HOUSE_PRICE;
        price.min = MIN_HOUSE_PRICE;
        break;
      case 'palace':
        price.placeholder = MIN_PALACE_PRICE;
        price.min = MIN_PALACE_PRICE;
        break;
    }
  });

  // Синхронизация комнат с гостями
  rooms.addEventListener('change', function (evt) {
    var RoomsToGuestsMap = {
      '1': ['1'],
      '2': ['2', '1'],
      '3': ['3', '2', '1'],
      '100': ['0']
    };
    var guestsOptions = guests.querySelectorAll('option');
    var guestsValues = RoomsToGuestsMap[evt.target.value];

    guestsOptions.forEach(function (element) {
      element.removeAttribute('selected');
      element.removeAttribute('disabled');
      if (guestsValues.indexOf(element.value) === -1) {
        element.setAttribute('disabled', '');
      }
    });

    guests.value = guestsValues[0];
  });

  // Синхронизация времени заезда с выездом
  timeIn.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < timeIn.children.length; i++) {
      if (timeOut.options[i].value === selectedOption) {
        timeOut.options[i].selected = true;
      }
    }
  });

  // Синхронизация времени выезда с заездом
  timeOut.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < timeOut.children.length; i++) {
      if (timeIn.options[i].value === selectedOption) {
        timeIn.options[i].selected = true;
      }
    }
  });

  // Кнопки выбора особенностей
  adFormFeatures.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      evt.preventDefault();
      evt.target.click();
    }
  });

  // Кнопка очистить
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.reset();
    window.main.disableActiveMode();
  });

  // Успешная отправка данных. Возврат неактивного состояния и отображение сообщения
  var onDataSuccessUpload = function () {
    main.appendChild(successMessage);

    var onWindowClick = function () {
      main.removeChild(successMessage);
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('keydown', onWindowEscPress);
    };

    var onWindowEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY_CODE) {
        onWindowClick();
      }
    };

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowEscPress);
    window.main.disableActiveMode();
  };

  // Неуспешная отправка, окно закрывается при нажатии на кнопку
  var onDataErrorUpload = function () {
    main.appendChild(errorMessage);

    var onWindowClick = function () {
      main.removeChild(errorMessage);
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('keydown', onWindowEscPress);
      errorButton.removeEventListener('click', onWindowClick);
    };

    var onWindowEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY_CODE) {
        onWindowClick();
      }
    };

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowEscPress);
    errorButton.addEventListener('click', onWindowClick);
  };

  // Отправляю данные на сервер
  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), onDataSuccessUpload, onDataErrorUpload);
    evt.preventDefault();
  });

})();
