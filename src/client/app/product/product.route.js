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
                state: 'product',
                config: {
                    url: '/product',
                    templateUrl: 'app/product/product-carrousel.html',
                    controller: 'ProductController',
                    controllerAs: 'vm',
                    title: 'Product View',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-food"></i> Comida'
                    }
                }
            }
        ];
    }
})();