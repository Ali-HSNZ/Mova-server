const { body } = require('express-validator');

function register() {
    return [
        body('email')
            .notEmpty()
            .withMessage('ایمیل وارد شده معتبر نیست')
            .isEmail()
            .withMessage('ایمیل وارد شده معتبر نیست'),
        body('password')
            .notEmpty()
            .withMessage('رمز ورود نمی‌تواند خالی باشد')
            .isLength({ min: 3, max: 20 })
            .withMessage('رمز باید از 3 تا 20 نویسه باشد')
    ];
}

function login() {
    return [
        body('email')
            .notEmpty()
            .withMessage('ایمیل وارد شده معتبر نیست')
            .isEmail()
            .withMessage('ایمیل وارد شده معتبر نیست'),
        body('password')
            .notEmpty()
            .withMessage('رمز ورود نمی‌تواند خالی باشد')
            .isLength({ min: 3, max: 20 })
            .withMessage('رمز باید از 3 تا 20 نویسه باشد')
    ];
}

module.exports = {
    registerValidator: register,
    loginValidator: login
};
