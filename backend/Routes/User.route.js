const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');


router.get('/', userController.getAllUsers);

router.get('/artists', userController.getArtistList);

router.post('/', userController.createNewUser);

router.post('/login', userController.userLogin);

router.get('/getUserInfo', userController.getUserInfo);

router.get('/:id', userController.findUserById);

router.patch('/:id', userController.updateUser);

router.patch('/updateRole/:id', userController.updateArtistRole);

router.delete('/:id', userController.deleteUser);



module.exports = router;