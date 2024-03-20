const express = require('express');

const purchaseController = require('../controllers/purchase');

const authenticationMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/premium-membership', authenticationMiddleware.authenticate, purchaseController.purchasePremium);

router.post('/update-transaction-status', authenticationMiddleware.authenticate, purchaseController.updateTransactionStatus);

module.exports = router;