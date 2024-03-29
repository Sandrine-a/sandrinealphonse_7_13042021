const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.USER_SECRET_TOKEN); 
    const userId = decodedToken.userId; 
    const isAdmin = decodedToken.isAdmin;
    if ( req.body.userId && req.body.userId !== userId && !isAdmin ){
      throw new Error(' unauthorized User!');
    } else {
      next();
    }
  } catch(error) {
    res.status(403).json({error: (' unauthorized request!')});
  }
};