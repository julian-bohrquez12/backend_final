// server.js (o app.js)

// ...
const express = require('express');
const app = express();
// ...

// 1. Importa el archivo de rutas de usuarios
const userRoutes = require('./routes/userRoutes'); 

// 2. Conecta el router a un prefijo de API
// Aquí le dices a Express: "Todo lo que empiece con /api/usuarios, mándalo a userRoutes."
app.use('/api/usuarios', userRoutes); 

// ...

app.listen(PORT, () => {
    console.log(`🚀 Servidor Express ejecutándose en: http://localhost:${PORT}`);
    console.log(`Prueba el endpoint de recursos: http://localhost:${PORT}/api/recursos`);
});