const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { checkValidation } = require('../http/middlewares/checkValidation');
const { interestValidation, updateProfileValidation } = require('../http/validations/user');
const { upload } = require('../modules/multer');

const router = require('express').Router();

router.get('/profile', checkLogin, UserController.getProfile);
router.delete('/removeAll', checkLogin, UserController.removeAll);
router.post('/interest', checkLogin, interestValidation(), checkValidation, UserController.chooseInterest);
router.post(
    '/update-profile',
    checkLogin,
    upload.single('image'),
    updateProfileValidation(),
    checkValidation,
    UserController.update
);

module.exports = {
    userRoute: router
};
