const { isValidObjectId } = require('mongoose');
const { MovieModel } = require('../../models/movie.model');
const { UserModel } = require('../../models/user.model');

class GeneralController {
    async addToWatchList(req, res, next) {
        try {
            const { movieId } = req.params;
            if (movieId) {
                if (!isValidObjectId(movieId)) {
                    throw {
                        status: 400,
                        success: false,
                        message: 'شناسه وارد شده معتبر نیست'
                    };
                }
                const movieResult = await MovieModel.findById(movieId);
                if (!movieResult) {
                    throw {
                        status: 404,
                        success: false,
                        message: 'فیلم یا سریال یافت نشد'
                    };
                }
                const user = await UserModel.findById(req.user._id);
                if (user.watchList.includes(movieId)) {
                    throw {
                        status: 200,
                        success: false,
                        message: 'فیلم یا سریال در پنل کاربری وجود دارد'
                    };
                }
                user.watchList.push(movieId);
                await user.save();

                res.send({
                    status: 201,
                    success: true,
                    message: 'عملیات با موفقیت انجام شد'
                });
            } else {
                res.send({
                    status: 400,
                    success: false,
                    message: 'شناسه فیلم یا سریال دریافت نشد!'
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    GeneralController: new GeneralController()
};
