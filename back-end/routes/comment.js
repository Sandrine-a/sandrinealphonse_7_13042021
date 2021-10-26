//Imports
const express = require('express');

const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../utils/auth');

//Routes
router.post('/:postId/comments/', auth, commentCtrl.createComment);

router.delete('/:postId/comments/:commentId', auth, commentCtrl.deleteComment);

router.get('/:postId/comments/', auth, commentCtrl.getAllComments);


//Export
module.exports = router;