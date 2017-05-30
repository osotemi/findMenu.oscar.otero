(function () {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$q', '$state', 'cookies', 'dataservice'];
    /* @ngInject */
    function ProductController($q, $state, cookies, dataservice) {
        var vm = this;

        vm.promises = [];
        vm.userSesion = {};
        vm.productos = [];
        vm.userAutentified = false;
        vm.userCookie = cookies.GetUser();
        

        activate();

        function activate() {
            var promises = [checkUserCookies()];

            return $q.all(vm.promises).then(function () {
                if(!userAutentified) {
                    $state.go('/products');
                }
                console.log('Activated Product View');
            });
        }

        function checkUserCookies() {
            vm.userAutentified = cookies.CheckUser();
            if (vm.userCookie) {
                console.log('En if');
                vm.promises = [
                    loadShowcase(vm.userCookie.userId)
                ];
            }
            else {
                vm.promises = [
                    loadShowcase(false)
                ];
            }
        }

        function loadShowcase(userId) {
            return dataservice.getProducts(userId).then(function (pictures) {
                console.log(JSON.stringify(pictures.data));
                vm.productos = pictures;
            });
        }
    }
})();

