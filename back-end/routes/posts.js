//Imports
const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../utils/auth');
const multer = require('../utils/multer-config');

//Routes
router.post('/', auth, multer.postsStorage, postCtrl.createPost);

router.get('/', auth, postCtrl.getAllPosts);

router.put('/:id', auth, multer.postsStorage, postCtrl.modifyPost);

router.delete('/:id', auth,  postCtrl.deletePost);

//Routes TODO
/* router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.get('/', postCtrl.AllPosts);
 */

//Export
module.exports = router;