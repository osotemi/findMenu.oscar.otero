var Controller = require ('./email.controller');

module.exports = function(app) {
    app.post('/api/sendmail', Controller.sendAnEmail);
};
