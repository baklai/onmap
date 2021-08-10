const Profile = require('../models/profile.model');

const findAll = async (id) => {
  console.log(id);
  return await Profile.find({ userID: id });
};
const findOne = async (id) => {
  return Profile.findById(id);
};
const createOne = async (profile) => {
  return Profile.create(profile);
};
const updateOne = async (profile) => {
  return Profile.findByIdAndUpdate(profile.id, profile);
};
const removeOne = async (id) => {
  return (await Profile.deleteOne({ _id: id })).deletedCount;
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
