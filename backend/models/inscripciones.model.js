import pool from '../config/db.js';

// Crear inscripción
export const crearInscripcion = async (alumnoId, cursoId, anioLectivo) => {
    // Verificar si ya existe la inscripción
    const [existe] = await pool.query(
        `SELECT id FROM inscripciones 
         WHERE alumno_id = ? AND curso_id = ? AND anio_lectivo = ?`,
        [alumnoId, cursoId, anioLectivo]
    );

    if (existe.length > 0) {
        throw new Error('El alumno ya está inscrito en este curso para el año lectivo indicado');
    }

    const [result] = await pool.query(
        `INSERT INTO inscripciones (alumno_id, curso_id, anio_lectivo, fecha_inscripcion)
         VALUES (?, ?, ?, NOW())`,
        [alumnoId, cursoId, anioLectivo]
    );

    return result.insertId;
};

// Obtener inscripciones de un alumno
export const obtenerInscripcionesPorAlumno = async (alumnoId) => {
    const [rows] = await pool.query(
        `SELECT i.id, i.curso_id, c.anio, c.bachillerato, i.anio_lectivo, i.fecha_inscripcion
         FROM inscripciones i
         JOIN cursos c ON i.curso_id = c.id
         WHERE i.alumno_id = ?`,
        [alumnoId]
    );
    return rows;
};

// Obtener alumnos de un curso
export const obtenerAlumnosPorCurso = async (cursoId) => {
    const [rows] = await pool.query(
        `SELECT a.id, a.nombre, a.apellido, a.email
         FROM inscripciones i
         JOIN alumnos a ON i.alumno_id = a.id
         WHERE i.curso_id = ?`,
        [cursoId]
    );
    return rows;
};

// Eliminar inscripción
export const eliminarInscripcion = async (inscripcionId) => {
    const [result] = await pool.query(
        'DELETE FROM inscripciones WHERE id = ?',
        [inscripcionId]
    );
    return result.affectedRows;
};

// Obtener todas las inscripciones
export const obtenerTodasInscripciones = async () => {
  const [rows] = await pool.query(
    `SELECT i.id, i.alumno_id, a.nombre, a.apellido, i.curso_id, c.anio, c.bachillerato,
            i.anio_lectivo, i.fecha_inscripcion
     FROM inscripciones i
     JOIN alumnos a ON i.alumno_id = a.id
     JOIN cursos c ON i.curso_id = c.id
     ORDER BY i.fecha_inscripcion DESC`
  );
  return rows;
};

// dar de baaj
export const darDeBajaInscripcion = async (inscripcionId) => {
  const [result] = await pool.query(
    'UPDATE inscripciones SET estado = "inactivo" WHERE id = ?',
    [inscripcionId]
  );
  return result.affectedRows;
};

// reactivar inscripcion
export const reactivarInscripcion = async (inscripcionId) => {
  const [result] = await pool.query(
    'UPDATE inscripciones SET estado = "activo" WHERE id = ?',
    [inscripcionId]
  );
  return result.affectedRows;
};