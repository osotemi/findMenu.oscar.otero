var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

exports.sendEmail = function (req, res) {
    var email = {};
    var emailTo = 'oscarompro@gmail.com';
    var emailFrom = 'oscarompro@gmail.com';
    var body='';
    //Conseguir sendgridKey y montar transort para email
    console.log('--> Clavve sendgrid: ' + process.env.sendgridKey);
    var options = {
        auth: {
            api_key: process.env.sendgridKey
        }
    };
    var mailer = nodemailer.createTransport(sgTransport(options));
    var templateHtml = '';
    console.log(req.body);

    switch (req.body.template) {
        case 'toUserTemplate':
            emailTo = req.body.from;
            body = '<body>' +
                    '<div id="contact-email">' +
                    '<div> <h1>Contacto con Findmenu</h1> <h4>Sugerencia: ' + req.body.subject +
                    '</h4></div>' +
                    '<p>Sr/Sra: ' + req.body.name + ' Su petición ha sido recibida por'+
                    'el equipo de Findmenu, en breve responderán por su interés</p>' +
                    '<p>Puede seguir disfrutando de los servicios de Findmenu pulsando'+
                    '<a href="http://localhost:3000/">aqu&iacute;</a></p>' +
                    '</div>' +
                    ' </body>';
            break;
        default:
            break;
    }

    templateHtml = '<html><head><meta charset="utf-8" /></head>' + body +'</html>';

    email = {
        from: emailFrom,
        to: emailTo,
        subject: req.body.subject,
        text: req.body.text,
        html: templateHtml
    };

    console.log(email);
    mailer.sendMail(email, function (error, info) {
        if (error) {
            res.status('401').json({
                err: info
            });
        } else {
            res.status('200').json({
                success: true
            });
        }
    });
};