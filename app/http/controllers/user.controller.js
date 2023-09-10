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
        } catch (error) {}
    }
    create() {}
    remove() {}
    update() {}
    getAll() {}
}
module.exports = {
    UserController: new UserController()
};
