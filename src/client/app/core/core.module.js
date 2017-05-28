(function() {
    'use strict';

    angular
      .module('app.core', [
        'blocks.cookies',
        'blocks.exception',
        'blocks.logger', 
        'blocks.router',
        'ngAria',
        'ngAnimate',
        'ngCookies',
        'ngMaterial',
        'ngMessages',     
        'ngSanitize',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.router',
        'ngplus'
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
