// server.js (Archivo en la RAÍZ)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// 💡 1. IMPORTAR LA FUNCIÓN DE CONEXIÓN A LA DB
const { connectDB } = require('./db'); 

// IMPORTACIÓN DE RUTAS
const userRoutes = require('./src/routers/user.Routes.js'); 
const todoRoutes = require('./src/routers/todo.Routes.js'); 
const rolesRoutes = require('./src/routers/roles.Routes.js'); 

const app = express();
const PORT = process.env.PORT || 5000; 

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ENDPOINTS
app.use('/api/user', userRoutes); 
app.use('/api/todo', todoRoutes); 
app.use('/api/roles', rolesRoutes); 


// 💡 2. FUNCIÓN ASÍNCRONA PARA INICIAR LA APLICACIÓN
const startApp = async () => {
    try {
        // A. CONECTAR A LA BASE DE DATOS (MySQL vía Sequelize)
        await connectDB();
        
        // B. INICIAR SERVIDOR SOLO SI LA CONEXIÓN ES EXITOSA
        app.listen(PORT, () => {
            console.log(`✅ Servidor Express iniciado y escuchando en: http://localhost:${PORT}`);
            console.log('API LISTA ');
        });

    } catch (error) {
        console.error("🚨 ERROR CRÍTICO AL INICIAR LA APLICACIÓN:");
        console.error(error.message);
        // Terminar el proceso si no se puede conectar a la DB
        process.exit(1); 
    }
};

// 💡 3. LLAMAR A LA FUNCIÓN DE INICIO
startApp();