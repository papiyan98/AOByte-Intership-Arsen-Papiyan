const ReplyModel = require("../models/Reply");

const getReplies = async (req, res) => {
  try {
    const replies = await ReplyModel.find().exec();
    
    if (!replies) {
      return res.status(404).json({ message: "Failed to get replies" });
    }
    
    return res.status(200).json(replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addReply = async (req, res) => {
  try {
    const { reply } = req.body;
    const { id } = req.params;
    
    await ReplyModel.create({
      commentId: id,
      ...reply
    });

    const replies = await ReplyModel.find().exec();

    return res.status(200).json(replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { reply } = req.body;

    await ReplyModel.deleteOne({ _id: reply._id });

    const replies = await ReplyModel.find().exec();

    return res.status(200).json(replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReplyRate = async (req, res) => {
  try {
    const { newRate } = req.body;
    const { id } = req.params;

    const reply = await ReplyModel.findById(id);

    if (!reply) {
      return res.status(404).json({ message: "Failed to find rated reply" });
    }

    reply.rate = (reply.rate) ? (reply.rate + newRate) / 2 : newRate;

    await reply.save();

    const replies = await ReplyModel.find().exec();

    return res.status(200).json(replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReplies, addReply, deleteReply, updateReplyRate };