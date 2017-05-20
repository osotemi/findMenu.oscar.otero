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
        vm.showcase = [];
        vm.userCookie = cookies.GetUser();

        activate();

        function activate() {
            
            if(vm.userCookie) {
                console.log('En if');
                vm.promises = [ 
                    loadShowcase(vm.userCookie.userId)
                ];
            }
            else{
                vm.promises = [ 
                    loadShowcase(false)
                ];
            }

            return $q.all(vm.promises).then(function(){
                console.log('Activated Product View');
            });
        }

        function loadShowcase(userId) {
            console.log('En loadShowcase');
            return dataservice.getProducts( userId ).then(function( pictures ) {
                console.log( JSON.stringify( pictures.data ) );
                vm.showcase = pictures;
            });
        }
    }
})();

