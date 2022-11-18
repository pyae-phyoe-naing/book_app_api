const router = require('express').Router();
const controller = require('../controller/book');
const { saveFile, updateFile } = require('../utils/gallery');
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
router.route('/:id')
    .patch([validateParam(AllSchema.id, 'id'), validateBody(BookSchema.Add), updateFile, controller.patch]);

module.exports = router;