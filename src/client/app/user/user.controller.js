(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['$q', '$scope','cookies', 'dataservice', 'logger', '$translate', '$translatePartialLoader',];
    /* @ngInject */
    function UserController($q, $scope, cookies, dataservice, logger, $translate, $translatePartialLoader) {
        var vm = this;
        vm.userAutentified = false;
        vm.userSesion = {};
        vm.title = 'Profile';
        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        activate();

        function activate() {
            var promises = [checkUserCookies()];

            return $q.all(promises).then(function() {
                console.log('Activated User View');
            });
        }
        //Funcionalidad de cookies
        function checkUserCookies() {
            vm.userAutentified = cookies.CheckUser();
            if (vm.userAutentified) {
                vm.authUser = true;
                vm.userSesion = cookies.GetUser();
                
                console.log('auth-controller User cookie found' + JSON.stringify(vm.userSesion));
            }
            //NavBar visible
            else{
                vm.authUser = false;
                console.log('auth-controller User not cookie found');
            }
        }
    }
})();