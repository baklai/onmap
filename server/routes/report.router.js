const { Router } = require('express');

const reportController = require('../controllers/report.controller');

const router = Router();

router
  .route('/')
  .get(reportController.findAll)
  .post(reportController.createOne);

router
  .route('/:id')
  .get(reportController.findOne)
  .put(reportController.updateOne)
  .delete(reportController.removeOne);

module.exports = router;
