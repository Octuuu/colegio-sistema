import pool from "../config/db.js";

/**
 * Registrar una calificación final de un alumno en una materia
 * Se asegura de que el profesor dicte la materia para ese alumno
 */
export const registrarCalificacion = async ({ profesor_id, alumno_id, materia_id, nota }) => {
  // Validar que el profesor dicta esa materia
  const [materiaValida] = await pool.query(`
    SELECT 1
    FROM materias_curso
    WHERE profesor_id = ? AND materia_id = ?
    LIMIT 1
  `, [profesor_id, materia_id]);

  if (materiaValida.length === 0) {
    throw new Error("El profesor no dicta esta materia");
  }

  // Validar que el alumno pertenece al curso del profesor para esa materia
  const [alumnoValido] = await pool.query(`
    SELECT 1
    FROM alumnos a
    JOIN materias_curso mc ON a.curso_id = mc.curso_id
    WHERE a.id = ? AND mc.profesor_id = ? AND mc.materia_id = ?
    LIMIT 1
  `, [alumno_id, profesor_id, materia_id]);

  if (alumnoValido.length === 0) {
    throw new Error("El alumno no pertenece a la materia dictada por el profesor");
  }

  // Registrar la calificación
  const [resultado] = await pool.query(`
    INSERT INTO calificaciones (alumno_id, materia_id, fecha, nota)
    VALUES (?, ?, NOW(), ?)
  `, [alumno_id, materia_id, nota]);

  return resultado.insertId;
};

/**
 * Obtener todas las calificaciones de un alumno
 */
export const obtenerCalificacionesPorAlumno = async (alumno_id) => {
  const [filas] = await pool.query(`
    SELECT 
      c.id,
      c.alumno_id,
      a.nombre,
      a.apellido,
      m.nombre AS materia,
      DATE_FORMAT(c.fecha, '%d/%m/%Y') AS fecha,
      c.nota
    FROM calificaciones c
    INNER JOIN alumnos a ON c.alumno_id = a.id
    INNER JOIN materias m ON c.materia_id = m.id
    WHERE a.id = ?
    ORDER BY c.fecha ASC, m.nombre ASC
  `, [alumno_id]);

  return filas;
};

/**
 * Validar si un alumno pertenece a un profesor
 */
export const alumnoPerteneceProfesor = async (profesor_id, alumno_id) => {
  const [filas] = await pool.query(`
    SELECT 1
    FROM alumnos a
    JOIN materias_curso mc ON a.curso_id = mc.curso_id
    WHERE a.id = ? AND mc.profesor_id = ?
    LIMIT 1
  `, [alumno_id, profesor_id]);

  return filas.length > 0;
};

/**
 * Validar si un profesor dicta cierta materia
 */
export const profesorDictaMateria = async (profesor_id, materia_id) => {
  const [filas] = await pool.query(`
    SELECT 1
    FROM materias_curso
    WHERE profesor_id = ? AND materia_id = ?
    LIMIT 1
  `, [profesor_id, materia_id]);

  return filas.length > 0;
};
