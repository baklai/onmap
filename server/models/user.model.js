const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: 'Login is required',
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  },
  name: {
    type: String,
    required: 'User name is required'
  },
  email: {
    type: String,
    unique: true,
    required: 'Email address is required',
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  phone: {
    type: String,
    default: ''
  },
  isActive: { type: Boolean, required: true, default: false },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: String,
    enum: ['anonymous', 'user', 'moderator', 'admin'],
    default: 'anonymous',
    required: 'User role is required'
  }
});

userSchema.statics.setDefaultAdmin = async function (user, BCRYPT_SALT) {
  const count = await this.countDocuments({});
  if (!count) {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT);
    const userAdmin = await this.create({
      login: user.login,
      password: bcrypt.hashSync(user.password, salt),
      name: user.name,
      email: user.email,
      phone: '+380000000001',
      isActive: true,
      isAdmin: true,
      role: 'admin'
    });
    return userAdmin;
  }
  return;
};

userSchema.statics.toResponse = function (user) {
  const { id, login, name, email, isActive, isAdmin, role, created, updated } =
    user;
  return { id, login, name, email, isActive, isAdmin, role, created, updated };
};

module.exports = model('user', userSchema);
