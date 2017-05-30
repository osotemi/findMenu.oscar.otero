var Product = require('./product.model.js');

exports.getProduct = function(req, res) {
    Product.getProductMostFollowed(
        function(err, products) {
            if (err) {
                res.send(err);
            }
            res.json(products);
        }
    );
};

exports.getProductsDefault = function(req, res) {
    Product.getProductDefault(
        function(err, products) {
            if (err) {
                res.send(err);
            }
            console.log('GET products default OK ');
            res.json(products);
        }
    );
};

exports.getProductsFollowers = function(req, res) {
    Product.getFollowers(
        function(err, followers) {
            if (err) {
                res.send(err);
            }
            console.log(followers);
        }
    );
}