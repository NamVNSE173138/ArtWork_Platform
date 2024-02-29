const express = require('express')
const router = express.Router()
const Comment = require('../Models/comment')
const CommentController = require('../Controllers/CommentController')
const { lockApi } = require('../Config/config')

router.get('/', CommentController.getAllComments)

router.post('/', lockApi, CommentController.postNewComment)

router.get('/:id', CommentController.findCommentById)

router.patch('/:id', CommentController.updateComment)

router.delete('/:id', CommentController.deleteComment)

module.exports = router