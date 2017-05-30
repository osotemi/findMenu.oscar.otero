var ControllerProduct = require('./product.controller');

module.exports = function (app) {    
    app.get('/api/product', ControllerProduct.getProduct);

    //app.get('/api/product/:foodId', ControllerProducts.getProductById);

    app.get('/api/products/', ControllerProduct.getProductsDefault);

    //app.get('/api/products/:userId', ControllerProducts.getProductsByUser);

    //app.post('/api/product/', ControllerProducts.postProduct);

};