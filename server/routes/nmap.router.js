const { Router } = require('express');

const {
  scanTarget,
  getReports,
  getReportById,
  deleteReportById,
  getProfiles
} = require('./nmap.controller');

const router = Router();

router.post('/', scanTarget);

router.get('/reports', getReports);

router.get('/reports/:id', getReportById);

router.delete('/reports/:id', deleteReportById);

router.get('/profiles', getProfiles);

module.exports = router;
