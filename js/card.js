'use strict';
(function () {

  var mapPinsBlock = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  window.card = {

    renderCard: function (pinItem, data) {

      // Проверяю лишние копии карточки, удаляю если есть
      if (document.querySelector('.map__card') !== null) {
        mapPinsBlock.removeChild(document.querySelector('.map__card'));
      }

      // Нахожу и удаляю активные метки если они есть
      var activePins = document.querySelectorAll('.map__pin--active');
      Array.from(activePins).forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });

      // Делаю текущую метку активной
      pinItem.classList.add('map__pin--active');

      // Копирую шаблон и вставляю в блок карты
      var card = cardTemplate.cloneNode(true);
      mapPinsBlock.appendChild(card);

      var avatar = card.querySelector('.popup__avatar');
      var title = card.querySelector('.popup__title');
      var address = card.querySelector('.popup__text--address');
      var price = card.querySelector('.popup__text--price');
      var type = card.querySelector('.popup__type');
      var capacity = card.querySelector('.popup__text--capacity');
      var time = card.querySelector('.popup__text--time');
      var featuresBlock = card.querySelector('.popup__features');
      var featuresList = card.querySelectorAll('.popup__feature');
      var description = card.querySelector('.popup__description');
      var photosBlock = card.querySelector('.popup__photos');
      var photosList;
      var close = card.querySelector('.popup__close');

      // Проверка существования аватара и установка
      if (!data.author.avatar) {
        avatar.remove();
      } else {
        avatar.src = data.author.avatar;
      }

      // Проверка существования названия и установка
      if (!data.offer.title) {
        title.remove();
      } else {
        title.innerText = data.offer.title;
      }

      // Проверка существования адреса и установка
      if (!data.offer.address) {
        address.remove();
      } else {
        address.innerText = data.offer.address;
      }

      // Проверка существования цены и установка
      if (!data.offer.price) {
        price.remove();
      } else {
        price.innerText = data.offer.price + '₽/ночь';
      }

      // Проверка существования типа и установка
      if (!data.offer.type) {
        type.remove();
      } else {
        switch (data.offer.type) {
          case 'palace':
            type.innerText = 'Дворец';
            break;
          case 'flat':
            type.innerText = 'Квартира';
            break;
          case 'house':
            type.innerText = 'Дом';
            break;
          case 'bungalo':
            type.innerText = 'Бунгало';
            break;
        }
      }

      // Проверка существования гостей и комнат
      if (!data.offer.rooms && !data.offer.guests) {
        capacity.remove();
      } else if (!data.offer.rooms) {
        capacity.innerText = 'Количество гостей: ' + data.offer.guests;
      } else if (!data.offer.guests) {
        capacity.innerText = 'Количество комнат: ' + data.offer.rooms;
      } else {
        capacity.innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      }

      // Проверка существования времени
      if (!data.offer.checkin && !data.offer.checkout) {
        time.remove();
      } else if (!data.offer.checkin) {
        time.innerText = 'Выезд до ' + data.offer.checkout;
      } else if (!data.offer.checkout) {
        time.innerText = 'Заезд после ' + data.offer.checkin;
      } else {
        time.innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      }

      // Проверка существования удобств
      if (data.offer.features.length === 0) {
        featuresBlock.remove();
      } else {
        // Удаление иконок для которых удобств нет
        for (var i = 0; i < featuresList.length; i++) {
          var featureIndex = featuresList[i].classList[1].lastIndexOf('-') + 1;
          var featureString = featuresList[i].classList[1].slice(featureIndex);
          if (data.offer.features.indexOf(featureString) === -1) {
            featuresList[i].remove();
          }
        }
      }

      // Проверка существования описания
      if (!data.offer.description) {
        description.remove();
      } else {
        description.innerText = data.offer.description;
      }

      // Проверка существования фотографий
      if (data.offer.photos.length === 0) {
        photosBlock.remove();
      } else {
        // Клонировать на 1 меньше. В разметке уже есть 1
        for (i = 0; i < data.offer.photos.length - 1; i++) {
          photosBlock.appendChild(photoTemplate.cloneNode(true));
        }
        // Найти все фото и установить им src
        photosList = card.querySelectorAll('.popup__photo');
        for (i = 0; i < photosList.length; i++) {
          photosList[i].src = data.offer.photos[i];
        }
      }

      // Обработчики закрытия
      close.addEventListener('click', function () {
        pinItem.classList.remove('map__pin--active');
        card.remove();
      });

      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          pinItem.classList.remove('map__pin--active');
          card.remove();
        }
      });

    },

    deleteCard: function () {
      if (document.querySelector('.map__card') !== null) {
        mapPinsBlock.removeChild(document.querySelector('.map__card'));
      }
    },

  };
})();
