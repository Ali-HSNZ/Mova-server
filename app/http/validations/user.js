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

module.exports = {
    interestValidation: interest
};
