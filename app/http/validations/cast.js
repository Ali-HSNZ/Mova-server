const { body } = require('express-validator');
const { isValidObjectId } = require('mongoose');

function create() {
    return [
        body('fullName')
            .notEmpty()
            .withMessage('نام و نام خوانوادگی الزامی می باشد')
            .isLength({ min: 3, max: 30 })
            .withMessage('نام و نام خانوادگی نمیتواند کم تر از 3 و بیشتر از 30 نویسه باشد'),
        body('bio').custom((value) => {
            if (value) {
                if (value.length >= 5 && value.length <= 1000) {
                    return true;
                }
                throw 'بیوگرافی نمی تواند کم تر از 5 و بیشتر از 1000 نویسه باشد';
            }
            return true;
        }),
        body('popularity').custom((value) => {
            if (value) {
                if (Number(value) >= 1 && Number(value) <= 10) {
                    return true;
                }
                throw 'عدد وارد شده باید عددی بین 1 تا 10 باشد';
            }
            return true;
        }),

        body('roles').custom((value) => {
            if (value) {
                const toParseValue = JSON.parse(value);
                const keys = ['movieId', 'characterName'];
                for (const obj of toParseValue) {
                    for (const key in obj) {
                        if (!keys.includes(key)) {
                            throw 'فرمت ارسال شده معتبر نیست';
                        }
                        if (!isValidObjectId(obj['movieId'])) {
                            throw 'شناسه فیلم معتبر نیست';
                        }
                        if (typeof obj['characterName'] !== 'string') {
                            throw 'نام وارد شده معتبر نیست';
                        }
                    }
                }
            }
            return true;
        }),
        body('gender').custom((value) => {
            if (value) {
                const genderList = ['آقا', 'خانم', 'اقا'];
                if (genderList.includes(value)) {
                    return true;
                }
                throw 'جنیست وارد شده معتبر نیست';
            }
            return true;
        })
    ];
}
module.exports = {
    createCastValidation: create
};
