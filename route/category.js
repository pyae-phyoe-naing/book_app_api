const router = require('express').Router();
const controller = require('../controller/category');
const {
    CategorySchema
} = require('../utils/schema');
const {
    validateBody
} = require('../utils/validator');

router.get('/', controller.all);
router.post('/', [validateBody(CategorySchema.Add), controller.add]);

module.exports = router;