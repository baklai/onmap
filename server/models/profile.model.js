const { model, Schema } = require('mongoose');

const PROFILES = [
  {
    title: 'Intense scan',
    flags: ['-T4', '-A', '-v']
  },
  {
    title: 'Intense scan plus UDP',
    flags: ['-sS', '-sU', '-T4', '-A', '-v']
  },
  {
    title: 'Intense scan, all TCP ports',
    flags: ['-p 1-65535', '-T4', '-A', '-v']
  },
  {
    title: 'Intense scan, no ping',
    flags: ['-T4', '-A', '-v', '-Pn']
  },
  {
    title: 'Ping scan',
    flags: ['-sn']
  },
  {
    title: 'Quick scan',
    flags: ['-T4', '-F']
  },
  {
    title: 'Quick scan plus',
    flags: ['-sV', '-T4', '-O', '-F', '--version-light']
  },
  {
    title: 'Quick traceroute',
    flags: ['-sn', '--traceroute']
  },
  {
    title: 'Slow comprehensive scan',
    flags: [
      '-sS',
      '-sU',
      '-T4',
      '-A',
      '-v',
      '-PE',
      '-PP',
      '-PS80,443',
      '-PA3389',
      '-PU40125',
      '-PY',
      '-g 53',
      '--script "default or (discovery and safe)"'
    ]
  }
];

const profileSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  flags: {
    type: Array,
    default: []
  },
  userID: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'user'
  }
});

profileSchema.statics.setDefaultProfiles = async function (userID) {
  const defaultProfiles = PROFILES.map((item) => {
    return { ...item, userID };
  });
  await this.insertMany(defaultProfiles);
  return;
};

const Profile = model('profile', profileSchema);

module.exports = Profile;
