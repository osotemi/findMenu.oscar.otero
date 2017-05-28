/* jshint -W117, -W030 */
describe('Dataservice (CORE)', function () {
    var $httpFlush;

    beforeEach(function () {
        module('app.core', bard.fakeToastr);
        bard.inject(this, '$httpBackend', '$rootScope', 'dataservice', '$httpBackend');
        $httpFlush = $httpBackend.flush;
        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});
    });

    //bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function () {
        expect(dataservice).not.to.equal(null);
    });
});