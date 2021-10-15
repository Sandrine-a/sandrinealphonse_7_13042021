//Imports
const { body, validationResult } = require('express-validator');

//Middlewares de validations
exports.loginValidator = () => {
  return [
      body('email', 'please enter a valid email').toLowerCase().isEmail().isLength({ min: 3, max: 200 }),
      body('password', 'please enter a password between 6 and 60 char').isLength({ min: 6, max: 300}),
    ]
};

exports.signupValidator = () => {
  return [
    body('lastname', 'please a lastname valid').isLength({ min: 1, max: 200}),
    body('firstname', 'please enter a firstname valid').isLength({ min: 1, max: 200}),
    body('email', 'please enter a valid email').toLowerCase().isEmail().isLength({ min: 3, max: 200}),
    body('password', 'please enter a password with min 6 characters').isLength({ min: 6, max: 300}),
  ]
};

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next()
};
