(function () {
    /*jshint node:false*/
    'use strict';

    angular
        .module('blocks.cookies')
        .factory('cookies', cookies);

    /* @ngInject */
    cookies.$inject = ['$cookies'];
  
    function cookies($cookies) {
        /* jshint ignore:start */
        return {
            Base64encode : Base64encode,
            Base64decode : Base64decode,
            CheckCookies : CheckCookies,
            CheckUser : CheckUser,
            ClearCookies : ClearCookies,
            DecodeData : DecodeData,
            EncodeData : EncodeData,
            GetSession : GetSession,
            GetUser : GetUser,
            NewSession : NewSession,
            SetSession : SetSession,
            NewUserCookie : NewUserCookie
        };

        function Base64decode(input) {
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert('There were invalid base64 characters in the input text.\n' +
                        'Valid base64 characters are A-Z, a-z, 0-9, "+", "/",and "="\n' +
                        'Expect errors in decoding.');
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            } while (i < input.length);
            return output;
        }

        function Base64encode(input) {
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            try {
                do {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                    
                    chr1 = chr2 = chr3 = '';
                    enc1 = enc2 = enc3 = enc4 = '';
                } while (i < input.length);
            }catch (err) {
                console.log('error char');
            }
            return output;
        }

        function CheckCookies() {
            var session = new GetSession();
            if (session) {return true;}//DecodeData();
            //console.log(session);
            NewSession();
            return false;
        }

        function CheckUser() {
            var user = GetUser();
            console.log('Check user' + user);
            if (user) {return true;}//DecodeData();
            NewSession();
            return false;
        }

        function ClearCookies(cookieName) {

            switch (cookieName) {
                case 'session':
                    $cookies.remove('session');
                    break;
                case 'userCookie':
                    $cookies.remove('userCookie');
                    break;
                default:
                    $cookies.remove('session');
                    $cookies.remove('userCookie');
                    break;
            }
            
        }

        function DecodeData(data) {
            var dataDecrypt = Base64decode(data);
            return JSON.parse(dataDecrypt);
        }

        function EncodeData(data) {
            var dataEncrypt = JSON.stringify(data);
            return Base64encode(dataEncrypt);
        }

        function GetSession() {
            //al cargarse la pagina por primera vez, user es undefined
            var session = $cookies.getObject('session');
            if (session) {
                session = Base64decode(session);
                session = JSON.parse(session);
            }
            return session;
        }

        function GetUser() {
            //función para comprobar si existe cookie de usuario registrado
            var userCookie = $cookies.getObject('userCookie');
            if (userCookie) {
                userCookie = Base64decode(userCookie);
                userCookie = JSON.parse(userCookie);
                return userCookie;
            }
            return false;
        }

        function NewSession(user) {
            //Crear variables con los datos necesarios
            var sessionData = {
                cookiesOk : false,
                name: '',
                path: '/',
                start: new Date().getTime(), 
                userId: '', 
                userType: 'guest'
            };
            if (user) {
                sessionData.userId = user.userId;
                sessionData.userType = user.userType;
                sessionData.name = user.userName;
                sessionData.avatar = user.userAvatar;
            }
            
            //Se crea cookie de session 
            $cookies.putObject('session', EncodeData(sessionData),
            {expires: new Date(new Date().getTime() + 60 * 60 * 1000)});
            console.log('Creada cookie de session');
            return true;
        }

        function NewUserCookie(user) {
            //Crear variables con los datos necesarios
            console.log('NewSession' + JSON.stringify(user));
            if (user) {
                var userData = {
                    userAvatar: '../images/avatar/' + user.userAvatar,
                    userEmail: user.userEmail,
                    userName: user.userName,
                    userId: user.userId, 
                    userType: 'guest',
                    
                };
                console.log('NewSession Cookie created');
                //Se crea cookie de session 
                $cookies.putObject('userCookie', EncodeData(userData),
                {expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)});
                console.log('Creada cookie de usurario');
                return true;
            }
            return false;
        }
        
        function SetSession(cookie) {
            //Leer cookie
            var session = GetSession();
            if (!session.cookiesOk && cookie) {
                session.cookiesOk = cookie;
                console.log('Política aceptada');
                //console.log(session);
            }

            $cookies.putObject('session', EncodeData(session),
            {expires: new Date(new Date().getTime() + 60 * 60 * 1000)});
            return true;
        }

        /* jshint ignore:end */
    }

}());
