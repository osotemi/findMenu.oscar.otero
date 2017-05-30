(function() {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['cookies', 'logger', '$q', '$state', '$translate', '$translatePartialLoader'];
    /* @ngInject */
    function MainController(cookies, logger, $q, $state, $translate, $translatePartialLoader) {
        var vm = this;
        vm.userAutentified = false;
        vm.title = 'Main';
        
        $translatePartialLoader.addPart('main');
        $translate.refresh();

        activate();

        function activate() {
            var promises = [checkUserCookies()];
            
            return $q.all(vm.promises).then(function () {
                if(vm.userAutentified) {
                    console.log('Redirected to user');
                    $state.go('user');
                }
                console.log('Activated Main View');
            });
        }

        function checkUserCookies() {
            vm.userAutentified = cookies.CheckUser();
        }    
    }
})();