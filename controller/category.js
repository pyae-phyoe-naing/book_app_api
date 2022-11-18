const DB = require('../model/category');
const {
    responseMsg
} = require('../utils/helper');

const all = async (req, res, next) => {
    let cats = await DB.find().select('-__v');
    responseMsg(res, true, 'All Category', cats);
}
const add = async (req, res, next) => {
    let existCat = await DB.findOne({
        name: req.body.name
    });
    if (existCat) {
        next(new Error('Category name is already in use!'));
    } else {
        let cat = await new DB(req.body).save();
        responseMsg(res, true, 'Success add new category', cat);
    }

}
const get = async (req, res, next) => {
        let existCat = await DB.findById(req.params.id).select('-__v');
        if (!existCat) {
            next(new Error('Category not found with that ID'));
            return;
        }
        responseMsg(res, true, 'Get Category', existCat);
}
const patch = async (req, res, next) => {
    let existCat = await DB.findById(req.params['id']);
    if (existCat) {
        await DB.findByIdAndUpdate(existCat._id, req.body);
        let updateCat = await DB.findById(existCat._id).select('-__v');
        responseMsg(res, true, 'Success Update Category', updateCat);
    } else {
        next(new Error('Category not found with that ID'));
    }
}
const drop = async (req, res, next) => {
    let existCat = await DB.findById(req.params['id']);
    if (existCat) {
        await DB.findByIdAndDelete(existCat._id);
        responseMsg(res, true, 'Success Delete Category', existCat);
    } else {
        next(new Error('Category not found with that ID'));
    }
}
module.exports = {
    all,
    add,
    get,
    patch,
    drop
}