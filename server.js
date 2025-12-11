require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectDB } = require('./src/config/db.js');

// Importar rutas
const userRoutes = require('./src/routers/user.Routes.js');
const todoRoutes = require('./src/routers/todo.Routes.js');
const rolesRoutes = require('./src/routers/roles.Routes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/roles', rolesRoutes);

// Función para iniciar la aplicación
const startApp = async () => {
    try {
        console.log('⏳ Iniciando conexión a la base de datos...');

        await connectDB(); // Conectar DB

        app.listen(PORT, () => {
            console.log('✅ Servidor Express iniciado y escuchando en http://localhost:' + PORT);
            console.log('API LISTA');
        });

    } catch (error) {
        console.error('🚨 ERROR AL INICIAR LA APLICACIÓN:');
        console.error(error.message);
        process.exit(1);
    }
};

// Llamar a la función de inicio
startApp();


