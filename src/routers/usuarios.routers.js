// userRoutes.js

const express = require('express');
const router = express.Router();

// 1. IMPORTAR EL CONTROLADOR
// Apuntamos al archivo que contendrá la lógica de base de datos
const userController = require('../controllers/userController'); 

// =======================================================
// MAPEO DE RUTAS (Endpoints que usará tu aplicación React)
// =======================================================

// 1. CREAR un nuevo Usuario
// Método: POST
// URL que usará Express: /api/usuarios (si lo configuramos así)
router.post('/', userController.createUser);

// 2. OBTENER todos los Usuarios
// Método: GET
// URL que usará Express: /api/usuarios
router.get('/', userController.getAllUsers);

// 3. OBTENER un Usuario por su ID
// Método: GET
// URL que usará Express: /api/usuarios/5
// El ":id" es un parámetro dinámico que capturará el valor.
router.get('/:id', userController.getUserById);

// 4. ACTUALIZAR un Usuario por su ID
// Método: PUT
// URL que usará Express: /api/usuarios/5
router.put('/:id', userController.updateUser);

// 5. ELIMINAR un Usuario por su ID
// Método: DELETE
// URL que usará Express: /api/usuarios/5
router.delete('/:id', userController.deleteUser);

module.exports = router;