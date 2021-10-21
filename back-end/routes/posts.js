//Imports
const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../utils/auth');
const multer = require('../utils/multer-config');

//Routes
router.post('/', auth, postCtrl.createPost);

router.get('/', auth, postCtrl.getAllPosts);

router.delete('/:id', auth, postCtrl.deletePost);

//Routes TODO
/* router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.get('/', postCtrl.AllPosts);
 */

//Export
module.exports = router;