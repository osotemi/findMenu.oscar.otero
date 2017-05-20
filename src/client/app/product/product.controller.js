(function(){
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$q', 'cookies', 'dataservice'];
    /* @ngInject */
    function ProductController( $q, cookies, dataservice ){
        var vm = this;

        vm.promises = [];
        vm.userCookie = cookies.GetUser();

        activate();

        function activate() {
            if(vm.userCookie) {
                vm.promises = [ 
                    getProducts(vm.userCookie.userId)
                ];
            }
            else{
                vm.promises = [ 
                    getProducts()
                ];
            }

            return $q.all(promises).then(function(){
                console.log('Activated Product View');
            });
        }

        function getProducts() {

        }
    }
});

