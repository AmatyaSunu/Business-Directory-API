import express from 'express';
import {addBusiness,
    searchByName,
    contactBusiness,
    newBusinessByUser,
    claimBusiness} from "../../controllers/api/businessController";
import {validateBusinessDetails,
    validateNameSearch,
    validateContactBusiness} from '../../middlewares/validations/businessValidate';

const businessRouter = express.Router();

/**
 * @typedef validationResponse
 * @property {string} message - Response message
 */

/**
 * @typedef businessSearch
 * @property {string} search.required -businessName - eg: pvt
 */

/**
 * Search by business name
 * @route post /business/searchByName
 * @group Business - information about business
 * @param {businessSearch.model} body.body.required- search key
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - Operation Success
 * @returns {validateResponse.model} 404 - No Record Found
 */
businessRouter.post('/searchByName', validateNameSearch, searchByName);

/**
 * @typedef addBusiness
 * @property {string} contactName.required -contactName - eg: EB
 * @property {string} businessName.required -businessName - eg: ktm Pvt. Ltd.
 * @property {string} email.required -email - eg: ebpearls@ebp.com.au
 * @property {string} contactNumber.required -email - eg: 0188823456
 * @property {string} category.required -email - eg: software
 * @property {string} address.required -email - eg: kandevsthan
 */

/**
 * Search by business name
 * @route post /business/addBusiness
 * @group Business - adding new business by admin
 * @param {addBusiness.model} body.body.required- new business data
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - New Business Added
 * @returns {validateResponse.model} 409 - Business Name already exist
 */
businessRouter.post('/addBusiness', validateBusinessDetails, addBusiness);
/**
 * @typedef contactBusiness
 * @property {string} businessName.required -businessName - eg: Eb Pearls Pvt. Ltd.
 * @property {string} name.required -contactName - eg: Philip Adam
 * @property {string} email.required -email - eg: ebpearls@ebp.com.au
 * @property {string} contactNumber.required -email - eg: 9169325228
 * @property {string} address.required -email - eg: street 64abc hall
 * @property {string} message.required -email - eg: this should be saved in db
 */

/**
 * Search by business name
 * @route post /business/contactBusiness
 * @group Business - user contacting business
 * @param {contactBusiness.model} body.body.required- contact user data
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 205 - Your message is sent
 * @returns {validateResponse.model} 409 - Operation Unsuccessful
 */
businessRouter.post('/contactBusiness', validateContactBusiness , contactBusiness);

/**
 * @typedef businessByUser
 * @property {string} contactName.required -contactName - eg: xyz
 * @property {string} businessName.required -businessName - eg: xyz Pvt. Ltd.
 * @property {string} email.required -email - eg: ebpearls@ebp.com.au
 * @property {string} contactNumber.required -email - eg: 0188823456
 * @property {string} category.required -email - eg: software
 * @property {string} address.required -email - eg: kandevsthan
 */

/**
 * Add business by user
 * @route post /business/newBusinessByUser
 * @group Business - user adding new business
 * @param {businessByUser.model} body.body.required- add business by user
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - Details send for approval
 * @returns {validateResponse.model} 409 - Already on to be approved list
 */
businessRouter.post('/newBusinessByUser',validateBusinessDetails, newBusinessByUser);

/**
 * @typedef claimBusiness
 * @property {string} businessId.required -businessId - eg: 5e2aae9e4519141c58d0516f
 * @property {string} contactName.required -contactName - eg: Philip Adam
 * @property {string} businessName.required -businessName - eg: XYZ pvt. ltd.
 * @property {string} email.required -email - eg: ebpearls@ebp.com.au
 * @property {string} contactNumber.required -email - eg: 9169325228
 * @property {string} category.required -email - eg: software
 * @property {string} address.required -email - eg: Kathmandu
 */
/**
 * Add business by user
 * @route put /business/claimBusiness
 * @group Business - user claiming existing business
 * @param {claimBusiness.model} body.body.required- add business by user
 * @produces application/json
 * @consumes application/json
 * @returns {validateResponse.model} 200 - Operation Success
 */
businessRouter.put('/claimBusiness', validateBusinessDetails, claimBusiness);

export default businessRouter;
