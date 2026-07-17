const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const validateId = [
  param('id')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('Invalid contact ID format.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const contactValidationRules = [
  body('firstName').trim().notEmpty().withMessage('First name is required.'),
  body('lastName').trim().notEmpty().withMessage('Last name is required.'),
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('favoriteColor').trim().notEmpty().withMessage('Favorite color is required.'),
  body('birthday')
    .isISO8601()
    .toDate()
    .withMessage('Birthday must be in the format YYYY-MM-DD.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() }); 
    }
    next();
  }
];

module.exports = {
  validateId,
  contactValidationRules
};
