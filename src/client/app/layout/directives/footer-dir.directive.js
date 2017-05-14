(function () {
    'use strict';

    angular
            .module('app.layout')
            .directive('footerDir', footerDir);

    /* @ngInject */
    function footerDir() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/layout/directives/footer-dir.html'
        };

        return directive;
    }
})();