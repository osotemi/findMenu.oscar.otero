var Product = require( './product.model.js ' );

exports.getProduct = function( req, res ) {
    Product.getProduct(
        function( err, products ) {
            if( err ) {
                res.send( err );
            }
            res.json( products );
        }
    );
}