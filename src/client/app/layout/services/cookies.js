(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('fmCookies', fmCookies);

    /* @ngInject */
    fmCookies.$inject =['$cookies'];
  
    function fmCookies( $cookies ) {
        return {
            Base64encode : Base64encode,
            Base64decode : Base64decode,
            CheckCookies : CheckCookies,
            ClearCookies : ClearCookies,
            DecodeData : DecodeData,
            EncodeData : EncodeData,
            GetSession : GetSession,
            NewSession : NewSession
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

            try{
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

                  output.concat(keyStr.charAt(enc1))
                        .concat(keyStr.charAt(enc2))
                        .concat(keyStr.charAt(enc3))
                        .concat(keyStr.charAt(enc4));
                  
                  chr1 = chr2 = chr3 = '';
                  enc1 = enc2 = enc3 = enc4 = '';
                } while (i < input.length);
            }catch(err) {
                console.log('error char');
            }
            return output;
        }

        function CheckCookies(){
            var session = GetSession();
            if(session) return DecodeData();
            NewSession();
            return false;
        }

        function ClearCookies(cookieName) {

            switch(cookieName){
                case 'session':
                    $cookies.remove('session');
                    break;
                case 'user':
                    $cookies.remove('user');
                    break;
                default:
                    $cookies.remove('session');
                    $cookies.remove('user');
                    break;
            }
            
        }

        function DecodeData() {
            var avatar = Base64decode($cookies.getObject('session').avatar);
            var user = Base64decode($cookies.getObject('session').user);
            var email = Base64decode($cookies.getObject('session').email);
            var name = Base64decode($cookies.getObject('session').name);
            return {user: user, avatar: avatar, email:email, name: name};
        }

         function EncodeData(data) {
            var avatar = Base64encode(user.avatar); 
            var user = Base64encode(user.user);
            var email = Base64encode(user.email);
            var name = Base64encode(user.name);
            return {user: user, avatar: avatar, email: email, name: name};
        }


        function GetSession() {
            //al cargarse la pagina por primera vez, user es undefined
            var session = $cookies.getObject('session');
            if (session) { //si no es undefined
                console.log(session); //datos encriptados
                session = DecodeData();
                console.log(session); //datos no encriptados
            }
            return session;
        }

        function NewSession(users) {
            //Crear variables con los datos necesarios
            var userData = {
                userId: '', 
                userType: Base64encode('guest'), 
                start: new Date().getTime(), 
                name: ''
            }

            if(users){
                userData.userId = Base64encode(users.user);
                userData.userType = Base64encode(users.type);
                userData.name = Base64encode(users.name);
            }
            
            //Se crea cookie de session 
            $cookies.putObject('session', userData,
            {expires: new Date(new Date().getTime() + 60 * 60 * 1000)});

        }
        
    }

}());
