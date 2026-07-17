const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getAll = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Retrieve a list of all contacts from the database.'

  // try {
  //   const users = await mongodb.getDatabase().collection('contacts').find().toArray();

  //   res.status(200).json(users);
  // } catch (err) {
  //   res.status(500).json({
  //     message: err.message
  //   });
  // }
  const result = await mongodb.getDatabase().collection('contacts').find().toArray();
  res.status(200).json(result);
};

// const getSingle = async (req, res) => {
//   // #swagger.tags = ['Contacts']

//   const userId = req.params.id;

//   if (!ObjectId.isValid(userId)) {
//     return res.status(400).json({
//       message: 'Invalid contact ID.'
//     });
//   }

//   try {
//     const user = await mongodb
//       .getDatabase()
//       .collection('contacts')
//       .findOne({ _id: new ObjectId(userId) });

//     if (!user) {
//       return res.status(404).json({
//         message: 'Contact not found.'
//       });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({
//       message: err.message
//     });
//   }
// };

const getSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Get a single contact by its unique ID.'
  /* #swagger.parameters['id'] = {
        description: 'Unique MongoDB ObjectId of the contact',
        required: true,
        type: 'string'
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/Contact' },
        description: 'Contact successfully retrieved.' 
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/ValidationError' },
        description: 'Invalid ID format in URL parameters.' 
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/GeneralError' },
        description: 'Contact with the specified ID does not exist.' 
     } */
  const userId = new ObjectId(req.params.id);
  const user = await mongodb.getDatabase().collection('contacts').findOne({ _id: userId });

  if (!user) {
    const error = new Error('Contact with such ID not found.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(user);
};

const createSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Create a new contact.'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'New contact raw payload data',
        required: true,
        schema: { $ref: '#/definitions/Contact' }
     } */
  /* #swagger.responses = { 
        description: 'Contact successfully created.',
        schema: { id: '60c72b2f9b1d8b2bad000001' }
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/ValidationError' },
        description: 'Validation failed for request body payload fields.' 
     } */

  // const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  // if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
  //   return res.status(400).json({
  //     message: 'All fields are required.'
  //   });
  // }

  // if (!emailRegex.test(email)) {
  //   return res.status(400).json({
  //     message: 'Invalid email address.'
  //   });
  // }

  // try {
  //   const contact = {
  //     firstName,
  //     lastName,
  //     email,
  //     favoriteColor,
  //     birthday
  //   };

  //   const result = await mongodb.getDatabase().collection('contacts').insertOne(contact);

  //   res.status(201).json({
  //     id: result.insertedId
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     message: err.message
  //   });
  // }
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
  res.status(201).json({ id: response.insertedId });
};


const updateSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Update an existing contact by its ID.'
  /* #swagger.parameters['id'] = { description: 'ID of the contact to update.' } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated fields payload',
        required: true,
        schema: { $ref: '#/definitions/Contact' }
     } */
  /* #swagger.responses = { description: 'Contact successfully updated (No Content returned).' } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/ValidationError' } } */

  //   const userId = req.params.id;
  //   const updateData = {
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     favoriteColor: req.body.favoriteColor,
  //     birthday: req.body.birthday
  //   };
  //   const result = await mongodb
  //     .getDatabase()
  //     .collection('contacts')
  //     .updateOne({ _id: new ObjectId(userId) }, { $set: updateData });
  //   if (result.modifiedCount > 0) {
  //     res.status(204).send();
  //   } else {
  //     res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  //   }
  // };

  //   const userId = req.params.id;
  //   if (!ObjectId.isValid(userId)) {
  //     return res.status(400).json({
  //       message: 'Invalid contact ID.'
  //     });
  //   }
  //   const updateData = {};
  //   for (const [key, value] of Object.entries(req.body)) {
  //     if (value !== undefined) {
  //       updateData[key] = value;
  //     }
  //   }
  //     if (updateData.email !== undefined && !emailRegex.test(updateData.email)) {
  //       return res.status(400).json({
  //         message: 'Invalid email address.'
  //       });
  //     }
  //   if (Object.keys(updateData).length === 0) {
  //     return res.status(400).json({ message: 'No data provided for update.' });
  //   }

  //   try {
  //     const result = await mongodb
  //       .getDatabase()
  //       .collection('contacts')
  //       .updateOne({ _id: new ObjectId(userId) }, { $set: updateData });

  //     if (result.matchedCount > 0) {
  //       res.status(204).send();
  //     } else {
  //       res.status(404).json({ message: 'Contact not found.' });
  //     }
  //   } catch (error) {
  //     res.status(500).json(error.message || 'Some error occurred while updating the contact.');
  //   }
  // };

  const userId = new ObjectId(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .collection('contacts')
    .replaceOne({ _id: userId }, updatedContact);

  if (response.modifiedCount === 0) {
    const error = new Error(
      'The contact has not been updated (the data may be identical or the contact may have been deleted).'
    );
    error.statusCode = 400;
    throw error;
  }
  res.status(204).end();
};

const deleteSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Delete a contact from the database by its ID.'
  /* #swagger.parameters['id'] = { description: 'ID of the contact to delete.' } */
  /* #swagger.responses = { description: 'Contact successfully deleted (No Content returned).' } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/ValidationError' } } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/GeneralError' } } */

  // const userId = req.params.id;

  // if (!ObjectId.isValid(userId)) {
  //   return res.status(400).json({
  //     message: 'Invalid contact ID.'
  //   });
  // }

  // try {
  //   const result = await mongodb
  //     .getDatabase()
  //     .collection('contacts')
  //     .deleteOne({ _id: new ObjectId(userId) });

  //   if (result.deletedCount === 0) {
  //     return res.status(404).json({
  //       message: 'Contact not found.'
  //     });
  //   }

  //   res.status(204).send();
  // } catch (err) {
  //   res.status(500).json({
  //     message: err.message
  //   });
  // }

  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: userId });

  if (response.deletedCount === 0) {
    const error = new Error('Contact not found for deletion.');
    error.statusCode = 404;
    throw error;
  }
  res.status(204).end();
};

module.exports = {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle
};
