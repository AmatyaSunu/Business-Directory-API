require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admins from '../../models/admins';
import {SUCCESS, EMAIL_EXIST} from '../../constants/lang';

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
            console.log("Error in adding admin. Error details: "+ err);
        }
        next();
};