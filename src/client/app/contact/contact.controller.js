(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['dataservice', '$state', '$timeout', '$translate', '$translatePartialLoader'];
  /* @ngInject */
  function ContactController(dataservice, $state, $timeout, $translate, $translatePartialLoader) {
    var vm = this;
    vm.title = 'Contact';
    vm.data = {
        name: '',
        from: '',
        to: '',
        subject: '',
        template: 'contactTemplate',
        text: '',
        type: 'system'
    };
    vm.sendContactMail = sendContactMail;
    //$translatePartialLoader.addPart('contact');
    //$translate.refresh();

    activate();

    function activate() {
        console.log('Activated Contact View');
    }

    function sendContactMail() {
        console.log('sendContactMail');
        dataservice.sendMail(vm.data).then(function (response){
            if(response) {
                vm.data.type = 'user';
                vm.data.template = 'toUserTemplate';
                console.log('Data' + vm.data);
                dataservice.sendMail(vm.data).then(function (response) {

                    if (response) {
                        vm.resultMessageOk = 'Su email ha sido enviado correctamente';
                        $timeout(function () {
                            vm.resultMessageOk = '';
                            $state.go('/user');
                        }, 3000);
                    } else {
                        vm.resultMessageFail =
                                'Ha habido un error al enviar el email, intentelo mas tarde';
                        $timeout(function () {
                            vm.resultMessageFail = '';
                        }, 3000);
                    }
                });
            }
            else {
                vm.resultMessageFail =
                        'Ha habido un error al enviar el email, intentelo mas tarde';
                $timeout(function () {
                    vm.resultMessageFail = '';
                }, 3000);
            }
        });  
    }
  }
})();