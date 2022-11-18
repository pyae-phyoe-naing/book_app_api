const DB = require('../model/book');
const {
    responseMsg
} = require('../utils/helper');

const all = async (req, res, next) => {
    let books = await DB.find().populate('categories', '-__v').select('-__v');
    responseMsg(res, true, 'All Books', books);
}
const add = async (req, res, next) => {

    let book = await new DB(req.body).save();
    responseMsg(res, true, 'Book add success',book);

}
module.exports = {
    all,
    add
}