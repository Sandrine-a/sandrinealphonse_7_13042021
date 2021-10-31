const multer = require('multer');

//Répertoire des extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Creation du middleware pour enregistrer les Photos Users
const usersStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/users');
  },
  filename: (req, file, callback) => {
    //Garder la première lettre du nom du fichier + date à la ms près + .extension
    const name = file.originalname.trim().slice(0,1); 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
//Creation du middleware pour enregistrer les Photos Users
const postsStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/posts');
  },
  filename: (req, file, callback) => {
    //Garder la première lettre du nom du fichier + date à la ms près + .extension
    const name = file.originalname.trim().slice(0,1); 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

exports.usersStorage = multer({ storage: usersStorage}).single('pPicture');

exports.postsStorage = multer({ storage: postsStorage }).single('attachment');


