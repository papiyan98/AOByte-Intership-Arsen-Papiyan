const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: String,
  comments: [new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    commentor: { name: String, email: String }, 
    text: String, 
    rate: Number,
    replies: [new mongoose.Schema({
      _id: mongoose.Types.ObjectId,
      commentor: { name: String, email: String },
      text: String,
      rate: Number,
      date: Date,
      isRated: Boolean,
      isDeletable: Boolean
    })],
    date: Date,
    isRated: Boolean,
    isDeletable: Boolean
  })]
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;