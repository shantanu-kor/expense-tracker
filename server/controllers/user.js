const User = require('../models/user');

exports.addUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const findUser = async () => {
        const user = await User.findAll({ where: { email: email.toLowerCase() } })
        // console.log(user);
        if (user.length === 0) return false
        else return true;
    }
    try {
        const exists = await findUser();
        if (!exists) {
            User.create({ name, email: email.toLowerCase(), password });
            res.status(200).json({
                message: 'USER_CREATED'
            })
        } else {
            res.status(409).json({
                message: 'EMAIL_PRESENT'
            })
        }
    } catch (err) {
        console.log(err);
    }

};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const findUser = async () => {
        const user = await User.findAll({ where: { email: email.toLowerCase() } })
        if (user.length === 0) return null;
        else return user[0];
    }
    try {
        const exists = await findUser();
        if (!exists) {
            res.status(404).json({
                message: "User not found"
            })
        } else {
            if (exists.dataValues.password === password) {
                res.json({
                    message: "User login successful"
                })
            } else {
                res.status(401).json({
                    message: "User not authorized (Incorrect Password)"
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
    
};