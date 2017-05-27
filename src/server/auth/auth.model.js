'use strict';

var mySql = require('../config/config.db.js');

var authModel = {};

authModel.getUser = function (userData, callback) {
    if (mySql.connection) {
        mySql.connection.query(
            'SELECT * FROM USERS WHERE userEmail = ? AND userPassword = ?', userData, function (err, result) {
                if (err) {
                    console.log('getUser OK');
                    throw err;
                } else {
                    console.log('getUser FAIL');
                    callback(result);
                }
            }
        );
    }
};

authModel.setUser = function (userData, callback) {
    if (mySql.connection) {
        mySql.connection.query('INSERT INTO USERS SET ?', userData, function (err, result) {
            if (err) {
                throw err;
            } else {
                callback(result);
            }
        });
    }
};

authModel.countUser = function (user, callback) {
    if (mySql.connection) {
        mySql.connection.query('SELECT COUNT(*) AS userCount FROM USERS WHERE userName like "' + user + '"', function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(rows);
            }
        });
    }
};

module.exports = authModel;