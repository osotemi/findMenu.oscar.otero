(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr', 'config'];

    /* @ngInject */
    function logger($log, toastr, config) {
        var service = {
            showToasts: true,

            cookiesAdvice: cookiesAdvice,
            error: error,
            info: info,
            success: success,
            warning: warning,
            // straight to console; bypass toastr
            log: $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            toastr.error(message, title);
            //$log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            //$log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            //$log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            //$log.warn('Warning: ' + message, data);
        }

        function cookiesAdvice(message, data, title) {
            toastr.info(message + '<br /><br /><button type="button" class="btn clear">Aceptar</button>', title);
            //$log.info('Info: ' + message, data);
        }

    }
} ());
