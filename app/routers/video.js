const router = require('express').Router();
const videoController = require('../http/controllers/video.controller');

router.get('/:videoName', videoController.streamVideo);

module.exports = {
    videoRoute: router
};
