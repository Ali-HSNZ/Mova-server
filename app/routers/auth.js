const { AuthController } = require('../http/controllers/auth.controller');
const { checkValidation } = require('../http/middlewares/checkValidation');
const { registerValidator, loginValidator } = require('../http/validations/auth');

const router = require('express').Router();

router.post('/register', registerValidator(), checkValidation, AuthController.register);
router.post('/login', loginValidator(), checkValidation, AuthController.login);

module.exports = {
    authRoute: router
};
