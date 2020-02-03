require('dotenv').config();
import Categories from '../../models/categories';
import {CATEGORY,
    NO_RECORD_FOUND, SUCCESS} from "../../constants/lang";
import Businesses from "../../models/businesses";
import Admins from "../../models/admins";

export const  addCategory =  async (req, res, next) => {
    console.log("Adding Category...");
    try {
        //checking if already exist
      const category =  await Categories.findOne({title: req.body.title});
        if(category){
            res.status(CATEGORY.EXIST.httpCode).json({
                message: CATEGORY.EXIST.message,
                status: CATEGORY.EXIST.httpCode
            });
            console.log("Category already exist");
        }else {
            const adminResult = await Admins.findOne({email: req.body.email})
                .exec();
                    //creating new object to assign value
                    const newCategory = new Categories({
                        title: req.body.title,
                        createdBy: adminResult._id,
                        imageURL: req.body.imageURL
                    });
                    console.log(newCategory);
                    //saving new admin
                    newCategory.save()
                        .then(() => {
                            res.status(CATEGORY.ADD.httpCode).json({
                                message: CATEGORY.ADD.message,
                                status: CATEGORY.ADD.httpCode
                            });
                            console.log("Data Saved");
                        })
                        .catch(err => console.log(err));
            }
    }catch(err) {
        console.log("Error in adding category. Error details: "+ err);
    }
    next();
};
/**
 * function to fetch all categories for display
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const fetchCategory = async (req, res, next) => {
    console.log("Fetching Category...");
    try{
        const options = {
            page: 1,
            limit: 3
        };
        const myAggregate = Categories.aggregate();
        const result = await Categories.aggregatePaginate(myAggregate, options);
                if(result){
                    res.status(CATEGORY.SUCCESS.httpCode).json({
                        status: CATEGORY.SUCCESS.httpCode,
                        data: {result}
                    });
                    console.log(result);
                }else{
                    res.status(CATEGORY.UNSUCCESS.httpCode).json({
                        message: CATEGORY.UNSUCCESS.message,
                        status: CATEGORY.UNSUCCESS.httpCode
                    });
                }
    }catch(err){
        console.log("Error in fetching Categories. Error details: "+ err);
    }
    next();
};
/**  function to search by category title
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const searchByCategory = async (req, res, next) => {
    console.log("Searching by category...");
    try{
       const objectId = await Categories.find({title: req.body.category})
           .exec();
        const options = {
            page: 1,
            limit: 2
        };
       const myAggregate = Businesses.aggregate();
       const result = await Businesses.aggregatePaginate(myAggregate,options);
                if(result){
                    res.status(SUCCESS.httpCode).json({
                        status: SUCCESS.httpCode,
                        data: {result}
                    });
                    console.log(result);
                } else {
                    res.status(NO_RECORD_FOUND.httpCode).json({
                        message: NO_RECORD_FOUND.message,
                        status: NO_RECORD_FOUND.httpCode
                    });
                }
    }catch(err){
        console.log("Error in search. Error: " + err);
    }
    next();
};


