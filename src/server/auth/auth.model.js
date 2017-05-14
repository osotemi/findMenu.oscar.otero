'use strict';

var mySql = require('../config/config.db.js');

var authModel = {};

authModel.setUser = function (userData, callback) {
    console.log('authModel.setUser' + JSON.stringify(userData))
    if (mySql.connection) {
        mySql.connection.query('INSERT INTO USERS SET ?', userData, function (err, result) {
            console.log('authModel' + JSON.stringify(result))
            if (err) {
                throw err;
            } else {
                callback(result);
            }
        });
    }
};

authModel.countUser = function (user, callback) {
    console.log('authModel.countUser' + JSON.stringify(user));
    if (mySql.connection) {
        mySql.connection.query('SELECT COUNT(*) AS userCount FROM USERS WHERE userName like "' + user + '"', 
        function (error, rows) {
            if (error) {
                console.log('authModel.countUser error' + error);
                throw error;
            } else {
                console.log('authModel.countUser rows' + rows);
                callback(rows);
            }
        });
    }
};

module.exports = authModel;