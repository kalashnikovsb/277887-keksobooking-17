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
        }
      });
    },

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://js.dump.academy/keksobooking');
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
