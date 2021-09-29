const collectorService = require('../services/collector.service');

const findAll = async (req, res, next) => {
  try {
    const reports = await collectorService.findAll();
    res.status(200).json(reports.map(toResponse));
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const report = await collectorService.findOne(req.params.id);
    if (report) {
      res.status(200).json(report);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const report = await collectorService.createOne({
      host: req.body.host,
      users: JSON.parse(req.body.users),
      products: JSON.parse(req.body.products),
      smbshare: JSON.parse(req.body.smbshare)
    });
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const isUpdated = await collectorService.updateOne({ ...req.body });
    if (isUpdated) {
      res.status(200).json({ ...req.body });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const report = await collectorService.removeOne(req.params.id);
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
