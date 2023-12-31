const { Schema, model, default: mongoose } = require('mongoose');
const UserSchema = new Schema(
    {
        fullName: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        mobile: { type: String },
        gender: { type: String, default: 'unknown' },
        favorite: { type: [mongoose.Types.ObjectId], default: [] },
        interest: { type: [String], default: [] },
        vector: { type: String, default: 'default/user.png' },
        role: { type: String, default: 'USER' },
        token: { type: String, default: '' },
        watchList: { type: [mongoose.Types.ObjectId], ref: 'movie', default: [] },
        comments: { type: [mongoose.Types.ObjectId], ref: 'comment' },
        recent: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'movie' }
    },
    {
        timestamps: true
    }
);
const UserModel = model('user', UserSchema);

module.exports = { UserModel };
