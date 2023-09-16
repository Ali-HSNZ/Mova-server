const { CastController } = require('../http/controllers/cast.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { checkValidation } = require('../http/middlewares/checkValidation');
const { createCastValidation } = require('../http/validations/cast');
const { upload } = require('../modules/multer');

const router = require('express').Router();

router.post(
    '/create',
    checkLogin,
    upload.single('image'),
    createCastValidation(),
    checkValidation,
    CastController.create
);

router.get('/getAll', checkLogin, CastController.getAll);

router.delete('/removeAll', checkLogin, CastController.removeAll);

module.exports = {
    castRoute: router
};
