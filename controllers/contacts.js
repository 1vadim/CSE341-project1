const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['Contacts']
  const users = await mongodb.getDatabase().collection('contacts').find().toArray();
  res.json(users);
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  const userId = req.params.id;
  const user = await mongodb
    .getDatabase()
    .collection('contacts')
    .findOne({ _id: new ObjectId(userId) });
  res.json(user);
};

const createSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDatabase().collection('contacts').insertOne(contact);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
};

const updateSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  const userId = req.params.id;
  const updateData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
    .getDatabase()
    .collection('contacts')
    .updateOne({ _id: new ObjectId(userId) }, { $set: updateData });
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
};

const deleteSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  const userId = req.params.id;
  const result = await mongodb
    .getDatabase()
    .collection('contacts')
    .deleteOne({ _id: new ObjectId(userId) });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: `Contact with ID ${userId} was not found.` });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle
};
