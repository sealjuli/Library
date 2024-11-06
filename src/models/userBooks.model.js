const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Определение модели UserBooks
const UserBooks = sequelize.define("UserBooks");

module.exports = UserBooks;
