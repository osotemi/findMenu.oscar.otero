(function () {
    'use strict';

    angular
            .module('app.layout')
            .controller('NavtreeController', NavtreeController);

    NavtreeController.$inject = [ 'config', '$translate', '$translatePartialLoader','$state', 'routerHelper'];
    /* @ngInject */
    function NavtreeController(config, $translate, $translatePartialLoader, $state, routerHelper) {
        var vm = this;
        $translatePartialLoader.addPart('layout');
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.setLang = setLang;
        vm.navCollapsed = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Eslogan findMenu'
        };
        activate();

        function activate() {
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function setLang(langKey) {
          // You can change the language during runtime
          console.log("Language set to "+ langKey);
          $translate.use(langKey);
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }

    }
})();