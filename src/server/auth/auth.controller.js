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