const { UserModel } = require('../../models/user.model');
const { hashString } = require('../../modules/hashString');
const bcrypt = require('bcrypt');
const { tokenGenerator } = require('../../modules/tokenGenerator');

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw {
                    status: 401,
                    message: 'ایمیل یا رمز عبور اشتباه می باشد'
                };
            }
            const compareResult = bcrypt.compareSync(password, user.password);
            if (!compareResult) {
                throw {
                    status: 401,
                    message: 'ایمیل یا رمز عبور اشتباه می باشد'
                };
            }
            const token = tokenGenerator({ email });
            user.token = token;
            await user.save();
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'شما با موفقیت وارد حساب کاربری شده‌اید',
                token
            });
        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const hashedPassword = hashString(password);
            const token = tokenGenerator({ email });
            const user = await UserModel.create({
                email,
                password: hashedPassword,
                token
            }).catch((err) => {
                if (err?.code == 11000) {
                    throw {
                        status: 422,
                        message: 'ایمیل قبلا در سیستم ثبت شده است'
                    };
                }
            });
            user.vector = req.protocol + '://' + req.get('host') + '/' + user.vector.replace(/\\/g, '/');

            res.json({
                status: 201,
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    resetPassword() {}
}
module.exports = {
    AuthController: new AuthController()
};
