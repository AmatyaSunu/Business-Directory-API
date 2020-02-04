import nodeMailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import config from "../config";
let flag;

let emailConfig = {
    host: config.mailer.host,
    port: config.mailer.port,
    secure: false,
    auth: {
        user: config.mailer.username,
        pass: config.mailer.password
    }
};

let transport = nodeMailer.createTransport(emailConfig);

let options = {
    viewEngine: {
        extname: ".hbs",
        layoutsDir: 'src/templates/',
        defaultLayout: "forgotPassword",
        partialsDir: 'src/templates/partials/'
    },
    viewPath: 'src/templates/',
    extName: '.hbs'
};
transport.use("compile", hbs(options));

export function forgotPasswordMail(emailObj) {
 console.log(emailObj);
    transport.sendMail(
        {
            from: 'sunidhiamatya.ebp@gmail.com',
            to: emailObj.email,
            subject: 'Reset Password Link',
            template: 'forgotPassword',
            context: {
                url: 'www.google.com',
                firstName: emailObj.firstName,
                lastName: emailObj.lastName
            }
        },
        function (err, info){
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
                return flag = true;
            }
        });
}

export default forgotPasswordMail;