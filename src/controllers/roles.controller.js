const db = {
    // Simulamos la creación en la DB, asignando un nuevo ID
    createRole: async ({ name, description }) => {
        // Lógica real: INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *;
        const newId = Math.floor(Math.random() * 100) + 5; 
        return { 
            id: newId, 
            name, 
            description 
        };
    },
    getAllRoles: async () => {
        // Lógica real: SELECT * FROM roles;
        return [
            { id: 1, name: 'admin', description: 'Administrador' },
            { id: 2, name: 'user', description: 'Usuario Regular' }
        ];
    }
};


// 1. Lógica para POST /roles (Crear Rol)
exports.createRole = async (req, res) => {
    // 1. Extraer datos del cuerpo de la petición
    const { name, description } = req.body;

    // 2. Validación de coherencia
    if (!name || !description) {
        // Si falta alguno, devuelve 400 Bad Request
        return res.status(400).json({ 
            message: 'Los campos "name" y "description" son obligatorios.' 
        });
    }

    try {
        // 3. Interacción con la Base de Datos
        // NOTA: Aquí deberías añadir una validación para chequear si el 'name' ya existe
        const newRoles = await db.createRoles({ name, description });

        // 4. Respuesta exitosa (201 Created)
        // Devolver el objeto creado
        res.status(201).json(newRole);

    } catch (error) {
        // Manejo de errores de la Base de Datos (e.g., error de unicidad)
        console.error('Error al crear el rol:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al crear el rol.' 
        });
    }
};

// 2. Lógica para GET /roles (Obtener todos los Roles)
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await db.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al obtener los roles.' 
        });
    }
};