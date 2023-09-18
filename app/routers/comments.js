const { CommentController } = require('../http/controllers/comment.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');

const router = require('express').Router();

router.post('/create', checkLogin, CommentController.create);
router.get('/detail/:id', checkLogin, CommentController.detail);
router.get('/list', checkLogin, CommentController.getAll);
router.delete('/removeAll', checkLogin, CommentController.removeAll);

module.exports = {
    commentRoute: router
};
