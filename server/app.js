const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const compression = require('compression');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/order');
const ForgotPasswordRequest = require('./models/forgotPassword');
const SavedExpense = require('./models/savedExpense');

const sequelize = require('./util/database');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(bodyParser.json({ extended: false }));

app.use(cors());
app.use(helmet());
// app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(SavedExpense);
SavedExpense.belongsTo(SavedExpense);

sequelize.sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })