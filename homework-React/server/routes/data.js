const express = require("express");

const { getPosts } = require("../controllers/post.controller");
const { getComments, addComment, deleteComment, updateCommentRate } = require("../controllers/comment.controller");
const { getReplies, addReply, deleteReply, updateReplyRate } = require("../controllers/reply.controller");

const router = express.Router();

router.get('/posts', getPosts);

router.get('/comments', getComments);

router.get('/replies', getReplies);

router.post('/comments/add-comment/:id', addComment);

router.post('/comments/delete-comment/', deleteComment);

router.post('/comments/update-comment-rate/:id', updateCommentRate);

router.post('/replies/add-reply/:id', addReply);

router.post('/replies/delete-reply', deleteReply);

router.post('/replies/update-reply-rate/:id', updateReplyRate)

module.exports = router;