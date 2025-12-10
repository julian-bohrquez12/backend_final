// src/controllers/user.controller.js
const UserModel = require('../models/UserData'); // Importa la simulación de DB

// 1. CREAR (POST)
const createUser = (req, res) => {
    try {
        const newUser = UserModel.create(req.body); 
        res.status(201).json({ success: true, message: 'Usuario creado (Simulado)', data: newUser });
    } catch (error) {
         res.status(500).json({ success: false, message: 'Error en la simulación.' });
    }
};

// 2. OBTENER TODOS (GET)
const getAllUsers = (req, res) => {
    const users = UserModel.findAll();
    res.status(200).json({ success: true, count: users.length, data: users });
};

// 3. OBTENER POR ID (GET)
const getUserById = (req, res) => {
    const user = UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    res.status(200).json({ success: true, data: user });
};

// 4. ACTUALIZAR (PUT)
const updateUser = (req, res) => {
    const updatedUser = UserModel.update(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    res.status(200).json({ success: true, message: 'Usuario actualizado.', data: updatedUser });
};

// 5. ELIMINAR (DELETE)
const deleteUser = (req, res) => {
    const success = UserModel.delete(req.params.id);
    if (!success) return res.status(404).json({ success: false, message: 'Usuario no encontrado para eliminar.' });
    res.status(200).json({ success: true, message: 'Usuario eliminado.' });
};

// 6. EXPORTACIÓN OBLIGATORIA
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};