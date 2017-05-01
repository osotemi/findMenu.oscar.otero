(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize', 'ngCookies', 'pascalprecht.translate',
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.cookies',
      'ui.router', 'ngplus', 'app.layout'
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
