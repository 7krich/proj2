// import sequelize constructor from the library
const Sequelize = require('sequelize');

// import dotenv variables from .env file
require('dotenv').config();

// create connection to our database, pass in mysql info for username & password
// new Sequelize function will accept db name, sql username & sql password respectively as parameters, then pass in configuration settings
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;