const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(cors());

app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

sequelize.sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })