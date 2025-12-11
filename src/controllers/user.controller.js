// src/controllers/user.controller.js
const User = require('../models/User');

// CREATE
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "Usuario creado correctamente.",
            data: newUser
        });

    } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// READ ALL
exports.getAllUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['Password'] }
    });

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
};

// READ BY ID
exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['Password'] }
    });

    if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });

    res.status(200).json({ success: true, data: user });
};

// UPDATE
exports.updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });

    await user.update(req.body);

    res.status(200).json({
        success: true,
        message: "Usuario actualizado."
    });
};

// DELETE
exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });

    await user.destroy();

    res.status(200).json({
        success: true,
        message: "Usuario eliminado."
    });
};