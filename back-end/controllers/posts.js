//Imports
require('dotenv').config();

const models = require('../models');

const fs = require('fs');

/* const Post = require('../models/Post');
const { title } = require('process'); */

exports.createPost = async (req,res,next) => { 
  console.log("** ** CONTROLEUR CREATE SAUCE");
  //Params
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.userId

  //Vérification de la complétion des inputs
  if(!title || !content) {
  return res.status(400).json({error: ' Tous les champs sont oblogatoires !'});
   }; 

  //Si Id User exist
  try {
    //Creéation du post
    const user = await models.Post.create({
    userId: user.id,
    title: title,
    content: content,
    likes: 0,
    comments: 0
    })
    .then(() => res.status(201).json({ message: ' Post envoyé !'}))  
  } catch (error) {
    res.status(400).json({ error })
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

/* exports.modifyPost = async (req,res,next) => {
};

exports.getAllPosts = async (req,res,next) => {
};

exports.getOnePost = async (req,res,next) => {
};

exports.deletePost = async (req,res,next) => {
}; */