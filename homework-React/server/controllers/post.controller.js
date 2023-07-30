const PostModel = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    if (!posts.length) {
      return res.status(404).json({ message: "Failed to get posts" });
    }
  
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getPosts };