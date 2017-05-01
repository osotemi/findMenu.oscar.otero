(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserController', UserController);

  UserController.$inject = ['$q', '$scope', 'dataservice', 'logger', '$translate', '$translatePartialLoader',];
  /* @ngInject */
  function UserController($q, $scope, dataservice, logger, $translate, $translatePartialLoader) {
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
            console.log('Activated User View');
      });
    }

    //Funcionalidad de cookies
    //
    
  }
})();