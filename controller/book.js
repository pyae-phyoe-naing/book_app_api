const DB = require('../model/book');
const catDB = require('../model/category');
const {
    responseMsg
} = require('../utils/helper');

const all = async (req, res, next) => {
    let books = await DB.find().populate('categories', '-__v').select('-__v');
    responseMsg(res, true, 'All Books', books);
}
const add = async (req, res, next) => {

    let book = await new DB(req.body).save();
    responseMsg(res, true, 'Book add success', book);

}
const bookAddCategory = async (req, res, next) => {
    let dbBook = await DB.findById(req.body.bookID);
    let dbCategory = await catDB.findById(req.body.categoryID);
    if (dbBook && dbCategory) {
        let existCat = dbBook.categories.includes(dbCategory._id);
        if (!existCat) {
            await DB.findByIdAndUpdate(dbBook._id, { $push: { categories: dbCategory._id } });
            let bookAddCat = await DB.findById(dbBook._id).populate('categories', '-__v').select('-__v');
            responseMsg(res, true, 'Category add success in book', bookAddCat);
        } else {
            next(new Error('This category is already exists.'));
        }
    } else {
        next(new Error('Not Found Error , check ID'));
    }
}
module.exports = {
    all,
    add,
    bookAddCategory
}