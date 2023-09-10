const { GenreController } = require('../http/controllers/genre.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');

const router = require('express').Router();

router.get('/list', checkLogin, GenreController.getAll);

module.exports = {
    genreRoute: router
};
