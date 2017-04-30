(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['$q', 'dataservice', 'logger', '$translate', '$translatePartialLoader',];
  /* @ngInject */
  function MainController($q, $translate, $translatePartialLoader, dataservice, logger) {
    var vm = this;
    vm.title = 'Main';
    //$translatePartialLoader.addPart('main');
    //$translate.refresh();

    activate();

    function activate() {
      var promises = [];
      return $q.all(promises).then(function() {
        logger.info('Activated Main View');
      });
    }

    //Funcionalidad de cookies
    //
    
  }
})();