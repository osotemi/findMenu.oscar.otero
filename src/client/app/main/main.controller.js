(function() {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['logger', '$q', '$state', '$translate', '$translatePartialLoader'];
    /* @ngInject */
    function MainController(logger, $q, $state, $translate, $translatePartialLoader) {
        var vm = this;
        vm.title = 'Main';
        vm.singInOnClick = singInOnClick;
        
        $translatePartialLoader.addPart('main');
        $translate.refresh();

        activate();

        function activate() {
            console.log('Activated Main View');
        }

        //Funcionalidad de cookies
        //

        /* Eventos */
        function singInOnClick() {
            //$state.go('auth');
        }    
    }
})();