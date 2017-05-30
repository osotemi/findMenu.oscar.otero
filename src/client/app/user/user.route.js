(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'user',
                config: {
                    url: '/user',
                    templateUrl: 'app/user/user.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'User View'
                }
            },
            {
                state: 'profile',
                config: {
                    url: '/user/profile',
                    templateUrl: 'app/user/user-profile.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'User View'
                }
            }
        ];
    }
})();