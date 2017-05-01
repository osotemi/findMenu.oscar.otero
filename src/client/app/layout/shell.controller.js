(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'fmCookies', 'logger'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, fmCookies, logger) {
    var vm = this;
    vm.loadingMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = {
      title: config.appTitle,
      text: 'Eslogan findMenu'
    };

    activate();

    function activate() {
      //fmCookies.CheckCookies();
      logger.cookiesAdvice(
        'LAS COOKIES PERMITEN UNA GAMA DE FUNCIONALIDADES QUE MEJORAN LA FORMA EN LA QUE USTED DISFRUTA FINDMENU. ' +
        'AL UTILIZAR ESTE SITIO, USTED ACEPTA EL USO DE COOKIES DE CONFORMIDAD CON NUESTRAS DIRECTRICES. PARA OBTENER MÁS INFORMACIÓN, '
        ,'Cookies Advice');
      hideSplash();
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        $rootScope.showSplash = false;
      }, 5500);
    }

  }
})();
