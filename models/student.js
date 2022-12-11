const sequelize = require("../util/database");
const { roles } = require("../util/constants");
const { Sequelize, DataTypes } = require('sequelize');
const Student = sequelize.define("student", {
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
    branch: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rollNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
    },
    section: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM(roles.admin, roles.faculty, roles.student),
        defaultValue: roles.student,
    }
});
module.exports = Student;
