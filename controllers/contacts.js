const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const users = await mongodb.getDatabase().collection("contacts").find().toArray();
  res.json(users);
};

const getSingle = async (req, res) => {
  const userId = req.params.id;
  const user = await mongodb.getDatabase().collection("contacts").findOne({ _id: new ObjectId(userId) });
  res.json(user);
};

module.exports = {
  getAll,
  getSingle,
};
