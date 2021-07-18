// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema(
//   {
//     title: String,
//     order: Number,
//     description: String,
//     userId: String,
//     boardId: String,
//     columnId: String
//   },
//   {
//     versionKey: false,
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       }
//     }
//   }
// );

// const Task = mongoose.model('Task', taskSchema);

// module.exports = Task;

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
  }
});

module.exports = model('report', reportSchema);
