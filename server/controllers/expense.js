const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    try {
        const expense = await req.user.createExpense({ amount, description, category });
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

exports.getExpenses = async (req, res, next) => {
    try {
        const data = await req.user.getExpenses({raw: true })
        res.json({
            success: true,
            message: "All your expenses",
            data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
};

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await req.user.getExpenses({where: {id}})
        await data[0].destroy();
        res.json({
            success: true,
            message: "Expense deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
};