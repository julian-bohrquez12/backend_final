const { Sequelize } = require('sequelize');

// Variables de entorno
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
    console.error("❌ ERROR: Faltan variables de entorno para la base de datos.");
    console.log("Verifique que creó estas variables en Render:");
    console.log("DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT");
    process.exit(1);
}

// Conexión con Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Requerido por Railway
        }
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Función para conectar a la BD
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ Conexión a Railway (${DB_DIALECT}) establecida correctamente.`);
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos en Railway:");
        console.error(error.message);
        throw error; // Lo captura server.js
    }
};

module.exports = { sequelize, connectDB };
