const { Schema, model, default: mongoose } = require('mongoose');
const { GenreSchema } = require('./genre.model');

const MovieSchema = new Schema(
    {
        title: { type: String, required: true },
        budget: { type: String },
        image: { type: String, default: 'http://localhost:5000/default/movie.jpg' },
        overview: { type: String },
        popularity: { type: String },
        release_date: { type: String },
        status: { type: String },
        tags: { type: [String] },
        age_range: { type: String },
        country: { type: String },
        cast: { type: [mongoose.Types.ObjectId] },
        genre: { type: [GenreSchema] }
    },
    {
        timestamps: true
    }
);

const MovieModel = model('movie', MovieSchema);
module.exports = {
    MovieModel
};
