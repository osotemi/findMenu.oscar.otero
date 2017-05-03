var email = require('../utils/email.js');

exports.sendAnEmail = function (req, res) {

    email.sendEmail(req, res);

};
