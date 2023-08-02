const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const commentSchema = new mongoose.Schema({
  postId: String,
  commentor: { 
    name: String, 
    email: String 
  },
  text: String, 
  rate: Number,
  date: Date,
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;