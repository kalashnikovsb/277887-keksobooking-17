'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.card = {

    generateCard: function (pinItem, data) {
      pinItem.addEventListener('click', function () {
        console.log(pinItem);
        console.log(data);
        console.log(cardTemplate);
      });
    }

  };

})();
