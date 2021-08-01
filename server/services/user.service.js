const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const Report = require('../models/report.model');

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
  const newUser = await User.create(user);
  await Profile.setDefaultProfiles(newUser.id);
  return newUser;
};

const updateOne = async (user) => {
  return User.findByIdAndUpdate(user.id, user);
};

const removeOne = async (id) => {
  await Report.deleteMany({ userID: id });
  await Profile.deleteMany({ userID: id });
  return User.deleteOne({ _id: id });
};

module.exports = {
  findOneByLogin,
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};
