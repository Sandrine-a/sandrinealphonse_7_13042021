//Imports
require('dotenv').config();

const models = require('../models');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const fs = require('fs');


//Middlewares
exports.signup = async (req,res,next) => {
  console.log("controleur SIGNUP");

  //Recuperation des param
  const { firstName, lastName, email, password } = req.body;

  //Verification de l'utilisateur déja en BDD
  const userExist = await models.User.findOne({
    attributes: ['email'],
    where: {email: email}
  })

  if(userExist) {
    return res.status(400).json({error: 'Utisateur deja enregistré !'});
  } else {
    try { 
      console.log('SIGNUP');
      const hash = await bcrypt.hash(password, 12);
      const user = await models.User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash
      });
      return res.status(201).json({ 'userId': user.id});
    }  catch (error) {
      res.status(500).json({ error});
    }
  }
};

exports.login = async (req,res,next) => { 
  console.log("controleur LOGIN");
  //Recuperation des param
  const email = req.body.email;
  const password = req.body.password;

  const user = await models.User.findOne({
    where: {email: email}
  })
  .then(user => {
    if(!user) {
      return res.status(401).json({ error: 'Utilisateur inconnu !' });
    }
    bcrypt.compare(password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot-de-passe incorrect !' });
      }
      res.status(200).json({
        'userId': user.id,
        'token': jwt.sign(
          {userId: user.id},
          process.env.USER_SECRET_TOKEN,
          {expiresIn: '12h'}
        )
      })
    }) 
    .catch((error) => res.status(500).json({ error }));

  })
  .catch((error) => res.status(500).json({ error }));
};

exports.getUserProfile = async (req,res,next) => {
  //PARAMS
  const userId = req.params.id; 

  const user = await models.User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'pPicture'],
    where: { id: userId}
  })
  .then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: 'user not found' })
    }
  })
  .catch((error) => res.status(500).json({ error: error }));
};

exports.updateUserProfile = async (req,res,next) => {
  console.log(req.body);

  //PARAMS
  const userId = req.params.id; 

  //Recherche d'un fichier dans la req puis isoler l'User
  const updatedUser = req.file ? {
    ...req.body,
    pPicture: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
  } : {
    ...req.body
  }
  console.log(updatedUser);

  try {
    const user = await models.User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'email', 'pPicture' ],
      where: { id: userId}
    })
    if(user) {
      if(!updatedUser.pPicture) {
        if(user.pPicture) {
          //Suppression de l'ancienne image de la BDD
          const oldFilename = user.pPicture.split('/images/users/')[1];
          try {
            fs.unlinkSync(`images/users/${oldFilename}`)
          } catch(error) {
            throw new Error("Erreur avec l'image envoyée")
          }
        }
        user.update({
          firstName: updatedUser.firstName, 
          lastName: updatedUser.lastName,
          pPicture: null
        }, {
          where: {
            id: userId
          }
        })
        .then(res.status(201).json({ message: ' Profile modifié sans photo!'}))
      } else {
        console.log('user rajoute pPicture');
        user.update({
          firstName: updatedUser.firstName, 
          lastName: updatedUser.lastName,
          pPicture: updatedUser.pPicture
        }, {
          where: {
            id: userId
          }
        })
        .then(res.status(201).json({ message: ' Profile modifié avec photo!'}))

      }
    } else {
      res.status(404).json({ message: 'Unable to verify User'})
    }
  }catch(error) { res.status(500).json({ error: error })}
};

exports.getAllUsers = async (req,res,next) => {
  const allPosts = await models.User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin', 'pPicture'],
/*     include: [{
      model:models.Post,  //////RAJouter table de liaison des posts
      attributes: ['id']
    },{
      model:models.Comment,  //////RAJouter table de liaison des commentaires
      attributes: ['id']
    }] */
  })
  .then(users => {
    if(users) {
      console.log(users);
      res.status(200).json(users);
    } else {
      return res.status(404).json({ error: 'No users found' })
    }
  })
  .catch((error) => res.status(500).json({ error: error }));
};

exports.deleteProfile = async (req,res,next) => {
  //PARAMS
  const userId = req.body.userId;

  const user = await models.User.findOne({
    where: { id: userId}
  })
  if(user) {
    user.destroy()
    .then(() => res.status(200).json({ message: ' Utilisateur supprimé '}))
    .catch(error => res.status(500).json({ error: error }))
  } else {
    res.status(404).json({ message: 'Unable to verify User'})
  }
};


