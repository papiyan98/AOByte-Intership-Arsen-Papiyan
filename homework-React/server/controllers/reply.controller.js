const CommentModel = require("../models/Comment");

const addReply = async (req, res) => {
  try {
    const { reply, repliedComment } = req.body;
    const { id } = req.params;

    const data = await CommentModel.findOne({
      "postId": id
    });

    if (!data) {
      return res.status(404).json({ message: "Failed to add reply" });
    }

    const matchedComment = data.comments.find(comment => JSON.stringify(comment) === JSON.stringify(repliedComment));

    if (!matchedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    matchedComment.replies.push(reply);

    await data.save();

    return res.status(200).json(matchedComment.replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { replyToDelete, repliedComment } = req.body;
    const { id } = req.params;
    
    const data = await CommentModel.findOne({
      "postId": id
    });

    if (!data) {
      return res.status(404).json({ message: "Failed to delete comment" });
    }

    const matchedComment = data.comments.find(comment => JSON.stringify(comment) === JSON.stringify(repliedComment));

    if (!matchedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const replyIndex = matchedComment.replies.findIndex(reply => JSON.stringify(reply) === JSON.stringify(replyToDelete));

    if (replyIndex === -1) {
      return res.status(404).json({ message: "Reply not found" });
    }

    matchedComment.replies.splice(replyIndex, 1);

    await data.save();

    return res.status(200).json(matchedComment.replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReplyRate = async (req, res) => {
  try {
    const { ratedReply, repliedComment, newRate } = req.body;
    const { id } = req.params;

    const data = await CommentModel.findOne({
      "postId": id
    });

    if (!data) {
      return res.status(404).json({ message: "Failed to find comment data" });
    }

    const matchedComment = data.comments.find(comment => JSON.stringify(comment) === JSON.stringify(repliedComment));

    if (!matchedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const replyToUpdate = matchedComment.replies.find(reply => JSON.stringify(reply) === JSON.stringify(ratedReply));

    if (!replyToUpdate) {
      return res.status(404).json({ message: "Failed to find reply" });
    }

    replyToUpdate.rate = (replyToUpdate.rate) ? (replyToUpdate.rate + newRate) / 2 : newRate;
    replyToUpdate.isRated = true;

    await data.save();

    return res.status(200).json(data.comments.id(comment._id).replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addReply, deleteReply, updateReplyRate };