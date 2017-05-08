// load all the things we need
var localStrategy = require('passport-local').Strategy;

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

    passport.use('local-signup', new localStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, user, password, done) {
            mySql.countUser(user, function (rows) {

                if (rows[0].userCount >= 1) {
                    return done(null, false, 'el nombre de usuario ya existe');
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUser = {
                        user: user,
                        password: bcrypt.hashSync(password, null, null),
                        email: req.body.email,
                        usertype: req.body.usertype,
                        name: user,
                        avatar: ''   
                    };

                    mySql.insertUser(newUser, function (rows) {
                        if (rows) {
                            return done(null, user);
                        }
                    });
                }
            });
        }
    ));
};