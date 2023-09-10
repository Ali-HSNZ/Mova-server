const { GenreModel } = require('../../models/genre.model');

class GenreController {
    create(req, res, next) {}
    remove() {}
    update() {}
    async getAll(req, res, next) {
        const result = await GenreModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
        res.json({
            status: 201,
            success: true,
            data: result
        });
    }
    search() {}
}
module.exports = {
    GenreController: new GenreController()
};
