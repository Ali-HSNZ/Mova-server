const multer = require('multer');
const { createUploadPath } = require('./createPathDirectory');
const path = require('path');

const storage = multer.diskStorage({
    // مسیر فایل
    destination: (req, file, cb) => {
        cb(null, createUploadPath());
    },
    // تغییر نام فایل
    filename: (req, file, cb) => {
        const imageType = path.extname(file.originalname || '');
        cb(null, 'user_' + Date.now() + imageType);
    }
});
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const isImageType = file.mimetype.startsWith('image/');
        if (isImageType) {
            cb(null, true);
        } else {
            cb(new Error('فرمت عکس معتبر نیست'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

module.exports = {
    upload
};
