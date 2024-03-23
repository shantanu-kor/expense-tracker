const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.addExpense = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    const { amount, description, category } = req.body;
    try {
        const expense = await req.user.createExpense({ amount, description, category }, { transaction });
        req.user.totalExpense += Number(amount);
        await req.user.save({ transaction });
        await transaction.commit();
        res.status(201).json({
            success: true,
            message: "Expense Added Successfully",
            data: expense.dataValues
        });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({
            success: false,
            message: err
        });
    }
};

exports.getExpenses = async (req, res, next) => {
    try {
        const data = await req.user.getExpenses({ raw: true })
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
    const transaction = await sequelize.transaction();

    const id = req.params.id;
    try {
        const data = await req.user.getExpenses({ where: { id }, transaction })
        const expense = data[0].amount;
        await data[0].destroy({ transaction });
        req.user.totalExpense -= expense;
        await req.user.save({ transaction });
        await transaction.commit();
        res.json({
            success: true,
            message: "Expense deleted successfully"
        })
    } catch (err) {
        transaction.rollback();
        res.status(500).json({
            success: false,
            message: err
        })
    }
};