const { Schema, model, default: mongoose } = require('mongoose');

const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    movie: { type: mongoose.Types.ObjectId, ref: 'movie', required: true },
    parentComment: { type: mongoose.Types.ObjectId, ref: 'comment', default: null },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});

// توجه: از `methods` (به جای `method`) استفاده کنید
CommentSchema.methods.like = function () {
    this.likes += 1;
    this.dislikes = Math.max(0, this.dislikes - 1);
    return this.save();
};

CommentSchema.methods.dislike = function () {
    this.dislikes += 1;
    this.likes = Math.max(0, this.likes - 1);
    return this.save();
};

CommentSchema.methods.undoLike = function () {
    this.likes = Math.max(0, this.likes - 1);
    return this.save();
};

CommentSchema.methods.undoDislike = function () {
    this.dislikes = Math.max(0, this.dislikes - 1);
    return this.save();
};

const CommentModel = model('comment', CommentSchema);

module.exports = { CommentModel };
