const { Schema, model, default: mongoose } = require('mongoose');

const CastSchema = new Schema(
    {
        fullName: { type: String, required: true },
        vector: { type: String, default: '/default/user.png' },
        department: { type: String },
        bio: { type: String },
        popularity: { type: String },
        roles: [
            {
                movie: { type: mongoose.Schema.Types.ObjectId, ref: 'movie' },
                characterName: { type: String }
            }
        ],
        gender: { type: String, default: 'male' }
    },
    {
        timestamps: true
    }
);

const CastModel = model('cast', CastSchema);
module.exports = {
    CastModel
};
