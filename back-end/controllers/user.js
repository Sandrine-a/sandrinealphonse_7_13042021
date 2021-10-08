//Imports
require('dotenv').config();

const models = require('../models');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//Middlewares
exports.signup = async (req,res,next) => {
  console.log("controleur");

  //Recuperation des param
  const lastName = req.body.lastname;
  const firstName = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;

  if(!lastName || !firstName || !email || !password) {
    return res.status(400).json({error: 'tous les champs sont oblogatoires !'});
  } 
  //TO DO VERIFICATION MAIL FORMATS ET PASSWORD

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
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        isAdmin: 0,
        pPicture: null
      });
      return res.status(201).json({ 'userId': user.id});
    }  catch (error) {
      res.status(500).json({ error});
    }
  }

/*   bcrypt.hash(req.body.password, 12)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Bienvenue! Utilisateur créé!'}))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error })); */
};

