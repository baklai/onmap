const { Router } = require('express');

const userController = require('../controllers/user.controller');
const { isAdmin } = require('../middleware/roles');

const router = Router();

router
  .route('/')
  .get(isAdmin, userController.findAll)
  .post(userController.createOne);

router
  .route('/:id')
  .get(userController.findOne)
  .put(userController.updateOne)
  .delete(userController.removeOne);

module.exports = router;
