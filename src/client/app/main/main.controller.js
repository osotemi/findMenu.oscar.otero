(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;

    vm.title = 'Dashboard';

    activate();

    function activate() {
      var promises = [];
      return $q.all(promises).then(function() {
        logger.info('Activated Main View');
      });
    }

    //Funcionalidad de cookies
    //
    /*
    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });
    }
    */
  }
})();