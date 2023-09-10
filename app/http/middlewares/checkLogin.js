const { UserModel } = require('../../models/user.model');
const { tokenVerify } = require('../../modules/tokenVerify');

const checkLogin = async (req, res, next) => {
    try {
        const authError = {
            status: 401,
            success: false,
            message: 'لطفا وارد حساب کاربری خود شوید'
        };

        const authorization = req?.headers?.authorization;
        if (!authorization) {
            throw authError;
        }
        let token = authorization.split(' ')?.[1];
        if (!token) {
            throw authError;
        }
        const { email } = tokenVerify(token);
        const user = await UserModel.findOne({ email }, { password: 0, __v: 0 });
        if (!user) {
            throw authError;
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkLogin
};
