const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');


router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.get('/count', userController.countUser);

router.get('/artcount', userController.countArtist);

router.post('/login', userController.userLogin);

router.get('/getUserInfo', userController.getUserInfo);

router.get('/:id', userController.findUserById);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;