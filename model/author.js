const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Author = mongoose.model('author', authorSchema);
module.exports = Author;