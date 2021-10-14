//Imports
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

//Routing
router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

//Routing TODO
/* router.get('/:id', userCtrl.getProfile);
router.put('/:id', userCtrl.modifyProfile);
router.post('/:id', userCtrl.deletProfile); */

//Export des routes users:
module.exports = router;
