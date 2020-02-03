import nodeMailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import config from "../config";

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
        viewEngine: 'handlebars',
        viewPath: '../templates/',
        extName: '.html'
    };
    transport.use("compile", hbs(options));

    export function dispatchMail(emailObj) {
    const mailFormat = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
        <li>Name: ${emailObj.name}</li>
        <li>Email: ${emailObj.email}</li>
        <li>Contact Number: ${emailObj.contactNumber}</li>
        <li>Address: ${emailObj.address}</li>
        </ul>
        <h3>Message</h3>
        <p>${emailObj.message}</p>`;

    transport.sendMail(
        {
            from: 'sunidhiamatya.ebp@gmail.com',
            to: emailObj.email,
            subject: 'Feedback from User',
            text: mailFormat,
        },
        function (err, info){
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
    });
}
    export default dispatchMail;

    /*export function resetPasswordMail(emailObj) {

        transport.sendMail(
            {
                from: 'sunidhiamatya.ebp@gmail.com',
                to: emailObj.email,
                subject: 'Reset Password Link',
                text: 'forgotPassword',
                context: {
                    url: 'www.google.com',
                    name: emailObj.name.split(' ')[0]
                }
            },
            function (err, info){
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    export default resetPasswordMail;*/