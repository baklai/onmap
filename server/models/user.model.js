const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
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
    required: true
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
