const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { validateId, contactValidationRules } = require('../middleware/validateContact');
const { handleAsync } = require('../middleware/errorHandler');

router.get('/', handleAsync(contactsController.getAll));

router.get('/:id', validateId, handleAsync(contactsController.getSingle));

router.post('/', contactValidationRules, handleAsync(contactsController.createSingle));

router.put(
  '/:id',
  validateId,
  contactValidationRules,
  handleAsync(contactsController.updateSingle)
);

router.delete('/:id', validateId, handleAsync(contactsController.deleteSingle));

module.exports = router;
