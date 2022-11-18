const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    isSave: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('book', bookSchema);
module.exports = Book;