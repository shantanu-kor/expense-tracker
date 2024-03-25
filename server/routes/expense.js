const express = require('express');

const expenseController = require('../controllers/expense');

const userAuthentication = require('../middleware/auth');

const premiumMiddleware = require('../middleware/premiumUser');

const router = express.Router();

router.post('/add-expense', userAuthentication.authenticate, expenseController.addExpense);

router.get('/get-expenses', userAuthentication.authenticate, expenseController.getExpenses);

router.delete('/delete-expense/:id', userAuthentication.authenticate, expenseController.deleteExpense);

router.get('/download-expense', userAuthentication.authenticate, premiumMiddleware.isPremiumUser, expenseController.downloadExpenses)

module.exports = router;