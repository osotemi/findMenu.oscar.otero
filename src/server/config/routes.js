
module.exports.init = function (app, passport) {
    //Se requieren las rutas de cada modulo
    require('../email/email.router.js')(app);
    require('../auth/auth.router.js')(app, passport);
};