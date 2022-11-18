module.exports = {
    validateBody: (Schema) => {
        return (req, res, next) => {
            let result = Schema.validate(req.body);
            if (result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    }
}