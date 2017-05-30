(function () {
    'use strict';

    angular
        .module('app.auth')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'auth',
                config: {
                    url: '/auth',
                    templateUrl: 'app/auth/auth.html',
                    controller: 'AuthController',
                    controllerAs: 'vm',
                    title: 'Authentication',
                }
            }, 
        ];
    }
})();