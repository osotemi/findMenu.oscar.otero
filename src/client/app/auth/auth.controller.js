(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', MainController);

  MainController.$inject = ['$q', '$scope', 'dataservice', 'logger', '$translate', '$translatePartialLoader',];
  /* @ngInject */
  function MainController($q, $scope, dataservice, logger, $translate, $translatePartialLoader) {
    var vm = this;
    vm.title = 'Authentication';
    $translatePartialLoader.addPart('auth');
    $translate.refresh();

    activate();

    function activate() {
      var promises = [];
      //NavBar visible
      $scope.isNavCollapsed = false;
      return $q.all(promises).then(function() {
        //logger.info('Activated Main View');
      });
    }

    //Funcionalidad de cookies
    //
    
  }
})();