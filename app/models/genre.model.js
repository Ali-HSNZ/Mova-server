const { Schema, model, default: mongoose } = require('mongoose');

export const GenreSchema = new Schema(
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
