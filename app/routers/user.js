const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { checkValidation } = require('../http/middlewares/checkValidation');
const { interestValidation } = require('../http/validations/user');

const router = require('express').Router();

router.get('/profile', checkLogin, UserController.getProfile);
router.post('/interest', checkLogin, interestValidation(), checkValidation, UserController.chooseInterest);

module.exports = {
    userRoute: router
};
