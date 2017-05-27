'use strict';

var Controller = require('./auth.controller');

module.exports = function (app, passport) {
    app.post('/api/signup', Controller.signup);
    app.post('/api/login', Controller.login);
};