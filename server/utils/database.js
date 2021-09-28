const mongoose = require('mongoose');

const { BCRYPT_SALT } = require('../config/api.config');

mongoose.plugin(require('../plugins/mongoose'));

const User = require('../models/user.model');
const Profile = require('../models/profile.model');

const connectToMongoDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('MongoDB connected');

    // Development only - delete all collections by start
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('MongoDB - delete all collections');
    //   const db = mongoose.connection.db;
    //   const collections = await db.listCollections().toArray();
    //   collections
    //     .map((collection) => collection.name)
    //     .forEach(async (collectionName) => {
    //       await db.dropCollection(collectionName);
    //     });
    // }

    const user = await User.setDefaultAdmin(
      {
        login: 'root',
        password: 'root',
        name: 'root',
        email: 'root@onmap.io',
        isActive: true,
        isAdmin: true,
        role: 'admin'
      },
      BCRYPT_SALT
    );
    if (user) {
      await Profile.setDefaultProfiles(user.id);
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(0);
  }
};

module.exports = { connectToMongoDB };
