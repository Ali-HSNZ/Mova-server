const jwt = require('jsonwebtoken');

function tokenVerify(token) {
    const authError = {
        status: 401,
        success: false,
        message: 'لطفا وارد حساب کاربری خود شوید'
    };
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY);
        if (!result?.email) {
            throw authError;
        }
        return result;
    } catch (error) {
        throw authError;
    }
}
module.exports = {
    tokenVerify
};
