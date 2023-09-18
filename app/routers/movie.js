const router = require('express').Router();

const { MovieController } = require('../http/controllers/movie/movie.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { checkRole } = require('../http/middlewares/checkRole');
const { checkValidation } = require('../http/middlewares/checkValidation');
const { createMovieValidation } = require('../http/validations/movie');
const { upload } = require('../modules/multer');
router.post(
    '/create',
    checkLogin,
    checkRole('admin'),
    upload.fields([
        { name: 'movie', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
        { name: 'trailer', maxCount: 1 }
    ]),
    createMovieValidation(),
    checkValidation,
    MovieController.create
);
router.get('/list', checkLogin, checkRole('admin'), MovieController.getAll);
router.get('/detail/:id', checkLogin, checkRole('admin'), MovieController.detail);
router.delete('/removeAll', checkLogin, checkRole('admin'), MovieController.removeAll);
module.exports = {
    movieRoute: router
};
