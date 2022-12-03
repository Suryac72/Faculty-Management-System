const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const {roles} = require("../util/constants");

const Faculty = sequelize.define("faculty", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contactNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    role:{
        type: Sequelize.ENUM(roles.admin,roles.faculty),
        defaultValue: roles.faculty,
    }
});

module.exports = Faculty;
