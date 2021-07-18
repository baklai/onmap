const mongoose = require('mongoose');

mongoose.plugin(require('../plugins/mongoose'));

const connectToMongoDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(0);
  }
};

module.exports = { connectToMongoDB };
