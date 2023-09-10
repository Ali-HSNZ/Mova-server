const { validationResult } = require('express-validator');

function checkValidation(req, res, next) {
    const error = validationResult(req);
    const obj = {};
    error?.errors.forEach((e) => {
        obj[e.path] = e.msg;
    });
    if (Object.keys(obj).length > 0) {
        throw {
            status: 400,
            error: obj,
            message: 'validation Error'
        };
    } else {
        next();
    }
}
module.exports = {
    checkValidation
};