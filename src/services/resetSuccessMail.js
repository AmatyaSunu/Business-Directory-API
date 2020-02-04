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
        defaultLayout: "resetSuccess",
        partialsDir: 'src/templates/partials/'
    },
    viewPath: 'src/templates/',
    extName: '.hbs'
};
transport.use("compile", hbs(options));

export function resetSuccessMail(emailObj) {
    console.log(emailObj);
    transport.sendMail(
        {
            from: 'sunidhiamatya.ebp@gmail.com',
            to: emailObj.email,
            subject: 'Reset Password Successful',
            template: 'resetSuccess',
            context: {
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

export default resetSuccessMail;