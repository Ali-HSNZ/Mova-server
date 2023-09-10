const { Schema, model } = require('mongoose');

const GenreSchema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const GenreModel = model('genre', GenreSchema);
module.exports = {
    GenreModel
};
