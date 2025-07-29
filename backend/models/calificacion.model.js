import pool from "../config/db.js";

// registrar calificacion
export const registrarCalificacion = async ({ alumno_id, materia_id, tipo_evaluacion, nota }) => {
    const [result] = await pool.query(
        'INSERT INTO calificaciones (alumno_id, materia_id, tipo_evaluacion, nota) VALUES (?,?,?,?)',
        [alumno_id, materia_id, tipo_evaluacion, nota]
    );

    return result.insertId;
};

// obtener califcacion por alumno
export const obtenerCalificacionPorAlumno = async (alumno_id) => {
  const [rows] = await pool.query(`
    SELECT 
      c.alumno_id,
      a.nombre,
      a.apellido,
      m.nombre AS materia,
      c.fecha,
      c.tipo_evaluacion,
      c.nota
    FROM
      calificaciones c
      INNER JOIN alumnos a ON c.alumno_id = a.id
      INNER JOIN materias m ON c.materia_id = m.id
    WHERE 
      a.id = ?
    ORDER BY materia DESC
  `, [alumno_id]);

  return rows;
};  

// validar si el alumno corresponde al profesor 
export const profesorDictaAlumno = async (profesor_id, alumno_id) => {
  const [rows] = await pool.query(`
    SELECT 1
    FROM alumnos a
    JOIN materias_curso mc ON a.curso_id = mc.curso_id
    WHERE a.id = ? AND mc.profesor_id = ?
    LIMIT 1
  `, [alumno_id, profesor_id]);

  return rows.length > 0;
};

// validar si el profesor dicta esa materia
export const profesorDictaMateria = async (profesor_id, materia_id) => {
  const [rows] = await pool.query(`
    SELECT 1
    FROM materias_curso
    WHERE profesor_id = ? AND materia_id = ?
    LIMIT 1
  `, [profesor_id, materia_id]);

  return rows.length > 0;
};
