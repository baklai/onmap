const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { toResponse } = require('../models/user.model');
const userService = require('../services/user.service');

const {
  JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN,
  BCRYPT_SALT
} = require('../config/api.config');

const signin = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await userService.findOneByLogin(login);
    if (user) {
      if (user.isActive) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              id: user._id,
              login: user.login,
              name: user.name,
              email: user.email,
              isActive: user.isActive,
              isAdmin: user.isAdmin,
              role: user.role
            },
            JWT_SECRET_KEY,
            { expiresIn: TOKEN_EXPIRES_IN }
          );
          res.status(200).json({ token });
        } else {
          res.status(403).json({ message: 'The password is incorrect.' });
        }
      } else {
        res.status(403).json({ message: 'Account is disabled.' });
      }
    } else {
      res.status(404).json({ message: 'User is not found.' });
    }
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const { login } = req.body;
    const candidate = await userService.findOneByLogin(login);
    if (candidate) {
      res.status(409).json({ message: 'This login is already taken.' });
    } else {
      const salt = await bcrypt.genSalt(BCRYPT_SALT);
      const password = await bcrypt.hash(req.body.password, salt);
      const user = await userService.createOne({ ...req.body, password });
      res.status(201).json(toResponse(user));
    }
  } catch (err) {
    next(err);
  }
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { signin, signup, me };
