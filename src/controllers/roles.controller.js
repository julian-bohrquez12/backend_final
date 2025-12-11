// src/controllers/roles.controller.js
const Role = require('../models/Role');

// POST /roles
exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: 'Los campos "name" y "description" son obligatorios.'
            });
        }

        // Crear rol REAL en MySQL
        const newRole = await Role.create({
            name,
            description
        });

        res.status(201).json(newRole);

    } catch (error) {
        console.error("❌ Error al crear rol:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// GET /roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);

    } catch (error) {
        console.error("❌ Error al obtener roles:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};