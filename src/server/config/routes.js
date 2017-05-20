
module.exports.init = function (app, passport) {
    //Se requieren las rutas de cada modulo
    require('../auth/auth.router.js')(app, passport);
    require('../email/email.router.js')(app);
    require('../product/product.router.js')(app);
};