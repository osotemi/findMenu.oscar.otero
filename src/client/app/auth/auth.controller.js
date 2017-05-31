(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['cookies', 'dataservice', 'logger', '$q', '$scope', '$state', '$translate', '$translatePartialLoader', '$uibModal', '$timeout'];
    /* @ngInject */
    function AuthController(cookies, dataservice, logger, $q, $scope, $state, $translate, $translatePartialLoader, $uibModal, $timeout) {
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
        vm.openSingUpModal = openSingUpModal;
        vm.logOut = logOut;
        vm.logIn = logIn;
        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        activate();

        function activate() {
            var promises = [checkUserCookies()];
            
            return $q.all(promises).then(function() {
                console.log('Activated Auth View');
            });

        }

        function checkUserCookies() {
            if (cookies.CheckUser()) {
                vm.authUser = true;
                vm.userSesion = cookies.GetUser();
                if (!vm.userSesion.userAvatar) {
                    vm.userSesion.userAvatar = '../images/avatar/default-avatar.svg';
                }
                console.log('auth-controller User cookie found' + JSON.stringify(vm.userSesion));
            }
            //NavBar visible
            else {
                vm.authUser = false;
                console.log('auth-controller User not cookie found');
            }
        }

        /* Email singup */
        function openSingUpModal() {
            console.log('open sing up modal');
            vm.modalInstance = $uibModal.open({
                animation: 'true',
                scope: $scope,
                size: 'lg',
                templateUrl: 'app/auth/auth-singup-modal.html',
            });
            
        }

        function openLogInModal() {
            vm.modalInstance = $uibModal.open({
                animation: 'true',
                scope: $scope,
                size: 'lg',
                templateUrl: 'app/auth/auth-login-modal.html'
            });
        }

        function closeModal() {
            console.log('Close modal');
            vm.modalInstance.dismiss('cancel');
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
                            logger.success('Usuario introducido, por favor revise su email');
                            vm.modalInstance.dismiss('cancel');
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
                'user': vm.inputEmail,
                'password': vm.inputPass
            };

            var dataUser = JSON.stringify(data);
            dataservice.logIn(dataUser).then(function (response) {
                if (response.data.userEmail === vm.inputEmail) {
                    logger.success('Usuario autentificado');
                    vm.userSesion = response.data;
                    if (!vm.userSesion.userAvatar) {
                        vm.userSesion.userAvatar = 'default-avatar.svg';
                    }
                    cookies.NewUserCookie(vm.userSesion);
                    console.log(JSON.stringify(vm.userSesion));
                    vm.closeModal();
                    $state.go('user');
                } else if (response.data === 'Error on email or pass') {
                    logger.error('Error en las credenciales, el usuario o la contraseña no son correctos');
                } else {
                    logger.error('Error en el server');
                }

            });
        }

        function logOut() {
            console.log('LogOut');
            cookies.ClearCookies('userCookie');
            $state.go($state.$current);
        }
    }
})();