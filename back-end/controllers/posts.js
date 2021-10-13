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
  const idUser = req.body.idUser

  //Vérification de la complétion des inputs
  if(!title || !content) {
  return res.status(400).json({error: ' Tous les champs sont oblogatoires !'});
   } 

  // Récupération de l'IdUser
  const user = await models.User.findOne({
    where: { id: idUser }
  })
  .then(user => {
    console.log(user.id);
    if(user) {
      console.log(user);
      //Si Id User exist
      try {
        //Creéation du post
        models.Post.create({
        idUser: user.id,
        title: title,
        content: content,
        likes: 0,
        comments: 0
        })
        .then(() => res.status(201).json({ message: ' Post envoyé !'}))  
      } catch (error) {
        res.status(400).json({ error })
      }
  
    } else {
      return res.status(401).json({ error: 'IDUtilisateur non trouvé !' });
    }
  }
    
  )
  .catch(error => res.status(500).json({ error }));

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