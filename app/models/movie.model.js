const { Schema, model } = require('mongoose');

const MovieSchema = new Schema(
    {
        title: { type: String, required: true },
        movieId: { type: String, required: true },
        trailerId: { type: String, required: false },
        budget: { type: String },
        image: { type: String, default: 'default/movie.jpg' },
        overview: { type: String },
        popularity: { type: String },
        release_date: { type: String },
        status: { type: String },
        tags: { type: [mongoose.Types.ObjectId] },
        age_range: { type: String },
        country: { type: String },
        cast: { type: [mongoose.Types.ObjectId] },
        genre: { type: [mongoose.Types.ObjectId] }
    },
    {
        timestamps: true
    }
);

const MovieModel = model('movie', MovieSchema);
module.exports = {
    MovieModel
};
