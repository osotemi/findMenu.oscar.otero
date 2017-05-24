'use strict';

var mySql = require('../config/config.db.js');

var productModel = {};

// Montamos el objeto productos sin usuario
productModel.getProductMostFollowed = function( callback ) {
    console.log( 'Pre-if' );
    if( mySql.connection ){
        mySql.connection.query(
            'SELECT * from FOOD WHERE foodId = ( SELECT followFoodId as FoodId ' + 
            'FROM FOLLOWING GROUP BY followFoodId ORDER BY count(followUserId) DESC LIMIT 1 );', 
            function( error, mostFollowed) {
                if( error ) {
                    console.log('fail');
                    throw error;
                }
                else{
                    //console.log(productFollowed );
                    callback( null, mostFollowed );
                }
                
            }
        );
    }
};
productModel.getProductNewAdded = function( callback ) {

    console.log( 'Pre-if' );
    if( mySql.connection ){
        mySql.connection.query('SELECT * FROM FOOD ORDER BY foodAdded DESC LIMIT 1;', 
            function( error, newAdded) {
                if( error ) {
                    throw error;
                }
                else{
                    callback(null, newAdded);
                }
            }
        );
    }
};

productModel.getProductPromoted = function( callback ) {

    if(mySql.connection){
        mySql.connection.query(
            'SELECT * FROM FOOD INNER JOIN USERS ON userId = foodUserId ' + 
            'WHERE userTypeOf = "offerer" AND foodPromoted = true ORDER BY foodAdded DESC LIMIT 1;', 
            function( error, promoted) {
                if( error ) {
                    throw error;
                }
                else{
                    callback(null, promoted);
                }
            }
        );
    }
};

productModel.getProductAdvertising = function( callback ) {

    if(mySql.connection){
        mySql.connection.query(
            'SELECT * FROM FOOD INNER JOIN USERS ON userId = foodUserId ' + 
            'WHERE userTypeOf = "sponsor" ORDER BY foodAdded DESC LIMIT 1;', 
            function( error, advertising) {
                if( error ) {
                    throw error;
                }
                else{
                    callback(null, advertising);
                }
            }
        );
    }
};

module.exports = productModel;