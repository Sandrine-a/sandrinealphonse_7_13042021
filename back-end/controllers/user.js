//Imports
require('dotenv').config();

const models = require('../models');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


//Middlewares
exports.signup = async (req,res,next) => {
  console.log("controleur SIGNUP");

  //Recuperation des param
  const { lastname, firstname, email, password } = req.body;

  //Verification de l'utilisateur déja en BDD
  const userExist = await models.User.findOne({
    attributes: ['email'],
    where: {email: email}
  })

  if(userExist) {
    return res.status(400).json({error: 'Utisateur deja enregistré !'});
  } else {
    try { 
      const hash = await bcrypt.hash(password, 12);
      const user = await models.User.create({
        firstName: firstname,
        lastName: lastname,
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

  //Recuperation des param
  const email = req.body.email;
  const password = req.body.password;

  const user = await models.User.findOne({
    where: {email: email}
  })
  .then(user => {
    console.log(user.password);
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
    .catch(error => res.status(500).json({ error }));

  })
  .catch(error => res.status(500).json({ error }));
};

//MIDDLEWARE TO DO
/* exports.getProfile = async (req,res,next) => {
};

exports.modifyProfile = async (req,res,next) => {
};

exports.deleteProfile = async (req,res,next) => {
}; */

