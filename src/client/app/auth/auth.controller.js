(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', MainController);

  MainController.$inject = ['$q', '$scope', 'dataservice', 'logger', '$translate', '$translatePartialLoader', '$uibModal'];
  /* @ngInject */
  function MainController($q, $scope, dataservice, logger, $translate, $translatePartialLoader, $uibModal) {
    var vm = this;
    vm.title = 'Authentication';
    vm.inputUser = '';
    vm.inputEmail = '';
    vm.inputPass = '';
    vm.inputPass2 = '';
    vm.submitSignup = SubmitSignup;
    vm.openSinginModal = openSinginModal;
          
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

    /* Email singup */
    function openSinginModal() {
        var modalInstance = $uibModal.open({
            animation: 'true',
            templateUrl: 'app/auth/auth-singup-modal.html',
            controller: 'MainController',
            controllerAs: 'vm',
            size: 'lg'
        });
    }

    function closeModal() {
        $uibModal.dismiss('cancel');
    }


    function submitSignup() {

      if (vm.inputPass === vm.inputPass2) {

          var data = {
              'user': vm.inputUser,
              'email': vm.inputEmail,
              'password': vm.inputPass,
              'usertype': 'guest'
          };

          var dataUserJSON = JSON.stringify(data);
          dataservice.signup(dataUserJSON).then(function (response) {
              if (response.data === true) {
                  $timeout(function () {                           
                      logger.success('Usuario introducido');
                      $state.go('home');             
                  }, 3000);
              } else {
                  if (response.data === 'Error name') {
                      logger.warning('Ya existe un usuario con ese nombre');
                      $timeout(function () {
                          vm.resultMessageFail = '';
                      }, 3000);

                  } else if (response.data === 'err') {
                      logger.error('Error en la consulta a base de datos');
                      $timeout(function () {
                          vm.resultMessageFail = '';
                      }, 3000);
                  }
              }
          });
      } else {
          logger.warning('Las contraseñas deben ser iguales');
          $timeout(function () {
          }, 3000);
      }
    }
    
  }
})();