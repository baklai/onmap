const { Router } = require('express');
const { pingTarget } = require('../controller/ping.controller');

const router = Router();

router.post('/', pingTarget);

module.exports = router;
