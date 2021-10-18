//Imports
require('dotenv').config();

const models = require('../models');

const fs = require('fs');

/* const Post = require('../models/Post');
const { title } = require('process'); */

exports.createPost = async (req,res,next) => { 
  console.log("** ** CONTROLEUR CREATE SAUCE");
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


   //Recuperation des param
/*    const sauceObject = JSON.parse(req.body.sauce);
   const sauce = new Sauce({
     ...sauceObject,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
   sauce.save()
     .then(() => res.status(201).json({ message: ' Sauce enregistrée !'}))
     .catch(error => res.status(400).json({ error })); */

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

/* exports.modifyPost = async (req,res,next) => {
};

exports.getAllPosts = async (req,res,next) => {
};

exports.getOnePost = async (req,res,next) => {
};

exports.deletePost = async (req,res,next) => {
}; */