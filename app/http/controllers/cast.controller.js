const { CastModel } = require('../../models/cast.model');
class CastController {
    async create(req, res, next) {
        try {
            const vector = req?.file?.path.replace('\\', '/').substring(7) || '';
            const data = req.body;
            data['vector'] = vector;
            let fields = ['fullName', 'bio', 'popularity', 'roles', 'gender', 'vector'];
            let badValues = [' ', '', null, undefined, 0, -1, NaN];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (badValues.includes(value.trim())) delete data[key];
            });
            if (data?.roles) {
                data.roles = JSON.parse(data.roles);
            }

            const cast = await CastModel.create(data).catch((err) => {
                if (err?.code == 11000) {
                    throw {
                        status: 422,
                        success: false,
                        message: 'بازیگر قبلا در سیستم ثبت شده است'
                    };
                }
            });

            cast.vector = req.protocol + '://' + req.get('host') + '/' + cast.vector.replace(/\\/g, '/');

            return res.status(201).json({
                status: 201,
                success: true,
                result: cast
            });
        } catch (error) {
            next(error);
        }
    }
    async removeAll(req, res, next) {
        try {
            await CastModel.deleteMany({});
            res.json({
                status: 200,
                success: true,
                message: 'بازیگران با موفقیت حذف شده‌اند'
            });
        } catch (error) {
            next(error);
        }
    }
    update() {}
    get() {}
    async getAll(req, res, next) {
        try {
            const casts = await CastModel.find({});
            casts.forEach((cast) => {
                cast.vector = req.protocol + '://' + req.get('host') + '/' + cast.vector.replace(/\\/g, '/');
            });
            res.json({
                status: 200,
                success: true,
                data: casts
            });
        } catch (error) {
            next(error);
        }
    }
    search() {}
}
module.exports = {
    CastController: new CastController()
};
