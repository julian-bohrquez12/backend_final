// src/controllers/todo.controller.js
const Todo = require('../models/Todo');

// CREATE
exports.createTodo = async (req, res) => {
    try {
        const { Title, Description, Status } = req.body;

        if (!Title) return res.status(400).json({ message: "El campo Title es obligatorio." });

        const newTodo = await Todo.create({
            Title,
            Description,
            Status: Status || 'pending'
        });

        res.status(201).json(newTodo);

    } catch (error) {
        console.error("❌ Error al crear Todo:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// READ ALL
exports.getAllTodos = async (req, res) => {
    try {
        const { status } = req.query;

        const options = {};
        if (status) options.where = { Status: status };

        const todos = await Todo.findAll(options);

        res.status(200).json(todos);

    } catch (error) {
        console.error("❌ Error al obtener todos:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// READ BY ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo)
            return res.status(404).json({ message: "Todo no encontrado." });

        res.status(200).json(todo);

    } catch (error) {
        console.error("❌ Error al obtener Todo:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// UPDATE
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo)
            return res.status(404).json({ message: "Todo no encontrado." });

        await todo.update(req.body);

        res.status(200).json({ message: "Todo actualizado correctamente." });

    } catch (error) {
        console.error("❌ Error al actualizar todo:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// DELETE
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo)
            return res.status(404).json({ message: "Todo no encontrado." });

        await todo.destroy();

        res.status(204).send(); // Sin contenido

    } catch (error) {
        console.error("❌ Error al eliminar todo:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
