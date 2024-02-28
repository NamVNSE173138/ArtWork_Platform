const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.post('/login', userController.userLogin);

router.get('/:id', userController.findUserById);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/getUserInfo', userController.getUserInfo);

module.exports = router;