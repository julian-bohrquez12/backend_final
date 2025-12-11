const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL (Sequelize) establecida exitosamente.');
    } catch (error) {
        console.error('❌ Error al conectar a MySQL:', error.message);
        throw error; // Lanza error para que startApp() lo capture
    }
};

module.exports = { sequelize, connectDB };
