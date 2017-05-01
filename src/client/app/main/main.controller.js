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
      return $q.all(promises).then(function() {
        logger.info('Activated Main View');
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