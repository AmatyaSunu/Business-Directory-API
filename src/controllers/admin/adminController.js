require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admins from '../../models/admins';
import {SUCCESS, EMAIL_EXIST, LOGIN,RESET, NO_RECORD_FOUND, BUSINESS, BAD_REQUEST} from '../../constants/lang';
import Tokens from  '../../models/tokens';
import resetPasswordMail from "../../services/resetPasswordMail";

export const addAdmin = async (req, res, next) => {
        console.log("Adding admin...");
        try {
            //checking for existing admin
            await Admins.findOne({email: req.body.email })
                .then(function(adminUser){
                    if(adminUser){
                        res.status(EMAIL_EXIST.httpCode).json({
                            message:EMAIL_EXIST.message
                        });
                        console.log("email already exist")
                    } else {
                        //assign admin token
                        const adminToken = jwt.sign({
                            data: adminUser
                        }, process.env.ADMIN_TOKEN, {expiresIn: '2h'});
                        console.log("Token assigned "+ adminToken);

                        //creating new object to assign value
                        const newAdmin = new Admins({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            imageURL: req.body.imageURL,
                            token: adminToken
                        });
                        console.log(newAdmin);

                        //hashing password
                        bcrypt.genSalt(10, (err,salt)=> {
                            bcrypt.hash(newAdmin.password, salt,(err,hash) => {
                                //set password to hash
                                newAdmin.password = hash;
                                //saving new admin
                                newAdmin.save()
                                    .then(() => {
                                        res.status(SUCCESS.httpCode).json({
                                            message: SUCCESS.message
                                        });
                                        console.log("Data Saved");
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    }

                });
        }catch(err) {
            console.log("Error in adding admin. "+ err);
        }
        next();
};

export const login = async (req, res, next) => {
    console.log("Logging User...");
    try{
        const admin = await Admins.findOne({email: req.body.email}).exec();
        //console.log(admin);
        if(!admin) {
            console.log("Email not found");
            res.status(NO_RECORD_FOUND.httpCode).json({
                message:NO_RECORD_FOUND.message,
                status: NO_RECORD_FOUND.httpCode
            });
        } else {
                if(bcrypt.compare(req.body.password, admin.password)){
                    console.log(admin);
                    //access token
                    const accessToken = jwt.sign({
                        data: admin
                    },process.env. ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

                    //refresh token
                    const refreshToken = jwt.sign({
                        data: admin
                    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5h'});

                    //save token
                    const newToken = new Tokens({
                        userId: admin._id,
                        accessToken: accessToken,
                        refreshToken : refreshToken
                    });

                    newToken.save()
                        .then(()=> console.log(newToken))
                        .catch(err => console.log(err));

                    res.status(LOGIN.SUCCESS.httpCode).json({
                        message: LOGIN.SUCCESS.message,
                        status: LOGIN.SUCCESS.httpCode,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
                    } else {
                    res.status(LOGIN.NOT_MATCHED.httpCode).json({
                        message: LOGIN.NOT_MATCHED,
                        status: LOGIN.NOT_MATCHED.httpCode
                    });
                }
          //  })
        }
    }catch(err) {
        console.log(' Error in logging user. ' +err);
    }
    next();
};

export const forgotPassword = async (req, res, next) => {
    console.log("Sending Reset Mail...");
    try {
        const admin = await Admins.findOne({email: req.body.email}).exec();
        //console.log(admin);
        if (!admin) {
            console.log("Email not found");
            res.status(NO_RECORD_FOUND.httpCode).json({
                message: NO_RECORD_FOUND.message,
                status: NO_RECORD_FOUND.httpCode
            });
        } else {
            if (resetPasswordMail(req.body)) {
                res.status(RESET.CONTACT.httpCode).json({
                    message: RESET.CONTACT.message,
                    status: RESET.CONTACT.httpCode
                });
            } else {
                res.status(BAD_REQUEST.httpCode).json({
                    message: BAD_REQUEST.message
                });
            }
        }
    }catch(err){
        console.log("Error in sending reset mail"+err);
    }
    next();
};

export const resetPassword = async (req, res, next) => {

};