const { model, Schema } = require('mongoose');

const collectorSchema = new Schema({
  host: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  users: {
    type: Array,
    default: null
  },
  products: {
    type: Array,
    default: null
  },
  smbshare: {
    type: Array,
    default: null
  }
});

module.exports = model('collector', collectorSchema);
