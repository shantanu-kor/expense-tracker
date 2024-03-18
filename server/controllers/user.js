const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.addUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const saltRounds = 15;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        console.log(err);
        const findUser = async () => {
            const user = await User.findAll({ where: { email: email.toLowerCase() } })
            // console.log(user);
            if (user.length === 0) return false
            else return true;
        }
        try {
            const exists = await findUser();
            if (!exists) {
                await User.create({ name, email: email.toLowerCase(), password: hash });
                res.status(201).json({
                    success: true,
                    message: 'USER_CREATED_SUCCESSFULLY'
                })
            } else {
                res.status(409).json({
                    success: false,
                    message: 'EMAIL_ALREADY_PRESENT'
                })
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    })
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
                success: false,
                message: "User not found"
            })
        } else {
            bcrypt.compare(password, exists.dataValues.password, (err, result) => {
                if (err) {
                    throw new Error('Something went wrong')
                }
                if(result === true) {
                    res.json({
                        success: true,
                        message: "User login successful"
                    })
                } else {
                    res.status(401).json({
                        success: false,
                        message: "User not authorized (Incorrect Password)"
                    })
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }

};