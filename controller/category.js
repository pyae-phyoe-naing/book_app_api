const DB = require('../model/category');
const { responseMsg } = require('../utils/helper');

const all = async (req, res, next) => {
    let cats = await DB.find();
    responseMsg(res, true, 'All Category', cats);
}
const add = async (req, res, next) => {
    
}

module.exports = {
    all,
    add
}