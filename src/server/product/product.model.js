'use strict'

var mySql = require('../product/product.model');

var productModel = {};

// Montamos el objeto productos sin usuario
productModel.getProducts = function( callback ) {
    var product = {
        mostFollowed: {},
        newAdded: {},
        promoted: {},
        advertising: {},
    };

    if( mySql.connection ){
        mySql.connection.query('', function( error, product) {
            if( error ) {
                throw error;
            }
            else{
                callback( null, product );
            }
        });
    }
};