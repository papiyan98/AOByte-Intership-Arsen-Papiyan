const express = require("express");

const { getPosts } = require("../controllers/post.controller");
const { getComments, addComment, deleteComment, updateCommentRate } = require("../controllers/comment.controller");
const { addReply, deleteReply, updateReplyRate } = require("../controllers/reply.controller");

const router = express.Router();

router.get('/posts', getPosts);

router.get('/comments/:id', getComments);

router.put('/comments/add-comment/:id', addComment);

router.put('/comments/delete-comment/:id', deleteComment);

router.put('/comments/update-comment-rate/:id', updateCommentRate);

router.put('/replies/add-reply/:id', addReply);

router.put('/replies/delete-reply/:id', deleteReply);

router.put('/replies/update-reply-rate/:id', updateReplyRate)

module.exports = router;