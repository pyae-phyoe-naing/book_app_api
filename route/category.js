const router = require('express').Router();
const controller = require('../controller/category');

router.get('/',controller.all);

module.exports = router;