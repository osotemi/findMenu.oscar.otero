(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['cookies','dataservice', 'logger', 
  '$q', '$scope', '$state' , '$translate', '$translatePartialLoader', '$uibModal', '$timeout'];
  /* @ngInject */
  function AuthController( cookies, dataservice, logger, 
  $q, $scope, $state, $translate, $translatePartialLoader, $uibModal, $timeout) {
    var vm = this;
    vm.title = 'Authentication';
    vm.inputUser = '';
    vm.inputEmail = '';
    vm.inputPass = '';
    vm.inputPass2 = '';
    vm.authUser = false;
    vm.userSesion = {};
    vm.closeModal = closeModal;
    vm.submitSignup = submitSignup;
    vm.openLogInModal = openLogInModal;
    vm.logOut = logOut;
    vm.logIn = logIn;


    $translatePartialLoader.addPart('auth');
    $translate.refresh();

    activate();

    function activate() {
        if(cookies.CheckUser()){
            vm.authUser = true;
        }
        //NavBar visible
        $scope.isNavCollapsed = false;
    }

    /* Email singup */
    function openSingUpModal() {
        var modalInstance = $uibModal.open({
            animation: 'true',
            scope: $scope,
            size: 'lg',
            templateUrl: 'app/auth/auth-singup-modal.html'
        });
    }

    function openLogInModal() {
        var modalInstance = $uibModal.open({
            animation: 'true',
            scope: $scope,
            size: 'lg',
            templateUrl: 'app/auth/auth-login-modal.html'
        });
    }

    function closeModal() {
        //console.log('Close modal');
        $uibModal.dismiss('cancel');
    }


    function submitSignup() {
        
        if (vm.inputPass === vm.inputPass2) {

            var data = {
                'user': vm.inputUser,
                'email': vm.inputEmail,
                'password': vm.inputPass,
                'userType': 'guest'
            };
            
            var dataUserJSON = JSON.stringify(data);
            dataservice.signUp(dataUserJSON).then(function (response) {
                if (response.data === true) {
                    $timeout(function () {                           
                        logger.success('Usuario introducido');
                        $uibModal.dismiss('cancel');
                        $state.go('login');             
                    }, 3000);
                } else {
                    if (response.data === 'Error name') {
                        logger.warning(JSON.stringify(response));
                        $timeout(function () {
                            vm.resultMessageFail = 'Ya existe un usuario con ese email';
                        }, 3000);

                    } else if (response.data === 'err') {
                        logger.warning(JSON.stringify(response));
                        //logger.error('Error en la consulta a base de datos');
                        $timeout(function () {
                            vm.resultMessageFail = 'Error en la consulta a base de datos';
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
    
    function logIn() {
        console.log('login');
        var data = {
            'email': vm.inputEmail,
            'password': vm.inputPass
        };

        var dataUser= JSON.stringify(data);
        dataservice.logIn(dataUser).then(function (response) {
            if (response.data.email === vm.inputEmail) {
                logger.success('Usuario autentificado');
                cookies.NewUserCookie(response.data);
                vm.userSesion =response.data;
                console.log(JSON.stringify(vm.userSesion));
                $uibModal.dismiss('cancel');
                vm.closeModal();
                $state.go('user');
            } else if (response.data === 'errorcredentials') {
                console.log('ERROR logIn - response.data === errorcredentials ');
                logger.error('Error en las credenciales, el usuario o la contraseña no son correctos');
            } else {
                console.log('ERROR logIn - else ' + response);
                logger.error('Error en el server');
            }

        });
     }

    function logOut () {

    }
  }
})();