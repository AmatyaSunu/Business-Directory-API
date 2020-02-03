import Joi from '@hapi/joi';

module.exports = {
    validateBusinessDetails: (req, res, next) => {
        const schema = Joi.object().keys({
            contactName: Joi.string().trim().min(3).max(30).required(),
            businessName: Joi.string().trim().min(3).max(100).required(),
            email: Joi.string().email().trim().min(3).required(),
            contactNumber: Joi.number().required(),
            category: Joi.string().trim().required(),
            address: Joi.string().trim().required(),
            imageURL: Joi.string().trim().required(),
        });
        next();
        console.log("Business details validation complete");
    },

    validateNameSearch: (req, res, next) => {
        const schema = Joi.object().keys({
            search: Joi.string().required,
        });
        next();
        console.log("Business name search validation complete");
    },

    validateContactBusiness: (req, res, next) => {
        const schema = Joi.object().keys({
            businessName: Joi.string().trim().min(3).max(100).required(),
            name: Joi.string().trim().min(3).max(30).required(),
            email: Joi.string().email().trim().min(3).required(),
            contactNumber: Joi.number().required(),
            address: Joi.string().trim().required(),
            message: Joi.string().trim().required(),
        });
        next();
        console.log("Contact business validation complete");
    }

};

