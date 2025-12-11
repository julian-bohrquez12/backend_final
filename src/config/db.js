const { Sequelize } = require('sequelize');

// --- 1. Cargar Configuración desde el Entorno (.env) ---

const DB_NAME = process.env.DB_NAME || 'Railway';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'sPxygXsrXoWJfPUUCCcqOHmggBnpsmyi'; 
const DB_HOST = process.env.DB_HOST || 'maglev.proxy.rlwy.net';
const DB_PORT = process.env.DB_PORT || 33159;
const DB_DIALECT = process.env.DB_DIALECT || 'mysql'; 

// --- 2. Crear Instancia de Sequelize ---
const sequelize = new Sequelize(
    // 1. Usa las variables que ya definiste. NO repitas los strings 'Railway', 'root', etc.
    DB_NAME, 
    DB_USER, 
    DB_PASS,
    {
        host: DB_HOST, 
        port: DB_PORT,
        
        // CORRECCIÓN CLAVE: La propiedad 'dialect' debe tener solo un valor.
        // Aquí se usa la variable DB_DIALECT, que ya tiene 'mysql'.
        dialect: DB_DIALECT, 
        
        logging: false, // Opcional: Deshabilita el logging de SQL en consola
        pool: { // Configuración del Pool de conexiones
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// --- 3. Función para Probar la Conexión ---
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL (Sequelize) establecida exitosamente.');
        
        // Opcional: Sincronizar modelos (solo si estás usando la sintaxis de modelos de Sequelize)
        // await sequelize.sync({ alter: true }); // Usar con precaución en producción
        
    } catch (error) {
        console.error('❌ Error al conectar a MySQL:', error.message);
        // Puedes salir de la aplicación si la DB es crítica
        // process.exit(1); 
    }
};

// --- 4. Exportar la Instancia y la Función de Conexión ---
module.exports = {
    sequelize, // Exportamos la instancia para definir modelos
    connectDB  // Exportamos la función para iniciar la conexión
};