const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Assignment = sequelize.define("assignment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    submissionDate:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Assignment;