/**
 * @fileoverview Servicios que utilizan acceso a base de datos
 *
 * @version                               2.2
 *
 * @author      Óscar Otero Millán <oscarompro@gmail.com>
 * @copyright           Óscar Otero Millán
 *
 * History
 * v0.0.2 – Implementado servicio sendMail para envio de emails
 */
(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      sendMail: sendMail,
      signUp: signUp
    };

    return service;

    /**Llamada a servidor enviando datos para que se envie un mensaje
     * 
     * @param {Object} messageInfo - Objeto con la información necesaria para enviar el email
     * @param {String} messageInfo.name - Nombre de enviante del email
     * @param {String} messageInfo.from - Dirección de email del remitente
     * @param {String} messageInfo.to - Dirección de email del destinatario
     * @param {String} messageInfo.subject - Asunto
     * @param {String} messageInfo.message - Mensaje
     * @param {String} messageInfo.template - Tipo de plantilla del email
     * @returns {Boolean}
     * 
     */

    function sendMail( messageInfo ) {
      return $http.post('/api/sendmail', messageInfo)
          .then(success)
          .catch(fail);

      function success() {
          console.log("sendMail success " + response.data);
          return true;
      }

      function fail(e) {
          console.log("sendMail success " + response.data);
          return exception.catcher('XHR Failed for sendMail')(e);
      }
    }

    /**Llamada a servidor enviando datos para dar de alta un nuevo usuario
     * 
     * @param {Object} userData - Datos del nuevo usario
     * @param {String} userData.user - Nombre del nuevo usuario
     * @param {String} userData.email - Email del nuevo usuario
     * @param {String} userData.password - Contraseña del nuevo usuario
     * @param {String} userData.userType - Tipo de usuario del nuevo usuario
     * 
     */

    function signUp(userData) {
      return $http.post('/api/signup', userData)
          .then(success)
          .catch(fail);
      //si devuelve promesa ejecuta success
      function success(response) {
          return response;
      }
      //si no ejecuta fail
      function fail(e) {
          return exception.catcher('XHR Failed for signup')(e);
      }
    }
  }
})();
