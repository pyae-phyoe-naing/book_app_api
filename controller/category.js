const DB = require('../model/category');
const {
    responseMsg
} = require('../utils/helper');

const all = async (req, res, next) => {
    let cats = await DB.find();
    responseMsg(res, true, 'All Category', cats);
}
const add = async (req, res, next) => {
    let existCat = await DB.findOne({
        name: req.body.name
    });
    if (existCat) {
        next(new Error('Category name is already in use!'));
    } else {
        console.log(req.body.name);
        let cat = await new DB(req.body).save();
        responseMsg(res, true, 'Success add new category', cat);
    }

}

module.exports = {
    all,
    add
}