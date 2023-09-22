const { isValidObjectId } = require('mongoose');
const { CommentModel } = require('../../models/comments');
const { MovieModel } = require('../../models/movie.model');
const { UserModel } = require('../../models/user.model');

class CommentController {
    async create(req, res, next) {
        try {
            const { userId, movieId, text } = req.body;
            const user = await UserModel.findById(userId);
            const movie = await MovieModel.findById(movieId);

            if (!user || !movie) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'کاربر یا فیلم یافت نشد'
                });
            }

            const result = await CommentModel.create({
                user: user._id,
                movie: movie._id,
                text
            });

            // اضافه کردن شناسه نظر به کاربر
            user.comments.push(result);
            await user.save();

            // اضافه کردن شناسه نظر به فیلم
            movie.comments.push(result);
            await movie.save();

            res.status(201).json({
                status: 201,
                success: true,
                message: 'نظر شما با موفقیت ثبت شد'
            });
        } catch (error) {
            next(error);
        }
    }
    async detail(req, res, next) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                res.send({
                    status: 404,
                    success: false,
                    message: 'شناسه نظر نامعتبر است'
                });
            }
            const result = await CommentModel.findById(id)
                .populate({
                    path: 'user',
                    select: 'email fullName gender vector'
                })
                .populate({
                    path: 'movie',
                    select :"title quality banner status"
                });
            if (!result) {
                res.send({
                    status: 404,
                    success: false,
                    message: 'نظر یافت نشد'
                });
            }
            res.send({
                status: 200,
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        const result = await CommentModel.find({})
            .populate({
                path: 'user',
                select: 'email fullName vector'
            })
            .populate({
                path: 'movie',
                select: 'title quality banner status'
            });
        res.send({
            status: 200,
            success: true,
            data: result
        });
    }
    async like(req, res, next) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                throw {
                    status: 401,
                    success: false,
                    message: 'ثبت لایک با شکست مواجه شد'
                };
            }
            const comment = await CommentModel.findOne({ _id: id, user: req.user._id });
            if (!comment) {
                throw {
                    status: 404,
                    success: false,
                    message: 'کامنت یافت نشد'
                };
            }
            await comment.like();
            res.status(201).send({
                status: 201,
                success: true,
                message: 'عملیات با موفقیت انجام شد'
            });
        } catch (error) {
            next(error);
        }
    }
    async undoLike(req, res, next) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                throw {
                    status: 401,
                    success: false,
                    message: 'حذف لایک با شکست مواجه شد'
                };
            }
            const comment = await CommentModel.findOne({ _id: id, user: req.user._id });
            if (!comment) {
                throw {
                    status: 404,
                    success: false,
                    message: 'کامنت یافت نشد'
                };
            }
            await comment.undoLike();
            res.status(201).send({
                status: 201,
                success: true,
                message: 'عملیات با موفقیت انجام شد '
            });
        } catch (error) {
            next(error);
        }
    }
    async disLike(req, res, next) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                throw {
                    status: 401,
                    success: false,
                    message: 'ثبت دیس‌لایک با شکست مواجه شد'
                };
            }
            const comment = await CommentModel.findOne({ _id: id, user: req.user._id });
            if (!comment) {
                throw {
                    status: 404,
                    success: false,
                    message: 'کامنت یافت نشد'
                };
            }
            await comment.dislike();
            res.status(201).send({
                status: 201,
                success: true,
                message: 'عملیات با موفقیت انجام شد'
            });
        } catch (error) {
            next(error);
        }
    }
    async undoDisLike(req, res, next) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                throw {
                    status: 401,
                    success: false,
                    message: 'حذف دیس‌لایک با شکست مواجه شد'
                };
            }
            const comment = await CommentModel.findOne({ _id: id, user: req.user._id });
            if (!comment) {
                throw {
                    status: 404,
                    success: false,
                    message: 'کامنت یافت نشد'
                };
            }
            await comment.undoDislike();
            res.status(201).send({
                status: 201,
                success: true,
                message: 'عملیات با موفقیت انجام شد'
            });
        } catch (error) {
            next(error);
        }
    }
    async removeAll(req, res, next) {
        await CommentModel.deleteMany({});
        res.send({
            status: 200,
            success: true,
            message: 'نظرات با موفقیت حذف شده‌اند'
        });
    }
}
module.exports = {
    CommentController: new CommentController()
};
