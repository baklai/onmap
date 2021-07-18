const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('express-jwt');

const { MONGO_URI, JWT_SECRET_KEY } = require('./config/api.config');

const { connectToMongoDB } = require('./utils/database');

connectToMongoDB(MONGO_URI);

const authRoutes = require('./routes/auth.router');
const userRoutes = require('./routes/user.router');
const profileRoutes = require('./routes/profile.router');
const reportRoutes = require('./routes/report.router');

const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  jwt({
    secret: JWT_SECRET_KEY,
    algorithms: ['sha1', 'RS256', 'HS256']
  }).unless({
    path: ['/api/v1/auth/signin', '/api/v1/auth/signup']
  })
);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/reports', reportRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .send({ message: 'Error 404 has occurred. Please try again later.' });
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'The token is invalid.' });
  } else {
    res
      .status(500)
      .send({ message: 'Error 500 has occurred. Please try again later.' });
  }
});

module.exports = app;
