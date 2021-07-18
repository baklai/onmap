const Report = require('../models/report.model');

const findAll = async () => {
  return await Report.find({});
};
const findOne = async (id) => {
  return Report.findById(id);
};
const createOne = async (report) => {
  return Report.create(report);
};
const updateOne = async (report) => {
  return Report.findByIdAndUpdate(report.id, report);
};
const removeOne = async (id) => {
  return (await Report.deleteOne({ _id: id })).deletedCount;
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
