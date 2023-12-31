const router = require('express').Router();

const { authRoute } = require('./auth');
const { castRoute } = require('./cast');
const { commentRoute } = require('./comments');
const { genreRoute } = require('./genre');
const { generalRoute } = require('./genreral');
const { movieRoute } = require('./movie');
const { userRoute } = require('./user');
const { videoRoute } = require('./video');

router.use('/api/user', userRoute);
router.use('/api/cast', castRoute);
router.use('/api/movie', movieRoute);
router.use('/api/genre', genreRoute);
router.use('/api/auth', authRoute);
router.use('/api/video', videoRoute);
router.use('/api/comment', commentRoute);
router.use('/api/general', generalRoute);

module.exports = {
    allRoutes: router
};
