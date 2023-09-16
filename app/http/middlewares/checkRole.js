const checkRole = (role) => {
    return function checkRole(req, res, next) {
        try {
            const user = req.user;
            if (user.role.toLowerCase() === role.toLowerCase()) {
                return next();
            } else {
                throw {
                    status: 403,
                    success: false,
                    message: 'شما به این بخش دسترسی ندارید'
                };
            }
        } catch (error) {
            next(error);
        }
    };
};

module.exports = { checkRole };
