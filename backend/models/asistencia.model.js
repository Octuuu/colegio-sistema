import pool from "../config/db.js";

// registrar asistencia
export const registrarAsistencia = async ({ alumno_id, materia_id, fecha, presente }) => {
    const [result] = await pool.query(
        'INSERT INTO asistencias (alumno_id, materia_id, fecha, presente) VALUES (?,?,?,?)', 
        [alumno_id, materia_id, fecha, presente]
    );

    return result.insertId;
};

// obtener asistencias por alumno
export const obtenerAsistenciasPorAlumno = async (alumno_id) => {
    const [rows] = await pool.query(`
        SELECT a.fecha, a.presente, m.nombre AS materia
        FROM asistencias a
        JOIN materias m ON a.materia_id = m.id
        WHERE a.alumno_id = ?
        ORDER BY a.fecha DESC
    `, [alumno_id]);
     
    return rows;
}

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

  console.log("Filas encontradas para dictar materia:", rows);

  return rows.length > 0;
};

// obtener historial de asistencias de los alumnos por materias
export const getHistorialAsistencias = async (profesorId, materiaId) => {
  const [rows] = await pool.query(`
    SELECT 
      a.id AS alumno_id,
      a.nombre,
      a.apellido,
      IFNULL(asist.presente, false) AS presente,
      DATE(asist.fecha) AS fecha
    FROM alumnos a
    JOIN materias_curso mc 
      ON a.curso_id = mc.curso_id 
      AND mc.materia_id = ?
    LEFT JOIN asistencias asist
      ON asist.alumno_id = a.id
      AND asist.materia_id = mc.materia_id
    WHERE mc.profesor_id = ?
    ORDER BY asist.fecha ASC, a.apellido ASC
  `, [materiaId, profesorId]);

  return rows;
};
