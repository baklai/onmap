const isActive = (req, res, next) => {
  if (!req.user.isActive) {
    res.status(403).json({ message: 'Account is disabled.' });
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ message: 'Access is denied.' });
  } else {
    next();
  }
};

module.exports = {
  isActive,
  isAdmin
};
