const { Schema, model, default: mongoose } = require('mongoose');

const MovieSchema = new Schema(
    {
        title: { type: String, required: true },
        quality: { type: String },
        movie: { type: String, default: 'default/movie.jpg' },
        banner: { type: String, default: 'default/movie.jpg' },
        trailer: { type: String, default: 'default/movie.jpg' },
        budget: { type: String },
        overview: { type: String },
        popularity: { type: String },
        release_date: { type: String },
        status: { type: String },
        tags: { type: [String], required: true },
        age_range: { type: String, required: true },
        country: { type: String, required: true },
        casts: { type: [mongoose.Types.ObjectId], required: true, ref: 'cast' },
        genre: { type: [mongoose.Types.ObjectId], required: true, ref: 'genre' },
        comments: { type: [mongoose.Types.ObjectId], ref: 'comment', default: [] }
    },
    {
        timestamps: true
    }
);

const MovieModel = model('movie', MovieSchema);
module.exports = {
    MovieModel
};
