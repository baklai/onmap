const mongoose = require('mongoose');

mongoose.plugin(require('../plugins/mongoose'));

const Profile = require('../models/profile.model');

const connectToMongoDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    await Profile.setDefaultProfiles();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(0);
  }
};

module.exports = { connectToMongoDB };
