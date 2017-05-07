(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['$q', '$state', 'dataservice', 'logger', '$translate', '$translatePartialLoader',];
  /* @ngInject */
  function MainController($q, $state, dataservice, logger, $translate, $translatePartialLoader) {
    var vm = this;
    vm.singInOnClick = singInOnClick();
    vm.title = 'Main';
    $translatePartialLoader.addPart('main');
    $translate.refresh();

    activate();

    function activate() {
      var promises = [];
      var data = {
          name: 'Admin Findmenu',
          from: 'oscarompro@gmail.com',
          to: 'oscar.otero.millan@gmail.com',
          subject: 'test inputSubject',
          text: 'test inputMessage',
          template: 'toUserTemplate'
      };

      /**dataservice.sendMail(data).then(function (response) {
          if (response) {
            console.log('Test envio email Correcto');
          } else {
            console.log('Test envio email Fallido');
            console.log(response);
          }
      });*/

      return $q.all(promises).then(function() {
        console.log('Activated Main View');
      });
    }

    //Funcionalidad de cookies
    //

    /* Eventos */
    function singInOnClick() {
      //$state.go('auth');
    }    
  }
})();