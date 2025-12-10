// 1. IMPORTACIONES
const express = require('express');
const cors = require('cors');

// 2. CONFIGURACIÓN Y MIDDLEWARE
const app = express();
const PORT = 10000; // Puerto donde se ejecutará el backend

// Middleware de CORS: Permite peticiones desde dominios diferentes (como tu frontend React en el puerto 3000)
app.use(cors());

// Middleware para parsear JSON: Permite a Express leer datos en formato JSON enviados en el cuerpo (body) de las peticiones (POST, PUT)
app.use(express.json());


// 3. RUTAS (Endpoints de tu API)
// =================================================================

// Ruta Raíz (GET /)
app.get('/', (req, res) => {
    // Envía una respuesta de texto simple
    res.send('¡Servidor Express Funcionando Correctamente!');
});

// Ruta API de Ejemplo (GET /api/recursos)
app.get('/api/recursos', (req, res) => {
    // Ejemplo de datos (normalmente vendrían de una base de datos)
    const data = [
        { id: 1, nombre: 'Recurso A', descripcion: 'Primer elemento' },
        { id: 2, nombre: 'Recurso B', descripcion: 'Segundo elemento' }
    ];
    // Envía la respuesta en formato JSON
    res.json({ 
        mensaje: 'Lista de recursos obtenida con éxito',
        datos: data 
    });
});

// Ruta para recibir datos (POST /api/nuevo)
app.post('/api/nuevo', (req, res) => {
    const nuevoRecurso = req.body; // Los datos enviados por el frontend
    console.log('Recibido nuevo recurso:', nuevoRecurso);

    // Simular el guardado de datos y devolver una respuesta
    res.status(201).json({ 
        mensaje: 'Recurso creado',
        data: nuevoRecurso,
        timestamp: new Date()
    });
});

// 4. LEVANTAMIENTO DEL SERVIDOR
// =================================================================

app.listen(PORT, () => {
    console.log(`🚀 Servidor Express ejecutándose en: http://localhost:${PORT}`);
    console.log(`Prueba el endpoint de recursos: http://localhost:${PORT}/api/recursos`);
});