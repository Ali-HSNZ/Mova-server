const { authRoute } = require('./auth');
const { castRoute } = require('./cast');
const { genreRoute } = require('./genre');
const { movieRoute } = require('./movie');
const { userRoute } = require('./user');

const router = require('express').Router();
router.use('/api/user', userRoute);
router.use('/api/cast', castRoute);
router.use('/api/movie', movieRoute);
router.use('/api/genre', genreRoute);
router.use('/api/auth', authRoute);

module.exports = {
    allRoutes: router
};
