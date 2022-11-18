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
        }),
        BookAddCategory: Joi.object({
            bookID: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
            categoryID: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
        })
    },
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }
}