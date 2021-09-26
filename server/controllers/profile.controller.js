const profileService = require('../services/profile.service');

const findAll = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const profiles = await profileService.findAll(userID);
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const profile = await profileService.findOne(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const profile = await profileService.createOne({ ...req.body });
    res.status(200).send(profile);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const isUpdated = await profileService.updateOne({ ...req.body });
    if (isUpdated) {
      res.status(200).send(isUpdated);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const profile = await profileService.removeOne(req.params.id);
    if (profile) {
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
