// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

// load up the auth model
var mySql = require('../auth/auth.model.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, user, password, done) {
            mySql.countUser(user, function (rows) {
                //console.log(" En local-signup " + JSON.stringify(user) + 'rows: ' + rows[0].userCount);
                if (rows[0].userCount >= 1) {
                    return done(null, false, 'El nombre de usuario ya existe');
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUser = {
                        userName: user,
                        userPassword: bcrypt.hashSync(password, null, null),
                        userEmail: req.body.email,
                        userTypeOf: req.body.userType,
                        userAvatar: ''   
                    };
                    console.log('local-signup newUser' + JSON.stringify( newUser));
                    mySql.setUser(newUser, function (rows) {
                        if (rows) {
                            return done(null, user);
                        }
                    });
                }
            });
        }
    ));

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, user, password, done) { 

            console.log('Antes de passport.use');
            mySql.getUser(user, function (error, rows) {
                if (!rows.length) {
                    console.log('local login fail');
                    return done(null, false, 'none user found'); 
                }
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    console.log('local login OK');
                    return done(null, false, 'wrong password'); 
                } else {
                    
                    return done(null, rows[0]);
                }
            });
        })
    );
};