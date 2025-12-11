// src/models/Role.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Role = sequelize.define(
    'Role',
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'Roles',
        timestamps: false
    }
);

module.exports = Role;

