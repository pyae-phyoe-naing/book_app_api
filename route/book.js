const router = require('express').Router();
const controller = require('../controller/book');
const { saveFile } = require('../utils/gallery');
const {
    BookSchema,
    AllSchema
} = require('../utils/schema');
const {
    validateBody,
    validateParam
} = require('../utils/validator');

router.get('/', controller.all);
 router.post('/', [validateBody(BookSchema.Add), saveFile, controller.add]);
 router.post('/add/category', [validateBody(BookSchema.BookAddCategory), controller.bookAddCategory]);
 router.post('/remove/category', [validateBody(BookSchema.BookAddCategory), controller.bookRemoveCategory]);

module.exports = router;