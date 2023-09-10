const { UserModel } = require('../../models/user.model');
const { hashString } = require('../../modules/hashString');

class AuthController {
    login() {}
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const hashedPassword = hashString(password);
            const user = await UserModel.create({
                email,
                password: hashedPassword
            }).catch((err) => {
                if (err?.code == 11000) {
                    throw {
                        status: 422,
                        message: 'ایمیل قبلا در سیستم ثبت شده است'
                    };
                }
            });
            res.json({
                status: 201,
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserModel.deleteOne({ _id: id });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    resetPassword() {}
}
module.exports = {
    AuthController: new AuthController()
};
