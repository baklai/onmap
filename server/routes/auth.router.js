const { Router } = require('express');
const { signin, signup, me } = require('../controllers/auth.controller');

const router = Router();

router.post('/signin', signin);

router.post('/signup', signup);

router.get('/me', me);

module.exports = router;
