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
        if (err) {            
            return res.send('err');
        }
        if (!user) {
            console.log('auth controller !err' + JSON.stringify(info));
            return res.send('errorcredentials');

        }
        console.log('auth controller login OK');
        return res.send(user);

    })(req, res, next);
};