const { isValidObjectId } = require('mongoose');
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

            interest.forEach((id) => {
                if (!isValidObjectId(id)) {
                    throw {
                        status: 400,
                        success: false,
                        message: 'شناسه وارد شده معتبر نیست'
                    };
                }
            });

            const allGenre = await GenreModel.find({ _id: interest }, { createdAt: 0, updatedAt: 0, __v: 0 });
 
            const { email } = req.user;

            const getAllGenresName = allGenre.map((genre) => genre.name);
            const user = await UserModel.updateOne({ email }, { $set: { interest: getAllGenresName } });

            if (user?.modifiedCount > 0) {
                return res.json({
                    status: 201,
                    success: true,
                    updated: getAllGenresName,
                    message: `ژانر های  مورد علاقه شما با موفقیت ثبت شدند`
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
