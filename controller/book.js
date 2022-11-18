const DB = require('../model/book');
const catDB = require('../model/category');
const { deleteFile } = require('../utils/gallery');
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
const get = async (req, res, next) => {
    let book = await DB.findById(req.params.id).populate('categories', '-date -__v').select('-__v');
    if (!book) {
        next(new Error('book not found with that ID'));
        return;
    }
    responseMsg(res, true, 'Get single book', book);
}
const patch = async (req, res, next) => {
    let book = await DB.findById(req.params.id);
    if (!book) {
        next(new Error('Book not found with that ID'));
        return;
    }
    if (req.body.image) {
        deleteFile(book.image);
    }
    await DB.findByIdAndUpdate(book._id, req.body);
    let updateBook = await DB.findById(book._id);
    responseMsg(res, true, 'Update book success', updateBook);
}
const drop = async (req, res, next) => {
    let book = await DB.findById(req.params.id);
    if (book) {
        deleteFile(book.image);
        await DB.findByIdAndDelete(book._id);
        responseMsg(res, true, 'Delete book', book);
    } else {
        next(new Error('Book not found with that ID'));
    }
}
const bookAddCategory = async (req, res, next) => {
    let dbBook = await DB.findById(req.body.bookID);
    let dbCategory = await catDB.findById(req.body.categoryID);
    if (dbBook && dbCategory) {
        let existCat = dbBook.categories.includes(dbCategory._id);
        if (!existCat) {
            await DB.findByIdAndUpdate(dbBook._id, {
                $push: {
                    categories: dbCategory._id
                }
            });
            let bookAddCat = await DB.findById(dbBook._id).populate('categories', '-__v').select('-__v');
            responseMsg(res, true, 'Category add success in book', bookAddCat);
        } else {
            next(new Error('This category is already exists.'));
        }
    } else {
        next(new Error('Not Found Error , check ID'));
    }
}
const bookRemoveCategory = async (req, res, next) => {
    let dbBook = await DB.findById(req.body.bookID);
    let dbCategory = await catDB.findById(req.body.categoryID);
    if (dbBook && dbCategory) {
        let existCat = dbBook.categories.includes(dbCategory._id);
        if (existCat) {
            await DB.findByIdAndUpdate(dbBook._id, {
                $pull: {
                    categories: dbCategory._id
                }
            });
            let bookAddCat = await DB.findById(dbBook._id).populate('categories', '-__v').select('-__v');
            responseMsg(res, true, 'Category remove success in book', bookAddCat);
        } else {
            next(new Error('This category is not exists.'));
        }
    } else {
        next(new Error('Not Found Error , check ID'));
    }
}
module.exports = {
    all,
    add,
    get,
    patch,
    drop,
    bookAddCategory,
    bookRemoveCategory
}