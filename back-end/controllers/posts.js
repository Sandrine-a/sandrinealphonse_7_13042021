//Imports
require('dotenv').config();

const models = require('../models');

const fs = require('fs');

/* const Post = require('../models/Post');
const { title } = require('process'); */

exports.createPost = async (req,res,next) => { 
  console.log("** ** CONTROLEUR CREATE POST");
  //Params
  const { title, content, userId } = req.body;

  //Vérification de la complétion des inputs
  if(!title && !content && !userId || !title && !req.file.filename && !userId) {
  return res.status(400).json({error: ' Tous les champs sont oblogatoires !'});
   }; 
   
  const userExist = await models.User.findOne({
    where: { id: userId}
  })
  if(userExist) {
    try {
      //Recherche d'un fichier dans la req pour l'isoler du post
      const newPost = req.file ? {
        ...req.body,
        attachment: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
      } : {
        ...req.body
      }
      console.log(newPost);

      if(req.file) {
        console.log('Post with pic');
        //Creéation du post si file
        await models.Post.create({
          title: title,
          attachment: newPost.attachment,
          likes: 0,
          comments: 0,
          UserId: userId
          })
          .then((post) => res.status(201).json({ post }))  
      } else {
        console.log('Post content only:');
        //Si post text 
        await models.Post.create({
          title: title,
          content: content,
          likes: 0,
          comments: 0,
          UserId: userId
          })
          .then((post) => res.status(201).json({ post }))     
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  } else {
    return res.status(404).json({error: 'Utisateur inconnu !'});
  }
};

exports.getAllPosts = async (req,res,next) => {
   const allPosts = await models.Post.findAll({
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
  const userId = req.body.userId;

  const post = await models.Post.findOne({
    where: { id: postId, userId: userId}
  })
  .then( post => {
    if(!post.attachment) {
      post.destroy()
      .then(() => res.status(200).json({ message: ' Post supprimé '}))
      .catch(error => res.status(500).json({ error: error }));
    } else {
      const filename = post.attachment.split('/images/posts/')[1];
      fs.unlink(`images/posts/${filename}`, () => {
        post.destroy()
        .then(() => res.status(200).json({ message: ' Post supprimé '}))
        .catch(error => res.status(500).json({ error: error }));
      })
    }
  })
  .catch(error => res.status(404).json({ error : 'Not found'}));
};

exports.modifyPost = async (req,res,next) => {
  console.log('*** ***MODIFY CONTROLEUR');
    //PARAMS
    const postId = req.params.id;
    const userId = req.body.userId;
      //Vérification de la complétion des inputs
    if(!postId && !req.content && !req.userId || !postId && !req.attachment && !req.userId) {
      return res.status(400).json({error: ' Tous les champs sont oblogatoires !'});
     }; 

    //Recherche d'un fichier dans la req pour l'isoler du post
    const updatedPost = await req.file ? {
      ...req.body,
      attachment: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } : {
      ...req.body
    }
    console.log(updatedPost);

    const post = await models.Post.findOne({
      attributes: ['id', 'title','content', 'attachment' ],
      where: { id: postId, userId: userId }
    })
    .then( post => {
      if(post.attachment) {
        //Suppression de l'ancienne image de la BDD
        const oldFilename = post.attachment.split('/images/posts/')[1];
        try {
          fs.unlinkSync(`images/posts/${oldFilename}`)
        } catch(error) {
          throw new Error("Erreur avec l'image envoyée")
        } 
        post.update({
          title: updatedPost.title,
          attachment: updatedPost.attachment
        }, {
          where: {
            id: postId
          }
        })
        .then(res.status(201).json({ message: 'Post image !'}))    
      } else {
        post.update({
          title: updatedPost.title,
          content: updatedPost.content
        }, {
          where: {
            id: postId
          }
        })
        .then(res.status(201).json({ message: ' Post content !'}))  
      }
    })   
    .catch(error => res.status(404).json({ error : 'Not found'}));
};
