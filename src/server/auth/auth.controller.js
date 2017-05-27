'use strict';

var passport = require('passport');
var mySql = require('../auth/auth.model');

exports.signup = function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('Error name');
        }
        return res.send(true);

    })(req, res, next);
};

exports.login = function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        console.log('Antes de authenticate-local-login');
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('Error on email or pass');
        }
        return res.send(true);

    })(req, res, next);
};/* auth controller  */