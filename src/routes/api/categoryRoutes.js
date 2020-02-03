import express from 'express';
import {fetchCategory,
    addCategory,
    searchByCategory} from '../../controllers/api/categoryController';
import {validateCategoryDetails,
        validateCategorySearch} from "../../middlewares/validations/categoryValidate";

const categoryRouter = express.Router();

/**
 * @typedef validationResponse
 * @property {string} message - Response message
 */

/**
 *  * List categories
 * @route get /category/fetchCategory
 * @group Category - information about category
 * @operationId fetchCategory
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - Category Fetch Successful
 * @returns {validateResponse.model} 400 - Category Cannot Be Fetched
 */
categoryRouter.get('/fetchCategory', fetchCategory);

/**
 * @typedef categorySearch
 * @property {string} category.required -categoryTitle - eg: software
 */

/**
 * Search business by category name
 * @route post /category/searchByCategory
 * @group Category - search business by category name
 * @param {categorySearch.model} body.body.required- Category title
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - Operation Success
 * @returns {validateResponse.model} 404 - No Record Found
 */
categoryRouter.post('/searchByCategory', validateCategorySearch, searchByCategory);

/**
 * @typedef categoryDetails
 * @property {string} title.required -categoryTitle - eg: Health
 * @property {string} email.required -adminTitle - eg: ebp@gmail.com
 */
/**
 * Add category
 * @route POST /category/addCategory
 * @group Category - add new categories
 * @param {categoryDetails.model} body.body.required- Add New Category
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - New Category Added
 * @returns {validateResponse.model} 409 - Category Name already exist
 */
categoryRouter.post('/addCategory', validateCategoryDetails, addCategory);

export default categoryRouter;
