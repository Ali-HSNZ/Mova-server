const { AuthController } = require('../http/controllers/auth.controller');
const { checkValidation } = require('../http/middlewares/checkValidation');
const { registerValidator } = require('../http/validations/auth');

const router = require('express').Router();

router.post('/register', registerValidator(), checkValidation, AuthController.register);

module.exports = {
    authRoute: router
};
