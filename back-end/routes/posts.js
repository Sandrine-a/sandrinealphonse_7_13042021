//Imports
const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/posts');

//Routes
router.post('/', postCtrl.createPost);

//Routes TODO
/* router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.get('/', postCtrl.AllPosts);
router.delete('/:id', postCtrl.createPost); */

//Export
module.exports = router;