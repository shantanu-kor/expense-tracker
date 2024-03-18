require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', process.env.MYSQL_PASSWORD, {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;