//Imports
require('dotenv').config();

const express = require ('express');

const cors = require('cors');

const Sequelize  = require('sequelize');

const bodyParser = require('body-parser');

const path = require('path');


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comment')

const app = express();

//BDD
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

//Gestion des erreurs de CORS:
app.use(
  cors({
    origin(_, callback) {
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['X-Filename'],
  }),
);

/* //Paramettrage des headers pour CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); */

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Test DB
db.authenticate()
.then(()=> console.log('Connection  to database has been established successfully.'))
.catch(err =>  console.error('Unable to connect to the database:', error));

app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistrement des routes User
app.use('/api/users', userRoutes);
//Enregistrement du router
app.use('/api/posts', postRoutes);

app.use('/api/posts', commentRoutes)

//Exports
module.exports = app;