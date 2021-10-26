//Imports
require('dotenv').config();

const models = require('../models');


exports.createComment = async (req,res,next) => {
  //PARAMS
  const postId = req.params.postId;
  const userId = req.body.userId;

  console.log("CONROLEUR COMMENT");

  ///Recherche du post en Bdd
  const postExist = await models.Post.findOne({
    where: { id: postId }
  })
  if(postExist) {
    //Recherche de l'user qui commente 
    try{
      const userExist = await models.User.findOne({
        where: { id: userId}
      })
      if(userExist) {
        console.log('EXIST');
        console.log(req.body.content);
          await models.Comment.create({
            content: req.body.content,
            UserId: userId,
            PostId: postId 
          })
          .then((comment) => res.status(201).json({ comment }))
/*         )
        .catch(error => res.status(500).json({ error: error })) */
      }
    }
    catch(error) {
      return res.status(404).json({error: ' Unable to verify The User'});
    }
  } else{
    return res.status(500).json({error: ' Unable to verify Post'});
  }
  

}

exports.deleteComment = async (req,res,next) => {
  //PARAMS
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  console.log('DELETE COMM');

  const comment = await models.Comment.findOne({
    where: { id: commentId, postId: postId }
  })
  .then(comment => comment.destroy())
  .then(() => res.status(200).json({ message: ' Comment deleted '}))
  .catch(error => res.status(500).json({ error: 'Unable to verify post' }));
};

exports.getOneComment = async (req,res,next) => {
  const postId = req.params.postId;

  const comment = await models.Comment.findOne({
    include: [
      {//inclure  belongs to User
      model:models.User,
      attributes: ['id']
    }, 
     {//Inclure belongs to Post et user Facultatif
     model:models.Post,
     attributes: ['id'],
     include: { model: models.User, attributes: ['id']  }
    }
   ],
   where: { postId: postId }
  })
 .then((comment) => {res.status(200).json(comment)})
 .catch((error) => {res.status(400).json({error: error});
   }
 );
};

exports.getAllComments = async (req,res,next) => {
  const postId = req.params.postId;

  try{//Recherche si le post existe
    const postExist = await models.Post.findOne({
      where: { id: postId }
    })
    if(postExist) {
      const allComments = await models.Comment.findAll({
        include: [
/*           {//inclure  belongs to User
          model:models.User,
          attributes: ['id']
        }, 
         {//Inclure belongs to Post et user Facultatif
         model:models.Post,
         attributes: ['id'],
         include: { model: models.User, attributes: ['id']  }
        } */
       ],
       where: { postId: postId }
      })
     .then((allComments) => {res.status(200).json(allComments)})
     .catch(error => {res.status(400).json({error: error}) 
    })
    }else {
      res.status(404).json({error: 'Ressource missing'})
    }
  }catch(error) {
    res.status(500).json({error })
  }
};

