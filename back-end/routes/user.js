//Imports
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

//Routing
router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

//Export des routes users:
module.exports = router;
