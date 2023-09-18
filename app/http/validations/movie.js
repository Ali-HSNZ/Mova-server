const { body } = require('express-validator');
const { isValidObjectId } = require('mongoose');

function create() {
    return [
        body('title').custom((value) => {
            if (value) {
                if (value.length >= 2 && value.length <= 50) {
                    return true;
                }
                throw 'نام فیلم نمی تواند کوچکتر از 2 و بزرگتر از 50 نویسه باشد';
            }
            throw 'نام فیلم اجباری می‌باشد';
        }),
        body('quality').custom((value) => {
            if (value) {
                const qualities = ['320', '480', '720', '1080', '1440'];
                if (qualities.includes(value)) {
                    return true;
                }
                throw 'کیفیت وارد شده معتبر نیست';
            }
            return true;
        }),
        body('budget').custom((value) => {
            if (value) {
                if (value.length >= 2 && value.length <= 12) {
                    return true;
                }
                throw 'بودجه نمیتواند کم تر از 99 و بیشتر از 999,999,999,999 باشد';
            }
            return true;
        }),
        body('overview').custom((value) => {
            if (value) {
                if (value.length >= 5 && value.length <= 1200) {
                    return true;
                }
                throw 'بررسی اجمالی نمی‌تواند کمتر از 5 و بیشتر از 1200 نویسه باشد';
            }
            return true;
        }),
        body('popularity').custom((value) => {
            if (value) {
                if (Number(value) > 0 && Number(value) <= 10) {
                    return true;
                }
                throw 'نمره محبوبیت باید بین 1 تا 10 باشد';
            }
            return true;
        }),
        body('release_date').custom((value) => {
            return true;
        }),
        body('status').custom((value) => {
            const statusValues = ['Released', 'Airing', 'Premiered', 'In Production', 'In Development', 'Canceled'];
            if (value) {
                if (statusValues.toString().toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }
                throw 'وضعیت وارد شده معتبر نیست';
            }
            return true;
        }),
        body('tags').custom((value) => {
            return true;
        }),
        body('genre').custom((value) => {
            if (value) {
                const parseValue = JSON.parse(value);
                for (const id of parseValue) {
                    if (!isValidObjectId(id)) {
                        throw 'شناسه وارد شده معتبر نیست';
                    }
                }
                return true;
            }
            throw 'ژانر الزامی می‌باشد';
        }),
        body('casts').custom((value) => {
            if (value) {
                const parseValue = JSON.parse(value);
                for (const id of parseValue) {
                    if (!isValidObjectId(id)) {
                        throw 'شناسه وارد شده معتبر نیست';
                    }
                }
                return true;
            }
            throw 'لیست بازیگران الزامی می‌باشد';
        }),
        body('tags').custom((value) => {
            if (value) {
                const parseValue = JSON.parse(value);
                for (const id of parseValue) {
                    if (typeof id != 'string') {
                        throw 'برچسب وارد شده معتبر نیست';
                    }
                }
                return true;
            }
            throw 'برچسب فیلم الزامی می‌باشد';
        }),
        body('country').custom((value) => {
            if (value) {
                if (typeof value != 'string') {
                    throw 'فرمت کشور وارد شده معتبر نیست';
                }
                return true;
            }
            throw 'کشور سازنده الزامی می‌باشد';
        }),
        body('age_range').custom((value) => {
            if (value) {
                if (Number(value) > 2 && Number(value) <= 30) {
                    return true;
                }
                throw 'رنج سنی نمی‌تواند کوچکتر از 3 و بزرگتر از 30 باشد';
            }
            throw 'رنج سنی الزامی می‌باشد';
        })
    ];
}
module.exports = {
    createMovieValidation: create
};
