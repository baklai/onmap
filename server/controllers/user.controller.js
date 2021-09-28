const bcrypt = require('bcrypt');
const { toResponse } = require('../models/user.model');
const userService = require('../services/user.service');

const {
  JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN,
  BCRYPT_SALT
} = require('../config/api.config');

const findAll = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users.map(toResponse));
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const user = await userService.findOne(req.params.id);
    if (user) {
      res.status(200).send(toResponse(user));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    console.log(req.body);

    const password = await bcrypt.hash(req.body.password, BCRYPT_SALT);
    const user = await userService.createOne({ ...req.body, password });
    res.status(200).send(toResponse(user));
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const password = await hash(req.body.password, BCRYPT_SALT);
    const user = {
      ...req.body,
      id: req.params.id,
      password
    };
    const isUpdated = await userService.updateOne(user);
    if (isUpdated) {
      res.status(200).send(toResponse(user));
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const user = await userService.removeOne(req.params.id);
    if (user) {
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
