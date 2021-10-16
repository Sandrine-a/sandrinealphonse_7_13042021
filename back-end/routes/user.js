//Imports
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

const validator = require('../utils/validator');

const auth = require('../utils/auth');

//Routing
router.post('/signup', validator.signupValidator(), validator.validateResult, userCtrl.signup);

router.post('/login', validator.loginValidator(), validator.validateResult, userCtrl.login);

router.get('/:id', auth, userCtrl.getUserProfile);

//Routing TODO
/* 
router.put('/:id', userCtrl.modifyProfile);
router.post('/:id', userCtrl.deletProfile); */

//Export des routes users:
module.exports = router;
