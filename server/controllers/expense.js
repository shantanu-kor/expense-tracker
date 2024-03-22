const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    try {
        const expense = await req.user.createExpense({ amount, description, category });
        req.user.totalExpense += Number(amount);
        req.user.save();
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
        const expense = data[0].amount;
        await data[0].destroy();
        req.user.totalExpense -= expense;
        req.user.save();
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