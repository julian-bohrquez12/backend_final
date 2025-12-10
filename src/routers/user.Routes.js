// src/routers/user.Routes.js

const express = require('express');
const router = express.Router();

// 1. IMPORTACIÓN CORREGIDA FINAL (Apuntando a user.controller.js)
const userController = require('../controllers/user.controller.js'); 

// MAPEO DE RUTAS
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;