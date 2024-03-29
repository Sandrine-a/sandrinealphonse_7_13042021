//Imports
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const validator = require('../utils/validator');
const auth = require('../utils/auth');
const multer = require('../utils/multer-config');

//Routing

router.post('/signup', validator.signupValidator(), validator.validateResult, userCtrl.signup);

router.post('/login', validator.loginValidator(), validator.validateResult, userCtrl.login);

router.get('/', auth, userCtrl.getAllUsers);

router.get('/:id', auth, userCtrl.getUserProfile);

router.put('/:id', auth, multer.usersStorage, userCtrl.updateUserProfile);

router.delete('/:id', auth, multer.usersStorage, userCtrl.deleteProfile); 

module.exports = router;
