(function () {
    'use strict';

    angular
            .module('app.auth')
            .directive('loginDir', loginDir);

    /* @ngInject */
    function loginDir() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/layout/directives/auth-login-dir.html'
        };
        
        return directive;
    }
})();