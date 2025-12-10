// Nota: 'db' sería tu conexión real a la base de datos (ej. MySQL, PostgreSQL, etc.)

const db = { 
    query: (sql, params) => { 
        // Lógica real de la base de datos (simulado)
        if (sql.includes("INSERT")) return { success: true, insertId: 42 }; 
        if (sql.includes("SELECT")) return { success: true, rows: [] }; 
        if (sql.includes("UPDATE") || sql.includes("DELETE")) return { success: true, affectedRows: 1 }; 
        return { success: false };
    } 
};

// ----------------------------------------------------
// A. CREATE (POST /todos)
// ----------------------------------------------------
exports.createTodo = async (req, res) => {
    try {
        const { Title, Description, Status } = req.body;

        // Validar restricción de la tabla: Title es NOT NULL
        if (!Title || Title.trim() === "") {
            return res.status(400).json({ 
                message: "El campo 'Title' es obligatorio y no puede estar vacío." 
            });
        }

        // Aplicar valor por defecto de la tabla: Status es 'pending' por defecto
        const finalStatus = Status || 'pending'; 

        // Consulta SQL para insertar
        const sql = `
            INSERT INTO Todos (Title, Description, Status) 
            VALUES (?, ?, ?)
        `;
        
        const params = [Title, Description, finalStatus];

        const result = await db.query(sql, params);

        // Retornar la tarea creada (idealmente se recupera el objeto completo con su Id)
        const newTodoId = result.insertId;
        
        // Simulación de la respuesta con los datos de la DB
        res.status(201).json({
            Id: newTodoId,
            Title: Title,
            Description: Description || null,
            Status: finalStatus,
            Created_at: new Date().toISOString()
        });

    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// ----------------------------------------------------
// B. READ (GET /todos)
// ----------------------------------------------------
exports.getAllTodos = async (req, res) => {
    try {
        // Obtener el filtro 'status' si existe (parámetros de Query)
        const { status } = req.query; 

        let sql = 'SELECT Id, Title, Status, Created_at, Description FROM Todos';
        const params = [];

        // Lógica de filtrado coherente con el campo ENUM 'Status'
        if (status) {
            sql += ' WHERE Status = ?';
            params.push(status);
        }

        const result = await db.query(sql, params);
        
        res.status(200).json(result.rows); // Devuelve el array de tareas

    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// ----------------------------------------------------
// C. UPDATE (PATCH /todos/:id)
// ----------------------------------------------------
exports.updateTodo = async (req, res) => {
    // Lógica para construir la consulta UPDATE dinámicamente
    // y validar que el ID exista.
    // ...
    // Después de actualizar con éxito:
    // res.status(200).json({ message: "Tarea actualizada exitosamente" });
};

// ----------------------------------------------------
// D. DELETE (DELETE /todos/:id)
// ----------------------------------------------------
exports.deleteTodo = async (req, res) => {
    // Obtener el ID de la ruta
    // const todoId = req.params.id; 
    
    // Lógica para ejecutar DELETE FROM Todos WHERE Id = ?
    // ...
    // Si se elimina con éxito:
    // res.status(204).send(); // No Content
};

// ----------------------------------------------------
// E. READ BY ID (GET /todos/:id)
// ----------------------------------------------------
exports.getTodoById = async (req, res) => {
    // Obtener el ID de la ruta
    // const todoId = req.params.id; 
    
    // Lógica para ejecutar SELECT * FROM Todos WHERE Id = ?
    // ...
    // Si se encuentra:
    // res.status(200).json(tarea_encontrada);
    // Si NO se encuentra:
    // res.status(404).json({ message: "Tarea no encontrada." });
};

// ... (Toda la definición de tus funciones de controlador) ...

// ----------------------------------------------------
// E. READ BY ID (GET /todos/:id)
// ----------------------------------------------------
exports.getTodoById = async (req, res) => {
    // ...
};


// ¡¡¡LÍNEA FALTANTE CRUCIAL!!!
module.exports = {
    createTodo: exports.createTodo,
    getAllTodos: exports.getAllTodos,
    updateTodo: exports.updateTodo,
    deleteTodo: exports.deleteTodo,
    getTodoById: exports.getTodoById
};