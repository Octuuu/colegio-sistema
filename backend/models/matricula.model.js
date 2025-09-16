import pool from '../config/db.js';

// Crear pago de matrícula
export const crearMatricula = async (inscripcionId, fechaPago, monto, metodoPago, recibidoPor) => {
    const [result] = await pool.query(
        `INSERT INTO matriculas (matricula_id, fecha_pago, monto, metodo_pago, recibido_por)
         VALUES (?, ?, ?, ?, ?)`,
        [inscripcionId, fechaPago, monto, metodoPago, recibidoPor]
    );
    return result.insertId;
};

// Obtener pagos por matrícula
export const obtenerMatriculasPorInscripcion = async (inscripcionId) => {
    const [rows] = await pool.query(
        `SELECT * FROM matriculas WHERE matricula_id = ? ORDER BY fecha_pago DESC`,
        [inscripcionId]
    );
    return rows;
};

// Obtener todos los pagos
export const obtenerTodosLosPagos = async () => {
    const [rows] = await pool.query(
        `SELECT m.*, a.nombre, a.apellido, c.anio, c.bachillerato
         FROM matriculas m
         JOIN inscripciones i ON m.matricula_id = i.id
         JOIN alumnos a ON i.alumno_id = a.id
         JOIN cursos c ON i.curso_id = c.id
         ORDER BY m.fecha_pago DESC`
    );
    return rows;
};

// Eliminar pago
export const eliminarMatricula = async (pagoId) => {
    const [result] = await pool.query(
        'DELETE FROM matriculas WHERE id = ?',
        [pagoId]
    );
    return result.affectedRows;
};
