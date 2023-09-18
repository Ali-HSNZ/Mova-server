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
            const result = await CommentModel.findById(id);
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
                select: 'title banner'
            });
        res.send({
            status: 200,
            success: true,
            data: result
        });
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
