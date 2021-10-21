//Imports
require('dotenv').config();

const models = require('../models');

const fs = require('fs');

/* const Post = require('../models/Post');
const { title } = require('process'); */

exports.createPost = async (req,res,next) => { 
  console.log("** ** CONTROLEUR CREATE POST");
  //Params
  const  { title, content, userId } = req.body;

  //Vérification de la complétion des inputs
  if(!title || !content || !userId ) {
  return res.status(400).json({error: ' Tous les champs sont oblogatoires !'});
   }; 
   
  const userExist = await models.User.findOne({
    where: { id: userId}
  })
  if(userExist) {
    console.log('USER EXIST YES');
    try {
      //Creéation du post
      const post = await models.Post.create({
      title: title,
      content: content,
      likes: 0,
      comments: 0,
      UserId: userId
      })
      .then((post) => res.status(201).json({ post }))  
    } catch (error) {
      res.status(400).json({ error })
    }

  } else {
    return res.status(404).json({error: 'Utisateur deja inconnu !'});
  }
};

exports.getAllPosts = async (req,res,next) => {
   const allPosts = models.Post.findAll({
     include: [{
       model:models.User,
       attributes: ['id']
     }]
   })
  .then((posts) => {
      res.status(200).json(posts);
    }
  )
  .catch((error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deletePost = async (req,res,next) => {
  console.log("** ** CONTROLEUR DELETE POST");
  //PARAMS
  const postId = req.params.id;
  console.log(postId);
  const userId = req.body.userId;
  console.log(userId);

  const post = await models.Post.findOne({
    where: { id: postId, userId: userId}
  })
  .then( post => {
    post.destroy()
    .then(() => res.status(200).json({ message: ' Post supprimé '}))
    .catch(error => res.status(500).json({ error: error }));
  })
  .catch(error => res.status(404).json({ error : 'Not found'}));
};

/* exports.modifyPost = async (req,res,next) => {
};

exports.getAllPosts = async (req,res,next) => {
};

exports.getOnePost = async (req,res,next) => {
};

 */