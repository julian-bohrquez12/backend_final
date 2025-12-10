// server.js (Archivo en la RAÍZ)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// 1. IMPORTACIÓN CORREGIDA para la estructura real (src/routers/user.Routes.js)
const userRoutes = require('./src/routers/user.Routes.js'); 
const todoRoutes = require('./src/routers/todo.Routes.js'); 
const rolesRoutes = require('./src/routers/roles.Routes.js'); 
const app = express();
const PORT = process.env.PORT || 5000; 

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// 2. ENDPOINT CORREGIDO (URL limpia: /api/usuarios)
app.use('/api/user', userRoutes); 
app.use('/api/todo', todoRoutes); 
app.use('/api/roles', rolesRoutes); 

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`✅ Servidor Express iniciado y escuchando en: http://localhost:${PORT}`);
    console.log('API LISTA ');
});