const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');

// Ruta para CREAR un nuevo rol (POST /roles)
router.post('/', rolesController.createRole);

// Ruta para OBTENER todos los roles (GET /roles)
router.get('/', rolesController.getAllRoles);

// Puedes seguir añadiendo rutas (GET /:id, PUT /:id, DELETE /:id)

module.exports = router;