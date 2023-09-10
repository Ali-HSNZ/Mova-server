const { GenreModel } = require('../../models/genre.model');
const { UserModel } = require('../../models/user.model');

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user;
            return res.json({
                status: 200,
                success: true,
                data: {
                    user
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async chooseInterest(req, res, next) {
        try {
            const { interest } = req.body;

            const allGenre = await GenreModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
            const matchedGenre = interest.every((inter) => allGenre.some((obj) => obj.name === inter));
            if (!matchedGenre) {
                return res.json({
                    status: 400,
                    success: false,
                    message: 'ژانرهای وارد شده معتبر نیستند'
                });
            }
            const { email } = req.user;
            const user = await UserModel.updateOne({ email }, { $set: { interest } });

            if (user?.modifiedCount >= 0) {
                return res.json({
                    status: 201,
                    success: true,
                    message: 'ژانر های موردعلاقه شما با موفقیت ثبت شدند'
                });
            }
            throw {
                status: 400,
                success: false,
                message: 'به روزرسانی انجام نشد'
            };
        } catch (error) {
            next(error);
        }
    }
    create() {}
    remove() {}
    update() {}
    getAll() {}
}
module.exports = {
    UserController: new UserController()
};
