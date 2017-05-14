(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['dataservice', '$translate', '$translatePartialLoader'];
  /* @ngInject */
  function ContactController(dataservice, $translate, $translatePartialLoader) {
    var vm = this;
    vm.title = 'Contact';
    //$translatePartialLoader.addPart('auth');
    //$translate.refresh();

    activate();

    function activate() {
      console.log('Activated User View');
    }

    //Funcionalidad de cookies
    //
    
  }
})();