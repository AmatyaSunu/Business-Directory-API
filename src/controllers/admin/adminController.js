require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admins from '../../models/admins';
import {SUCCESS, EMAIL_EXIST, LOGIN,RESET, NO_RECORD_FOUND, BUSINESS, BAD_REQUEST} from '../../constants/lang';
import LoginTokens from '../../models/loginTokens';
import ResetTokens from '../../models/resetToken';
import forgotPasswordMail from "../../services/forgotPasswordMail";
import resetSuccessMail from "../../services/resetSuccessMail";
let flag = false;
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
                            accessToken: adminToken
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
                    const newToken = new LoginTokens({
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
            return res.status(NO_RECORD_FOUND.httpCode).json({
                message: NO_RECORD_FOUND.message,
                status: NO_RECORD_FOUND.httpCode
            });
        } else {
               //reset token
                const resetToken = jwt.sign({
                    data: admin
                }, process.env.RESET_TOKEN_SECRET, {expiresIn: '1h'});

                //save token
                const newToken = new ResetTokens({
                    adminId: admin._id,
                    resetToken: resetToken
                });

                newToken.save()
                    .then(()=> console.log(newToken))
                    .catch(err => console.log(err));

                //find id and update reset token
                const update = Admins.findByIdAndUpdate({_id: admin._id}, {resetToken: resetToken, resetTokenExpires: Date.now() + 86400000 }).exec();

                //send reset link email
                forgotPasswordMail(admin);

                return res.status(RESET.CONTACT.httpCode).json({
                    message: RESET.CONTACT.message,
                    status: RESET.CONTACT.httpCode
                });

        }
    }catch(err){
        console.log("Error in sending reset mail"+err);
    }
    next();
}

export async function resetPassword(req, res, next) {
        console.log("Resetting password");
        try{
            const admin = await Admins.findOne({
                resetToken: req.body.token,
                resetTokenExpires:req.body.resetTokenExpires
            }).exec();
            console.log(admin);
                if(admin) {
                    if(req.body.newPassword === req.body.verifyPassword) {

                        //hashing password
                        let newPassword = bcrypt.hashSync(req.body.newPassword, 10);
                        /*bcrypt.genSalt(10, (err,salt)=> {
                            bcrypt.hash(req.body.newPassword, salt,(err,hash) => {
                                //updating admin
                              let newPassword = hash;
                            })
                        });*/

                        const result = await Admins.findOneAndUpdate({_id: admin._id}, {password: newPassword, resetToken: undefined, resetTokenExpires: undefined}).exec();
                        await resetSuccessMail(result);
                    }else {
                        console.log("Passwords do not match");
                        // return res.status(422).json({
                        //     message: 'Passwords do not match'
                        // });
                    }
                } else {
                    console.log("Password reset token is invalid or has expired");
                    // return res.status(400).json({
                    //     message: 'Password reset token is invalid or has expired.'
                    // });
                }

        }catch(err){
            console.log("Error in sending reset mail"+err);
        }
    next();
};