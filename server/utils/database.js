const mongoose = require('mongoose');

const { BCRYPT_SALT } = require('../config/api.config');

mongoose.plugin(require('../plugins/mongoose'));

const User = require('../models/user.model');

const connectToMongoDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    await User.setDefaultAdmin(
      {
        login: 'root',
        password: 'root',
        name: 'root',
        email: 'root@onmap.localhost',
        isActive: true,
        isAdmin: true,
        role: 'admin'
      },
      BCRYPT_SALT
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(0);
  }
};

module.exports = { connectToMongoDB };
