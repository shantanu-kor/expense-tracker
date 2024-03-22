const User = require('../models/user');

exports.getLeaderboard = async (req, res, next) => {
    try {
        const arr = [];
        const users = await User.findAll();
        for (let user of users) {
            const name = user.dataValues.name;
            let totalAmount = 0;
            const expenses = await user.getExpenses({ raw: true });
            for (let i of expenses) {
                totalAmount += i.amount;
            }
            arr.push({ name, totalAmount });
        }
        arr.sort((a, b) => b.totalAmount - a.totalAmount);
        res.json({
            success: true,
            data: arr,
            message: "Got user expenses successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
};