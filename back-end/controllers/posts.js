//Imports
require('dotenv').config();

const models = require('../models');

const fs = require('fs');

exports.createPost = async (req,res,next) => { 
  //Params
  const { title, content, userId } = req.body;

  //Vérification de la complétion des inputs
  if(!title && !userId) {
  return res.status(400).json({error: ' User id and title are mandatory!'});
   }; 
   
   try {
    //Recherche d'un fichier dans la req pour l'isoler du post
    const newPost = req.file ? {
      ...req.body,
      attachment: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } : {
      ...req.body
    }   

    if(req.file) {
      //Creéation du post si file
      await models.Post.create({
        title: title,
        content: content,
        attachment: newPost.attachment,
        likes: 0,
        comments: 0,
        UserId: userId
        })
        .then((post) => res.status(201).json({ post }))  
    } else {
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
};

exports.getAllPosts = async (req,res,next) => {
   const allPosts = await models.Post.findAll({
     include: [
       {
       model:models.User,
       attributes: ['id']
     }, 
     {
      model:models.Comment,
      attributes: ['id']
     }
    ]
   })
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(400).json({error: error})
  });
};

exports.getOnePost = async (req,res,next) => {
  //PARAMS
  const postId = req.params.id;

  const post = await models.Post.findOne({
    attributes: ['id', 'title','content', 'attachment','UserId' ],
    where: { id: postId}
  })
  .then((post) => {
    res.status(200).json({post});
  })
  .catch((error) => {
    res.status(404).json({error: error});
  })
};

exports.deletePost = async (req,res,next) => {
  //PARAMS
  const postId = req.params.id;
  const userId = req.body.userId;

  const post = await models.Post.findOne({
    where: { id: postId }
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
    //PARAMS
    const postId = req.params.id;
    const userId = req.body.userId;

    //Vérification des inputs obligatoires
    if(req.body.userId == null || req.body.title == null) {
      return res.status(400).json({error: 'missing parameters'});
       }; 

    //Récupération du post selon la PJ
    const updatedPost = await req.file ? {
      ...req.body,
      attachment: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } : {
      ...req.body
    }
    //Recherche d'un fichier dans la req pour l'isoler du post
    try{
      const post = await models.Post.findOne({
        attributes: ['id', 'title','content', 'attachment' ],
        where: { id: postId }
      })
      if(post) {
        if(!updatedPost.attachment) {
          if(post.attachment) {
            //Modification de l'ancienne image de la BDD
            const oldFilename = post.attachment.split('/images/posts/')[1];
            try {
              fs.unlinkSync(`images/posts/${oldFilename}`)
            } catch(error) {
              throw new Error("Erreur avec l'image envoyée")
            }
          } 
          post.update({
            title: updatedPost.title,
            content: updatedPost.content,
            attachment: null
          }, {
            where: {
              id: postId
            }
          })
          .then(res.status(201).json({ post }))    
        } else {
          post.update({
            title: updatedPost.title,
            content: updatedPost.content,
            attachment: updatedPost.attachment
          }, {
            where: {
              id: postId
            }
          })
          .then(res.status(201).json({ post }))  
        }
      } else {
        res.status(404).json({ message: ' Unable to verify user '})
      }
    }catch(error){
      res.status(500).json({ error: 'cannot post message' })
    }

};
