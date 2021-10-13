//Import controleur user:
const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/posts');

//Route pour ajouter une sauce:
router.post('/', postCtrl.createPost);

//Export des routes users:
module.exports = router;