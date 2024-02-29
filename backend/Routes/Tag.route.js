const express = require('express')
const router = express.Router()
const Tag = require('../Models/tag')
const TagController = require('../Controllers/TagController')

router.get('/getTag', TagController.getAllTags)

router.post('/postTag', TagController.postNewTag)

router.get('/getTagById/:id', TagController.findTagById)

router.delete('deleteTag/:id', TagController.deleteTag)

module.exports = router