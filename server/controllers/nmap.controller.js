const nmap = require('libnmap');

const Profile = require('../profiles/profile.model');
const Report = require('../models/report.model');

const scanTarget = async (req, res) => {
  // const opts = {
  //   timeout: 900, // 900s = 15m and increases the reliability of scan results
  //   flags: [
  //     '-T0', // Paranoid scan type; very slow but accurate
  //     '--max-retries 10', // Don't give up on slow responding hosts
  //     '--ttl 200ms', // Accomodate for slow connections by setting the packets TTL value higher
  //     '--scan-delay 10s', // Account for host 'rate limiting'
  //     '--max-rate 30', // Slows down packet spewing to account for IDS protections
  //   ],
  //   range: ['scanme.nmap.org', '172.17.0.0/24'],
  // };

  // const opts = {
  //   timeout: 900,
  //   json: false,
  //   flags: req.body.flags,
  //   ports: req.body.ports || '',
  //   range: [req.body.target]
  // };

  console.log('SCAN TARGET');

  console.log(req.user);

  const opts = {
    //  timeout: 900,
    json: true,
    flags: req.body.flags,
    ports: req.body.ports || null,
    range: [req.body.target]
  };

  nmap.scan(opts, async (err, report) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        err
      });
    } else {
      console.log(report);

      for (let item in report) {
        const newReport = await Report.findOneAndUpdate(
          { target: item },
          {
            target: item,
            report: report[item]
          },
          { new: true, upsert: true, useFindAndModify: false }
        );
      }

      res.status(200).json('newReport');
    }
  });
};

const getReports = async (req, res) => {
  const data = await Report.find({}, '-report')
    .sort({ updatedAt: 'desc' })
    //  .sort({ updatedAt: 'asc' })
    .exec();
  res.status(200).json(data);
};

const getReportById = async (req, res) => {
  const data = await Report.findOne({ _id: req.params.id });
  res.status(200).json(data);
};

const deleteReportById = async (req, res) => {
  await Report.deleteOne({ _id: req.params.id }).exec();
  res.status(200).json('Ok');
};

const getProfiles = async (req, res) => {
  const data = await Profile.find({}, 'title flags');
  res.status(200).json(data);
};

module.exports = {
  scanTarget,
  getReports,
  getReportById,
  deleteReportById,
  getProfiles
};
