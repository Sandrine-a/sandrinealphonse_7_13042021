const multer = require('multer');

//Répertoire des extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Creation du middleware pour enregistrer les images
const userStorage = multer.diskStorage({
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

module.exports = multer({ userStorage }).single('image');