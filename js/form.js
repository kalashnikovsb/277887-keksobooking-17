'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var housingTypeSelect = document.querySelector('#type');
  var pricePerNightInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var adFormReset = document.querySelector('.ad-form__reset');
  var mainElement = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreviewImage = document.querySelector('.ad-form-header__preview img[alt=\'Аватар пользователя\']');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = document.querySelector('.ad-form__input');

  window.form = {

    resetForm: function () {
      adForm.reset();

      // Удаляю фото аватара
      avatarPreviewImage.src = 'img/muffin-grey.svg';

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
        avatarPreviewImage.src = reader.result;
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
        imgElement.width = 70;
        imgElement.height = 70;
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

  // Синхронизация комнат с гостями
  roomsSelect.addEventListener('change', function (evt) {

    // Убираю все disabled при изменении элемента формы
    Array.from(guestsSelect.options).forEach(function (option) {
      option.removeAttribute('disabled');
    });

    // Остальные комнаты
    Array.from(guestsSelect.options).forEach(function (option) {
      if (evt.target.value < option.value) {
        option.setAttribute('disabled', '');
      }
      if (option.value === evt.target.value) {
        guestsSelect.querySelector('[selected = \'\' ]').removeAttribute('selected');
        option.setAttribute('selected', '');
      }
      if (option.value === '0') {
        option.removeAttribute('selected');
        option.setAttribute('disabled', '');
      }
    });

    // 100 комнат
    if (evt.target.value === '100') {
      Array.from(guestsSelect.options).forEach(function (option) {
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

  // Синхронизация гостей с комнатами
  guestsSelect.addEventListener('change', function (evt) {
    Array.from(roomsSelect.options).forEach(function (option) {
      option.removeAttribute('disabled');
    });

    Array.from(roomsSelect.options).forEach(function (option) {
      if (evt.target.value > option.value) {
        option.setAttribute('disabled', '');
      }
      if (option.value === evt.target.value) {
        roomsSelect.querySelector('[selected = \'\' ]').removeAttribute('selected');
        option.setAttribute('selected', '');
      }
      if (option.value === '100') {
        option.removeAttribute('selected');
        option.setAttribute('disabled', '');
      }
    });

    if (evt.target.value === '0') {
      Array.from(roomsSelect.options).forEach(function (option) {
        if (option.value !== '100') {
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
  timeInSelect.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < 3; i++) {
      if (timeOutSelect.options[i].value === selectedOption) {
        timeOutSelect.options[i].selected = 'true';
      }
    }
  });

  // Синхронизация времени выезда с заездом
  timeOutSelect.addEventListener('change', function (evt) {
    var selectedOption = evt.target.value;
    for (var i = 0; i < 3; i++) {
      if (timeInSelect.options[i].value === selectedOption) {
        timeInSelect.options[i].selected = 'true';
      }
    }
  });

  // Успешная отправка данных. Возврат неактивного состояния и отображение сообщения
  var successUpload = function () {
    mainElement.appendChild(successMessage);

    var onMainElementClick = function () {
      mainElement.removeChild(successMessage);
      window.removeEventListener('click', onMainElementClick);
      window.removeEventListener('keydown', onMainElementEscPress);
    };

    var onMainElementEscPress = function (evt) {
      if (evt.keyCode === 27) {
        mainElement.removeChild(successMessage);
        window.removeEventListener('click', onMainElementClick);
        window.removeEventListener('keydown', onMainElementEscPress);
      }
    };

    window.addEventListener('click', onMainElementClick);
    window.addEventListener('keydown', onMainElementEscPress);
    window.main.disableActiveMode();
  };

  // Кнопка очистить
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.resetForm();
    window.main.disableActiveMode();
  });

  // Неуспешная отправка, окно закрывается при нажатии на кнопку
  var unsuccessUpload = function () {
    mainElement.appendChild(errorMessage);

    var onMainElementClick = function () {
      mainElement.removeChild(errorMessage);
      window.removeEventListener('click', onMainElementClick);
      window.removeEventListener('keydown', onMainElementEscPress);
      errorButton.removeEventListener('click', onErrorButtonClick);
    };

    var onMainElementEscPress = function (evt) {
      if (evt.keyCode === 27) {
        mainElement.removeChild(errorMessage);
        window.removeEventListener('click', onMainElementClick);
        window.removeEventListener('keydown', onMainElementEscPress);
        errorButton.removeEventListener('click', onErrorButtonClick);
      }
    };

    var onErrorButtonClick = function () {
      mainElement.removeChild(errorMessage);
      window.removeEventListener('click', onMainElementClick);
      window.removeEventListener('keydown', onMainElementEscPress);
      errorButton.removeEventListener('click', onErrorButtonClick);
    };

    window.addEventListener('click', onMainElementClick);
    window.addEventListener('keydown', onMainElementEscPress);
    errorButton.addEventListener('click', onErrorButtonClick);
  };

  // Отправляю данные на сервер
  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), successUpload, unsuccessUpload);
    evt.preventDefault();
  });

})();
