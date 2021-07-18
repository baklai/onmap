const reportService = require('../services/report.service');

const findAll = async (req, res, next) => {
  try {
    const reports = await reportService.findAll();
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const report = await reportService.findOne(req.params.id);
    if (report) {
      res.status(200).send(report);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const report = await reportService.createOne({ ...req.body });
    res.status(200).send(report);
    return;
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const isUpdated = await reportService.updateOne({ ...req.body });
    if (isUpdated) {
      res.status(200).send({ ...req.body });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const report = await reportService.removeOne(req.params.id);
    if (report) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};
