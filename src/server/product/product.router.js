var ControllerProduct = require ('./product.controller');

module.exports = function( app ) {
    app.get('/api/product', ControllerProduct);
};