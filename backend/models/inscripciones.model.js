import pool from '../config/db.js';

export const crearInscripcion = async (alumnoId, cursoId, anioLectivo) => {
    const [result] = await pool.query(
        `INSERT INTO inscripciones (alumno_id, curso_id, anio_lectivo, fecha_inscripcion)
        VALUES (?, ?, ?, NOW())`,
    [alumnoId, cursoId, anioLectivo]
    );

    return result.insertId;
}

export const obtenerInscripcionesPorAlumno = async (alumnoId) => {
    const [rows] = await pool.query(
        `SELECT i.id, i.curso_id, c.anio, c.bachillerato, i.anio_lectivo, i.fecha_inscripcion
        FROM inscripciones i
        JOIN cursos c ON i.curso_id = c.id
        WHERE i.alumno_id = ?`,
    [alumnoId]
    );
    return rows;
}

export const obtenerAlumnosPorCurso = async (cursoId) => {
    const [rows] = await pool.query(
    `SELECT a.id, a.nombre, a.apellido, a.email
     FROM inscripciones i
     JOIN alumnos a ON i.alumno_id = a.id
     WHERE i.curso_id = ?`,
    [cursoId]
  );
  return rows;
}

export const eliminarInscripcion = async (inscripcionId) => {
    await pool.query(
        'DELETE FROM inscripciones WHERE id = ?',
        [inscripcionId]
    );
    return result.affectedRows;
}

