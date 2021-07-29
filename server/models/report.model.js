const { model, Schema } = require('mongoose');

const reportSchema = new Schema({
  target: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  flags: {
    type: Array,
    default: null
  },
  report: {
    type: Object
  },
  userID: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'user'
  }
});

module.exports = model('report', reportSchema);
