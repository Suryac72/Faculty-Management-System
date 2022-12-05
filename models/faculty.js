const sequelize = require("../util/database");
const {roles} = require("../util/constants");
const { Sequelize, DataTypes } = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

const options = {
    field: 'password', // secret field to hash, default: 'password'
    rounds: 12, // used to generate bcrypt salt, default: 12
    compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
  }

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
        type: Sequelize.BIGINT,
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

useBcrypt(Faculty, options);
module.exports = Faculty;
