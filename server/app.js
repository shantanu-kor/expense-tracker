const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/order');

const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(cors());

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })