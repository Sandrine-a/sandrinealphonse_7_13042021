//Imports
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

const validator = require('../utils/validator');

//Routing
router.post('/signup', validator.signupValidator(), validator.validateResult, userCtrl.signup);

router.post('/login', validator.loginValidator(), validator.validateResult, userCtrl.login);

//Routing TODO
/* router.get('/:id', userCtrl.getProfile);
router.put('/:id', userCtrl.modifyProfile);
router.post('/:id', userCtrl.deletProfile); */

//Export des routes users:
module.exports = router;
