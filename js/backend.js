'use strict';
(function () {

  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          // При неудачной загрузке с сервера по ТЗ ничего делать не надо, буду показывать ошибку в консоль
          console.log(xhr.status);
        }
      });
    },

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://js.dump.academy/keksobooking/data');
      xhr.send(data);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError();
        }
      });
    },

  };
})();
