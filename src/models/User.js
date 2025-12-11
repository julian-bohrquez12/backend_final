// src/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('Usuarios', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Role_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Usuarios',
    timestamps: false
});

module.exports = User;