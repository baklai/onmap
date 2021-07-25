const User = require('../models/user.model');

const findOneByLogin = async (login) => {
  return User.findOne({ login });
};

const findAll = async () => {
  return User.find({});
};

const findOne = async (id) => {
  return User.findById(id);
};

const createOne = async (user) => {
  return User.create(user);
};

const updateOne = async (user) => {
  return User.findByIdAndUpdate(user.id, user);
};

const removeOne = async (id) => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  findOneByLogin,
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};
