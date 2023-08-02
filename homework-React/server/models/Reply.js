const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  commentId: String,
  commentor: { 
    name: String, 
    email: String 
  },
  text: String, 
  rate: Number,
  date: Date,
});

const ReplyModel = mongoose.model("Reply", replySchema);

module.exports = ReplyModel;