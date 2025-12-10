// src/models/UserData.js
// SIMULACIÓN DE LA TABLA USUARIOS CON DATOS EN MEMORIA

let users = [
    { Id: 1, Username: 'admin_test', Eail: 'admin@test.com', Password: 'pass123', Role_Id: 1 },
    { Id: 2, Username: 'user_regular', Eail: 'regular@user.com', Password: 'pass456', Role_Id: 2 }
];

let nextId = 3;

const db = {
    // Simula SELECT * FROM Usuarios
    findAll: () => users.map(u => { 
        const { Password, ...rest } = u; 
        return rest; // Nunca devuelve la contraseña
    }),
    
    // Simula SELECT * FROM Usuarios WHERE Id = ?
    findById: (id) => {
        const user = users.find(u => u.Id == id);
        if (user) {
            const { Password, ...rest } = user;
            return rest;
        }
        return null;
    },
    
    // Simula INSERT INTO Usuarios (...)
    create: (userData) => {
        const newUser = { 
            Id: nextId++,
            ...userData,
            Created_at: new Date().toISOString().slice(0, 10)
        };
        users.push(newUser);
        const { Password, ...rest } = newUser;
        return rest;
    },
    
    // Simula UPDATE Usuarios SET ... WHERE Id = ?
    update: (id, updates) => {
        const index = users.findIndex(u => u.Id == id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...updates };
        const { Password, ...rest } = users[index];
        return rest;
    },
    
    // Simula DELETE FROM Usuarios WHERE Id = ?
    delete: (id) => {
        const initialLength = users.length;
        users = users.filter(u => u.Id != id);
        return users.length < initialLength;
    }
};

module.exports = db;