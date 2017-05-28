/*jshint node:true*/
'use strict';

var fs = require('fs');//
var https = require('https');//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var dotenv = require('dotenv');
var environment = process.env.NODE_ENV;
var favicon = require('serve-favicon');
var four0four = require('./utils/404')();
var logger = require('morgan');
var passport = require('passport');
var port = process.env.PORT || 8001;
var session = require('express-session');

//Cargamos la key desde config/.env
dotenv.load({ path: './src/server/config/.env' });

//Añadimos uso favicon
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
//Necesario para definir connect.sid y solucionar
//TypeError: Cannot read property 'connect.sid' of undefined
app.use(cookieParser());
app.use(cors());

require('./config/passport.js')(passport);
//Configuración de la sesión para Passport
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'findmenuangularnodejs'
})); // session secret

app.use(passport.initialize());
app.use(passport.session());

//Se importa archivo que a su vez importa los archivos de rutas de cada módulo
require('./config/routes').init(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Invalid calls to assets should return the custom error object to mitigate
        // against XSS reflected attacks
        app.use('/js/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        app.use('/images/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        app.use('/styles/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        console.log('WARNING: OPEN BROWSER WITH HTTPS');
        https.createServer({//
            key: fs.readFileSync('privkey.pem'),//
            cert: fs.readFileSync('cert.pem')//
        }, app).listen(port);//
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        
        break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
