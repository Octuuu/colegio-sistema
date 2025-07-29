import pool from "../config/db.js";

// asignacion para materia curso y profesor
export const crearAsignacion = async ({ curso_id, materia_id, profesor_id }) => {
    const [result] = await pool.query(
        'INSERT INTO materias_curso (curso_id, materia_id, profesor_id) VALUES (?, ?, ?)', 
        [curso_id, materia_id, profesor_id]
    );

    return result.insertId;
};

// obtener las asignaciones 
export const obetenerAsignaciones = async () => {
    const [rows] = await pool.query(`
        SELECT 
            mc.id,
            m.nombre AS materia,
            c.nombre AS curso, 
            p.nombre AS profesor
        FROM materias_curso mc
        JOIN materias m ON mc.materia_id = m.id
        JOIN cursos c ON mc.curso_id = c.id
        JOIN profesores p ON mc.profesor_id = p.id
    `);

    return rows;
};

// editar la asignacion 
export const editarAsignacion = async (id, { curso_id, materia_id, profesor_id }) => {
    await pool.query(
        'UPDATE materias_curso SET curso_id = ?, materia_id = ?, profesor = ? WHERE id = ?', 
        [curso_id, materia_id, profesor_id]
    );
};

// eliminar asignacion
export const eliminarAsignacion = async (id) => {
    await pool.query('DELETE FROM materias_curso WHERE id = ?', [id]);
};