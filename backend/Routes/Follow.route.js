const express = require('express');
const router = express.Router();
const FollowController = require('../Controllers/FollowController');

router.get('/', FollowController.getAllFollowers);

router.get('/follower/:id', FollowController.getFollowersList);

router.get('/following/:id', FollowController.getFollowingList);

router.post('/:id', FollowController.createFollower);

router.delete('/:id', FollowController.deleteFollower);

module.exports = router;
