const saveFile = async (req, res, next) => {
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

module.exports = {
    saveFile
}