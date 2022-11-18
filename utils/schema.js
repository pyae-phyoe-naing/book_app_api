const Joi = require('joi');

module.exports = {
    CategorySchema: {
        Add: Joi.object({
            name : Joi.string().required()
        })
    }
}