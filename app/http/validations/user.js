const { body } = require('express-validator');
function interest() {
    return [
        body('interest')
            .notEmpty()
            .withMessage('ژانر های مورد علاقه نمی تواند خالی باشد')
            .isArray({ min: 3 })
            .withMessage('حداقل 3 ژانر را انتخاب کنید')
    ];
}
function updateProfile() {
    return [
        body('fullName').custom((value) => {
            if (value) {
                if (value.length >= 3 && value.length <= 30) {
                    return true;
                }
                throw 'نام و نام خانوادگی نمیتواند کم تر از 3 و بیشتر از 30 نویسه باشد';
            }
            return true;
        }),
        body('mobile').custom((value) => {
            if (value) {
                if (value.match(/^(\+98|0)?9\d{9}$/g)) {
                    return true;
                }
                throw 'شماره وارد شده معتبر نیست';
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
    interestValidation: interest,
    updateProfileValidation: updateProfile
};
