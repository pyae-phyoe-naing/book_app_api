const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const catSchema = new Schema({
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
const Cat = mongoose.model('category', catSchema);
module.exports = Cat;