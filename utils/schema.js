const Joi = require('joi');

module.exports = {
    CategorySchema: {
        Add: Joi.object({
            name: Joi.string().required()
        })
    },
    BookSchema: {
        Add: Joi.object({
            name: Joi.string().required(),
            author: Joi.string().required(),
            link: Joi.string().required(),
        })
    },
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }
}