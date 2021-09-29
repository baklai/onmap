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

// add virtual if You want
collectorSchema.virtual('usersCount').get(function () {
  return this.users.length;
});

collectorSchema.virtual('productsCount').get(function () {
  return this.products.length;
});

collectorSchema.virtual('smbshareCount').get(function () {
  return this.smbshare.length;
});

collectorSchema.statics.toResponse = function (collector) {
  const {
    id,
    host,
    usersCount,
    productsCount,
    smbshareCount,
    created,
    updated
  } = collector;

  return {
    id,
    host,
    usersCount,
    productsCount,
    smbshareCount,
    created,
    updated
  };
};

module.exports = model('collector', collectorSchema);
