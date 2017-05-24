(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'auth',
        config: {
          url: '/auth',
          templateUrl: 'app/auth/singup.html',
          controller: 'AuthController',
          controllerAs: 'vm',
          title: 'Authentication',
        }
      },
      {
          state: 'signup',
          config: {
              url: '/auth/signup',
              templateUrl: 'app/auth/auth-singup-modal.html',
              controller: 'AuthController',
              controllerAs: 'vm',
              title: 'Sign Up'
          }
      }
    ];
  }
})();