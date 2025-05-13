// src/db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASS, 
  {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
