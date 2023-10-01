const { isValidObjectId } = require('mongoose');
const { GenreModel } = require('../../models/genre.model');
const { UserModel } = require('../../models/user.model');

class UserController {
    async getProfile(req, res, next) {
        try {
            const user = await UserModel.findById(req.user._id)
                .populate({
                    path: 'comments',
                    select: 'text likes movie dislikes _id',
                    populate: {
                        path: 'movie',
                        select: 'title banner' // فیلدهای مورد نظر برای مدل فیلم
                    }
                })
                .populate({
                    path: 'watchList',
                    select: 'title banner status awards vote'
                })
                .populate({
                    path: 'recent',
                    select: 'title quality banner '
                });

            user.vector = req.protocol + '://' + req.get('host') + '/' + user.vector.replace(/\\/g, '/');
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

            const availableGenres = await GenreModel.find({ _id: interest }, { createdAt: 0, updatedAt: 0, __v: 0 });

            const { email } = req.user;

            const getAllGenresName = availableGenres.map((genre) => genre.name);
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
    async update(req, res, next) {
        try {
            const vector = req?.file?.path.replace('\\', '/').substring(7) || '';

            const data = req.body;
            data['vector'] = vector;

            let fields = ['fullName', 'mobile', 'gender', 'vector', 'role'];
            let badValues = [' ', '', null, undefined, 0, -1, NaN];

            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (badValues.includes(value.trim())) delete data[key];
            });

            const userId = req.user._id;
            const result = await UserModel.updateOne({ _id: userId }, { $set: data });
            if (result.modifiedCount == 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'به روزرسانی انجام نشد!'
                });
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'به روزرسانی با موفقیت انجام شد'
            });
        } catch (error) {
            next(error);
        }
    }
    create() {}
    async removeAll(req, res, next) {
        try {
            await UserModel.deleteMany({});
            res.json({
                status: 200,
                success: true,
                message: 'کاربران با موفقیت حذف شده‌اند'
            });
        } catch (error) {
            next(error);
        }
    }
    getAll() {}
}
module.exports = {
    UserController: new UserController()
};
