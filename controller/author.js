const DB = require('../model/author');
const {
    responseMsg
} = require('../utils/helper');

const all = async (req, res, next) => {
    let authors = await DB.find().select('-__v');
    responseMsg(res, true, 'All Author', authors);
}
const add = async (req, res, next) => {
    let existAuthor = await DB.findOne({
        name: req.body.name
    });
    if (existAuthor) {
        next(new Error('Author name is already in use!'));
    } else {
        let author = await new DB(req.body).save();
        responseMsg(res, true, 'Success add new author', author);
    }

}
const get = async (req, res, next) => {
    let existAuthor = await DB.findById(req.params.id).select('-__v');
    if (!existAuthor) {
        next(new Error('Author not found with that ID'));
        return;
    }
    responseMsg(res, true, 'Get Author', existAuthor);
}
const patch = async (req, res, next) => {
    let existAuthor = await DB.findById(req.params['id']);
    if (existAuthor) {
        await DB.findByIdAndUpdate(existAuthor._id, req.body);
        let updateAuthor = await DB.findById(existAuthor._id).select('-__v');
        responseMsg(res, true, 'Success Update Author', updateAuthor);
    } else {
        next(new Error('Author not found with that ID'));
    }
}
const drop = async (req, res, next) => {
    let existAuthor = await DB.findById(req.params['id']);
    if (existAuthor) {
        await DB.findByIdAndDelete(existAuthor._id);
        responseMsg(res, true, 'Success Delete Author', existAuthor);
    } else {
        next(new Error('Author not found with that ID'));
    }
}
module.exports = {
    all,
    add,
    get,
    patch,
    drop
}