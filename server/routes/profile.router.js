const { Router } = require('express');

const profileController = require('../controllers/profile.controller');

const router = Router();

router
  .route('/')
  .get(profileController.findAll)
  .post(profileController.createOne);

router
  .route('/:id')
  .get(profileController.findOne)
  .put(profileController.updateOne)
  .delete(profileController.removeOne);

module.exports = router;
