const Sequelize = require("sequelize");
/**
 * Connection with database 
 */
const sequelize = new Sequelize("faculty","root","Surya@123",{
    dialect : "mysql",
    host: "localhost",
});

module.exports = sequelize;