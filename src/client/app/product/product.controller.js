(function () {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$q', '$state', '$window', 'cookies', 'dataservice'];
    /* @ngInject */
    function ProductController($q, $state, $window, cookies, dataservice) {
        var vm = this;

        vm.promises = [];
        vm.userId = false;
        vm.products = [];
        vm.productCase = [];
        vm.userAutentified = false;
        vm.userCookie = cookies.GetUser();
        

        activate();

        function activate() {
            var promises = [checkUserCookies(), loadProducts()];

            return $q.all(promises).then(function () {
                return $q.all(vm.promises).then(function () {
                    
                    console.log('Activated Product View');
                });
            });
        }

        function checkUserCookies() {
            vm.userAutentified = cookies.CheckUser();
            if (vm.userAutentified) {
                vm.userId = cookies.GetUser().userId;
                console.log('En checkUserCookiesloadShowcase' + vm.userId);
                /*vm.promises = [
                    loadShowcase(vm.userId)
                ];*/
            }
        }

        function loadShowcase(userId) {
            return dataservice.getProducts(userId).then(function (pictures) {
                //console.log(JSON.stringify(pictures.data));
                vm.productCase = pictures;
            });
        }

        function loadProducts() {
            return dataservice.getProducts(false).then(function (products) {;
                vm.products = products.data;
                console.log(JSON.stringify(vm.products));
            }); 
        }
    }
})();

