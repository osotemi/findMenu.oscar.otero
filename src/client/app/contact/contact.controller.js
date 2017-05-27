(function () {
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
            name: 'none',
            from: '',
            to: '',
            subject: '',
            template: 'contactTemplate',
            text: '',
            type: 'system'
        };
        vm.sendContactMail = sendContactMail;
        $translatePartialLoader.addPart('contact');
        $translate.refresh();

        activate();

        function activate() {
            console.log('Activated Contact View');
        }

        function sendContactMail() {
            console.log('sendContactMail');
            dataservice.sendMail(vm.data).then(function (response) {
                if (response) {
                    vm.data.type = 'user';
                    vm.data.template = 'toUserTemplate';
                    console.log('Data' + vm.data);
                    dataservice.sendMail(vm.data).then(function (response) {

                        if (response) {
                            vm.showResultMessage = false;
                            $timeout(function () {
                                //$state.go('/user');
                            }, 3000);
                        } else {
                            vm.showResultMessage = true;
                            $timeout(function () {
                                vm.showResultMessage = false;
                            }, 3000);
                        }
                    });
                }
                else {
                    vm.showResultMessage = true;
                    $timeout(function () {
                        vm.showResultMessage = false;
                    }, 3000);
                }
            });
        }
    }
})();