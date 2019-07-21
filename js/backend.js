'use strict';
(function () {

  window.backend = {
    load: function (successFunction) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          console.log(xhr.response);
          successFunction(xhr.response);
        } else {
          console.log(xhr.status);
        }
      });
    },

  };
})();
