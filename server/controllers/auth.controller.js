const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { toResponse } = require('../models/user.model');

const {
  JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN,
  BCRYPT_SALT
} = require('../config/api.config');

const User = require('../models/user.model');

const signin = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (user) {
      if (user.isActive) {
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              userId: user._id,
              login: user.login,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              role: user.role
            },
            JWT_SECRET_KEY,
            { expiresIn: TOKEN_EXPIRES_IN }
          );
          res.json({ token });
        } else {
          res.status(401).json({ message: 'The password is incorrect.' });
        }
      } else {
        res.status(401).json({ message: 'Account is disabled.' });
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
    const { login, password, name, email } = req.body;
    const candidate = await User.findOne({ login });
    if (candidate) {
      res.status(409).json({ message: 'This login is already taken.' });
    } else {
      const salt = bcrypt.genSaltSync(BCRYPT_SALT);
      const user = new User({
        login,
        password: bcrypt.hashSync(password, salt),
        name,
        email
      });
      await user.save();
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
