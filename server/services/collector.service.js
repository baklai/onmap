const Collector = require('../models/collector.model');

const findAll = async () => {
  return await Collector.find({});
};

const findOne = async (id) => {
  return Collector.findById(id);
};

const createOne = async (report) => {
  return Collector.findOneAndUpdate({ host: report.host }, report, {
    new: true,
    upsert: true,
    rawResult: true
  });
};

const updateOne = async (report) => {
  return Collector.findByIdAndUpdate(report.id, report);
};

const removeOne = async (id) => {
  return (await Collector.deleteOne({ _id: id })).deletedCount;
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
