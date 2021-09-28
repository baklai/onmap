const { Router } = require('express');

const collectorController = require('../controllers/collector.controller');

const router = Router();

router
  .route('/')
  .get(collectorController.findAll)
  .post(collectorController.createOne);

router
  .route('/:id')
  .get(collectorController.findOne)
  .put(collectorController.updateOne)
  .delete(collectorController.removeOne);

module.exports = router;
