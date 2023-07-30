const CommentModel = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await CommentModel.findOne({
      "postId": id
    });
  
    if (!data) {
      return res.status(404).json({ message: "Failed to get comments" });
    }
    
    return res.status(200).json(data.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    
    const data = await CommentModel.findOne({
      "postId": id
    });
    
    if (!data) {
      return res.status(404).json({ message: "Failed to find comment data" });
    }

    data.comments.push(comment);
    
    await data.save();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteComment = async (req, res) => {
  try {
    const { commentToDelete } = req.body;
    const { id } = req.params;
    
    const data = await CommentModel.findOne({
      "postId": id
    });

    if (!data) {
      return res.status(404).json({ message: "Failed to find comment data" });
    }

    const commentIndex = data.comments.findIndex(comment => JSON.stringify(comment) === JSON.stringify(commentToDelete));

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    data.comments.splice(commentIndex, 1);

    await data.save();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCommentRate = async (req, res) => {
  try {
    const { ratedComment, newRate } = req.body;
    const { id } = req.params;
    
    const data = await CommentModel.findOne({
      "postId": id
    });
    
    if (!data) {
      return res.status(404).json({ message: "Failed to rate comment" });
    }
    
    const commentToUpdate = data.comments.find(comment => JSON.stringify(comment) === JSON.stringify(ratedComment));
    
    if (!commentToUpdate) {
      return res.status(404).json({ message: "Failed to find comment" });
    }

    commentToUpdate.rate = (commentToUpdate.rate) ? (commentToUpdate.rate + newRate) / 2 : newRate;
    commentToUpdate.isRated = true;

    await data.save();

    return res.status(200).json(data.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getComments, addComment, deleteComment, updateCommentRate };