/* jshint -W117, -W030 */
describe('main', function() {
    describe('state', function() {
        var views = {
            //four0four: 'app/main/main.html'
        };

        beforeEach(function() {
            module('app.main', bard.fakeToastr);
            //bard.inject('$location', '$rootScope', '$state', '$templateCache');
            //$templateCache.put(views.main, '');
        });
        /*
        it('should map /main route to main View template', function() {
            expect($state.get('main').templateUrl).to.equal(views.main);
        });

        it('of dashboard should work with $state.go', function() {
            $state.go('main');
            $rootScope.$apply();
            expect($state.is('main'));
        });
        */
    });
});