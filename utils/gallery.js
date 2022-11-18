const fs = require('fs');
const saveFile = (req, res, next) => {
    if (!req.files) {
        next(new Error('Book Image is required!'));
        return;
    }
    let file = req.files.file;
    let fileName = new Date().valueOf() + '_' + Math.random(111, 999) + file.name;
    file.mv(`./uploads/${fileName}`);
    req.body['image'] = fileName;
    next();
}
const updateFile = (req, res, next) => {
    if (req.files) {
        let file = req.files.file;
        let fileName = new Date().valueOf() + Math.random(111, 999) + '_' + file.name;
        file.mv(`./uploads/${fileName}`);
        req.body['image'] = fileName;
    }
    next();

}
const deleteFile = async (filename) => {
    await fs.unlinkSync(`./uploads/${filename}`);
}
module.exports = {
    saveFile,
    updateFile,
    deleteFile
}