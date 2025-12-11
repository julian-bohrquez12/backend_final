// src/models/Todo.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Todo = sequelize.define('Todos', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Status: {
        type: DataTypes.ENUM("pending", "completed"),
        defaultValue: "pending"
    },
    Created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Todos',
    timestamps: false
});

module.exports = Todo;
