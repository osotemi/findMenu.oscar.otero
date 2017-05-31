'use strict';

var mySql = require('../config/config.db.js');

var productModel = {};

// Montamos el objeto productos sin usuario

productModel.getProductDefault = function (callback) {
    console.log('Pre-if getProductDefault');
    if (mySql.connection) {
        mySql.connection.query('SELECT * FROM FOOD ORDER BY foodAdded DESC;',
            function (error, allProducts) {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, allProducts);
                }
            }
        );
    }
};

productModel.getProductMostFollowed = function (callback) {    
    if (mySql.connection) {
        mySql.connection.query(
            'SELECT * from FOOD WHERE foodId = ( SELECT followFoodId as FoodId FROM FOLLOWING GROUP BY followFoodId ORDER BY count(followUserId) DESC LIMIT 1 );',
            function (error, mostFollowed) {
                if (error) {
                    console.log('fail');
                    throw error;
                }
                else {
                    //console.log(productFollowed );
                    callback(null, mostFollowed);
                }

            }
        );
    }
};

productModel.getProductNewAdded = function (callback) {
    console.log('Pre-if');
    if (mySql.connection) {
        mySql.connection.query('SELECT * FROM FOOD ORDER BY foodAdded DESC LIMIT 1;',
            function (error, newAdded) {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, newAdded);
                }
            }
        );
    }
};

productModel.getProductPromoted = function (callback) {
    if (mySql.connection) {
        mySql.connection.query(
            'SELECT * FROM FOOD INNER JOIN USERS ON userId = foodUserId WHERE userTypeOf = "offerer" AND foodPromoted = true ORDER BY foodAdded DESC LIMIT 1;',
            function (error, promoted) {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, promoted);
                }
            }
        );
    }
};

productModel.getProductAdvertising = function (callback) {
    if (mySql.connection) {
        mySql.connection.query(
            'SELECT * FROM FOOD INNER JOIN USERS ON userId = foodUserId WHERE userTypeOf = "sponsor" ORDER BY foodAdded DESC LIMIT 1;',
            function (error, advertising) {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, advertising);
                }
            }
        );
    }
};

productModel.getFollowers = function (callback) {
    if (mySql.connection) {
        mySql.connection.query(
            'SELECT FLL.followFoodId, count(*) as followers FROM FOLLOWING as FLL GROUP BY FLL.followFoodId', 
            function (error, followers) {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, followers);
                }
            }
        );
    }
};

productModel.getProductImages = function (callback) {
    if (mySql.connection) {
        mySql.connection.query(
            'select F.foodId, I.imagePath from FOOD as F left join FOODIMAGES as FI ON F.foodId = FI.fooimgFoodId left join IMAGES as I ON FI.fooimgImageId = I.imageId', 
            function (error, images) {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, images);
                }
            }
        );
    }
};

module.exports = productModel;