const ping = require('ping');

const pingTarget = async (req, res) => {
  try {
    const opts = {
      timeout: 10,
      min_reply: 3,
      extra: ['-i', '2']
    };
    const data = await ping.promise.probe(req.body.target, opts);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      err
    });
  }
};

module.exports = {
  pingTarget
};
