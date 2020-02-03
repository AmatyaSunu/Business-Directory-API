import Joi from '@hapi/joi';

module.exports = {
    validateCategoryDetails: (req, res, next) => {
        const schema =  Joi.object().keys({
            title: Joi.string().trim().min(3).max(100).required(),
            email: Joi.string().email().trim().min(3).required(),
            imageURL: Joi.string().trim().required(),
        });
        next();
        console.log("Category details validation complete");
    },
    validateCategorySearch: (req, res, next) => {
        const schema = Joi.object().keys({
            category: Joi.string().required,
        });
        next();
        console.log("Category search validation complete")
    }

};

