const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    try {
        const expense = await Expense.create({ amount, description, category });
        res.status(201).json({
            success: true,
            message: "Expense Added Successfully",
            data: expense.dataValues
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }
};