(function() {
  'use strict';

  angular
    .module('app.core', [
      'app.layout',
      'blocks.cookies',
      'blocks.exception',
      'blocks.logger', 
      'blocks.router',
      'ngAnimate', 
      'ngAria',
      'ngCookies',
      'ngMaterial',
      'ngMessages',
      'ngplus',      
      'ngSanitize',
      'pascalprecht.translate',
      'ui.bootstrap',
      'ui.router',
    ])
    .factory('MyErrorHandler', function ($q, $log) {
      return function (part, lang, response) {
        $log.error('The "' + part + '/' + lang + '" part was not loaded. ' + response);
        return $q.when({});
      };
    })
    .run(function ($rootScope, $translate) {
      $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
      });
    });
})();
