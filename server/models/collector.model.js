const { model, Schema } = require('mongoose');

const collectorSchema = new Schema({
  host: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  os: {
    type: Object,
    default: null
  },
  users: {
    type: Array,
    default: []
  },
  products: {
    type: Array,
    default: []
  },
  smbshares: {
    type: Array,
    default: []
  }
});

// add virtual if You want
collectorSchema.virtual('usersCount').get(function () {
  return this.users.length;
});

collectorSchema.virtual('productsCount').get(function () {
  return this.products.length;
});

collectorSchema.virtual('smbsharesCount').get(function () {
  return this.smbshares.length;
});

collectorSchema.statics.toResponse = function (collector) {
  const {
    id,
    host,
    os,
    usersCount,
    productsCount,
    smbsharesCount,
    created,
    updated
  } = collector;

  return {
    id,
    host,
    os,
    usersCount,
    productsCount,
    smbsharesCount,
    created,
    updated
  };
};

module.exports = model('collector', collectorSchema);
