const express = require('express');
const router = express.Router(); 
const todoController = require('../controllers/todo.controller'); // Importa la lógica de negocio

// 

// ----------------------------------------------------
// RUTAS PARA EL RECURSO /todos
// ----------------------------------------------------

// 1. POST /todos (Crear una nueva tarea)
router.post('/', todoController.createTodo);

// 2. GET /todos (Listar todas las tareas)
//    GET /todos?status=pending (Listar filtrando por estado)
router.get('/', todoController.getAllTodos);

// 3. GET /todos/:id (Leer una tarea específica)
router.get('/:id', todoController.getTodoById);

// 4. PATCH /todos/:id (Actualizar campos específicos de una tarea)
router.patch('/:id', todoController.updateTodo);

// 5. DELETE /todos/:id (Eliminar una tarea)
router.delete('/:id', todoController.deleteTodo);

 module.exports = router;