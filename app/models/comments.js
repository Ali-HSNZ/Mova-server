const { Schema, model, default: mongoose } = require('mongoose');

const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true }, // اشاره به کاربر
    movie: { type: mongoose.Types.ObjectId, ref: "movie" ,required: true }, // شناسه فیلم یا سریال
    parentComment: { type: mongoose.Types.ObjectId, ref: 'comment', default: null }, // شناسه کامنت مادر
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});
const CommentModel = model('comment', CommentSchema);

module.exports = { CommentModel };
