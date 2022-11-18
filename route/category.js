const router = require('express').Router();
const controller = require('../controller/category');
const {
    CategorySchema,
    AllSchema
} = require('../utils/schema');
const {
    validateBody,
    validateParam
} = require('../utils/validator');

router.get('/', controller.all);
router.post('/', [validateBody(CategorySchema.Add), controller.add]);

router.route('/:id')
    .get(validateParam(AllSchema.id, 'id'), controller.get)
    .patch([validateParam(AllSchema.id, 'id'), validateBody(CategorySchema.Add), controller.patch])
    .delete(validateParam(AllSchema.id, 'id'), controller.drop);

module.exports = router;