require('dotenv').config();
import Businesses from '../../models/businesses';
import ContactBusinesses from "../../models/contactBusinesses";
import NewBusinesses from '../../models/newBusinesses';
import Categories from '../../models/categories';
import {SUCCESS, BAD_REQUEST, BUSINESS, NO_RECORD_FOUND, CATEGORY} from '../../constants/lang';
import dispatchMail from "../../services/MailerService";
import {emailFormatting} from "../../helpers/basicHelper";
let flag = false;

export const addBusiness = async (req, res, next) => {
    console.log("Adding New Business....");
    try{
        const result = await Businesses.findOne({businessName: req.body.businessName});
                if(result){
                    res.status(BUSINESS.EXIST.httpCode).json({
                        message: BUSINESS.EXIST.message,
                        status: BUSINESS.EXIST.httpCode
                    });
               console.log("Already exist");
               }else {
                    console.log(req.body);
                    const category = await Categories.findOne({title: req.body.category})
                        .exec();
                    const objectId = category._id;
                    const correctEmailFormat = await emailFormatting(req.body.email);
                    const newBusiness = new Businesses({
                        contactName: req.body.contactName,
                        businessName: req.body.businessName,
                        email: correctEmailFormat,
                        contactNumber: req.body.contactNumber,
                        category: objectId,
                        address: req.body.address,
                        imageURL: req.body.imageURL
                    });
                    console.log(newBusiness);
                    newBusiness.save()
                        .then(() => {
                            flag = true;
                            console.log("New Business Saved");
                        })
                        .catch(err => console.log("Error in adding new business. " + err));
                }
                if(flag){
                    res.status(BUSINESS.SUCCESS.httpCode).json({
                        message: BUSINESS.SUCCESS.message
                    });
                }
    }catch(err){
        console.log("Error in adding business. "+err);
    }
    next();
};
/** function to search by business's name
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export const searchByName = async(req, res, next) => {
    console.log("Searching by Business Name....");
    try{
        let query = {$text: {$search: req.body.search}};
        const options = {
            page: 1,
            limit: 2
        };
        const aggregate = Businesses.aggregate([{$match: query}]);
        const result = await Businesses.aggregatePaginate(aggregate, options);
        //const result = await Businesses.find(query);
        if(result.docs.length === 0 ){
            res.status(NO_RECORD_FOUND.httpCode).json({
                message: NO_RECORD_FOUND.message,
                status: NO_RECORD_FOUND.httpCode
            });
            console.log(result);
        } else {
            res.status(BUSINESS.SUCCESS.httpCode).json({
                status: BUSINESS.SUCCESS.httpCode,
                data: {result}
            });
        }
    }catch(err) {
        console.log("Error in search. " + err);
    }
    next();
};

/** function to contact business
 *
 */
export const contactBusiness = async(req, res, next) => {
  console.log("Contacting Business....");
  try {
      const result = await Businesses.findOne({businessName: req.body.businessName})
          .exec();
      console.log(result);
      const objectId = result._id;
      const newContactBusiness = new ContactBusinesses({
          businessId:objectId,
          name: req.body.name,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          address: req.body.address,
          message: req.body.message
      });
      console.log(newContactBusiness);
      newContactBusiness.save()
          .then(() => {
              console.log("Contact Business Saved");
             flag = true;
              if(flag){
                  /**send email to the business contact
                   *
                   */
                  dispatchMail(newContactBusiness);
                  res.status(BUSINESS.CONTACT.httpCode).json({
                      message: BUSINESS.CONTACT.message,
                      status: BUSINESS.CONTACT.httpCode
                  });
              }else{
                  res.status(BAD_REQUEST.httpCode).json({
                      message: BAD_REQUEST.message
                  });
              }
          })
          .catch(err => console.log("Error in adding new business. " + err));
  }catch(err) {
          console.log(" Error in contacting business. "+ err);
      next(err);
  }
};

export const newBusinessByUser = async(req, res, next) => {
  console.log("New business data by user...")  ;
    try{
        const result = await NewBusinesses.findOne({businessName: req.body.businessName});
        if(result){
            res.status(BUSINESS.PENDING.httpCode).json({
                message: BUSINESS.PENDING.message,
                status: BUSINESS.PENDING.httpCode
            });
            console.log("Already exist");
        }else {
            const category = await Categories.findOne({title: req.body.category})
                .exec();
            const newUserBusiness = new NewBusinesses({
                contactName: req.body.contactName,
                businessName: req.body.businessName,
                email: req.body.email,
                contactNumber:req.body.contactNumber,
                category: category._id,
                address: req.body.address,
                imageURL: req.body.imageURL,
                addBusinessToken: process.env.ADD_BUSINESS_TOKEN
            });
            console.log(newUserBusiness);
            newUserBusiness.save()
                .then(() => {
                    flag = true;
                    console.log("New Business Saved");
                })
                .catch(err => console.log("Error in adding new business. "+err));
        }
        if(flag){
            res.status(BUSINESS.SEND_TO_ADMIN.httpCode).json({
                message: BUSINESS.SEND_TO_ADMIN.message,
                status: BUSINESS.SEND_TO_ADMIN.status
            });
        }
    }catch(err){
        console.log("Error in adding business. "+err);
    }
    next();
};

export const claimBusiness = async (req, res, next) => {
    console.log("Claiming business....");
    try{
        const category = await Categories.findOne({title: req.body.category})
            .exec();
        const result = await Businesses.findOneAndUpdate({_id: req.body.businessId}, {
            contactName: req.body.contactName,
            businessName: req.body.businessName,
            email: req.body.email,
            contactNumber:req.body.contactNumber,
            category: category._id,
            address: req.body.address,
            imageURL: req.body.imageURL
        });
        console.log(result);

        if(result) {
            res.status(SUCCESS.httpCode).json({
                message: SUCCESS.message,
                data: {result}
            });
        }
    }catch(err) {
        console.log("Error in claiming the business. "+ err);
    }
};
