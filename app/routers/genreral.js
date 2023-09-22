const { GeneralController } = require('../http/controllers/general.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');

const router = require('express').Router();

router.post('/watchList/add/:movieId', checkLogin, GeneralController.addToWatchList);

module.exports = {
    generalRoute: router
};
