const User = require('../models/user');

exports.addUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const findUser = async () => {
        const user = await User.findAll({ where: { email: email.toLowerCase() } })
        // console.log(user);
        if (user.length === 0) return false
        else return true;
    }
    const exists = await findUser();
    console.log(exists);
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

};