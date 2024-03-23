const express = require('express');

const passwordController = require('../controllers/password');
const authenticationMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/forgot-password', authenticationMiddleware.authenticate, passwordController.forgotPassword);


module.exports = router;