const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.delete('/users/:userID', userController.deleteUser);
router.post('/reset-password', userController.resetPassword);
router.get('/passenger/:userID', userController.getPassenger);
router.get('/booking/:userID', userController.getBooking);


//ADMIN 
router.put('/users/edit', userController.updateUser);
router.get('/users/list', userController.userList);

module.exports = router;
