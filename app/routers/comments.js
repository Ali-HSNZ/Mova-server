const { CommentController } = require('../http/controllers/comment.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');

const router = require('express').Router();

router.post('/create', checkLogin, CommentController.create);
router.get('/detail/:id', checkLogin, CommentController.detail);
router.get('/list', checkLogin, CommentController.getAll);
router.delete('/removeAll', checkLogin, CommentController.removeAll);
router.put('/like/:id', checkLogin, CommentController.like);
router.put('/undoLike/:id', checkLogin, CommentController.undoLike);
router.put('/disLike/:id', checkLogin, CommentController.disLike);
router.put('/undoDisLike/:id', checkLogin, CommentController.undoDisLike);

module.exports = {
    commentRoute: router
};
