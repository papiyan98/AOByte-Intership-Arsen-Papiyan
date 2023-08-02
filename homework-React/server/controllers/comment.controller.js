const mongoose = require("mongoose");
const CommentModel = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().exec();
  
    if (!comments) {
      return res.status(404).json({ message: "Failed to get comments" });
    }
    
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;

    await CommentModel.create({
      postId: id,
      ...comment
    });

    const comments = await CommentModel.find().exec();
    
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteComment = async (req, res) => {
  try {
    const { comment } = req.body;

    await CommentModel.deleteOne({ _id: comment._id });

    const comments = await CommentModel.find().exec();

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCommentRate = async (req, res) => {
  try {
    const { newRate } = req.body;
    const { id } = req.params;
    
    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Failed to find rated comment" });
    }

    comment.rate = (comment.rate) ? (comment.rate + newRate) / 2 : newRate;

    await comment.save();

    const comments = await CommentModel.find().exec();

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getComments, addComment, deleteComment, updateCommentRate };