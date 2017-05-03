'use strict';

var mySql = require('../config/config.db');

var authModel = {};

authModel.setUser = function (userData, callback) {

    if (mySql.connection) {
        mySql.connection.query('INSERT INTO users SET ?', userData, function (err, result) {
            if (err) {
                throw err;
            } else {
                callback(result);
            }
        });
    }
};