(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['config', 'cookies', 'logger', 'toastr', '$q', '$log', '$rootScope', '$timeout'];
    /* @ngInject */
    function ShellController(config, cookies, logger, toastr, $q, $log, $rootScope, $timeout) {
        var vm = this;
        vm.loadingMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.session = {};

        activate();

        function activate() {
            var promises = [checkCookiesState];
            
            return $q.all(promises).then(function() {
                console.log('Activated Main View');
            });
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 5500);
        }

        function checkCookiesState() {
            if (cookies.CheckCookies()) {
                vm.session = cookies.GetSession();
                if (!vm.session.cookiesOk) {
                    showCookiesAdvice();
                }
            }
            else {
                showCookiesAdvice();
            }
            return true;
        }

        function showCookiesAdvice() {
            toastr.options.onclick = function () {
                return cookies.SetSession(true);
            };
            logger.cookiesAdvice(
                'LAS COOKIES PERMITEN UNA GAMA DE FUNCIONALIDADES QUE MEJORAN LA FORMA EN LA QUE USTED DISFRUTA FINDMENU. ' +
                'AL UTILIZAR ESTE SITIO, USTED ACEPTA EL USO DE COOKIES DE CONFORMIDAD CON NUESTRAS DIRECTRICES. PARA OBTENER MÁS INFORMACIÓN, '
                , 'Cookies Advice');
        }
    }
})();
