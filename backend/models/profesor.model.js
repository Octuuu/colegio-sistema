import pool from '../config/db.js';
import { createUser } from './usuario.model.js';

// todos los profes
export const getAllProfes = async () => {
  const [rows] = await pool.query('SELECT * FROM profesores');
  return rows;
};

// profe por ID
export const getProfeById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM profesores WHERE id = ?', [id]);
  return rows[0];
};

// crear profe y su cuenta de usuario
export const createProfe = async ({ nombre, apellido, telefono, correo, cedula, direccion }) => {
  const emailUsuario = `${cedula}@correo.com`;
  const password = cedula.split('').reverse().join('') + '.';

  // 1. Insertar profe (estado por defecto = 1)
  const [result] = await pool.query(
    'INSERT INTO profesores (nombre, apellido, telefono, correo, cedula, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, 1)',
    [nombre, apellido, telefono, correo, cedula, direccion]
  );

  const profeId = result.insertId;

  // 2. Crear usuario vinculado
  await createUser({ gmail: emailUsuario, password, rol_id: 2, profesor_id: profeId });

  return profeId;
};

// Actualizar profe (con estado)
export const updateProfe = async (id, { nombre, apellido, telefono, correo, cedula, direccion, estado }) => {
  await pool.query(
    'UPDATE profesores SET nombre = ?, apellido = ?, telefono = ?, correo = ?, cedula = ?, direccion = ?, estado = ? WHERE id = ?',
    [nombre, apellido, telefono, correo, cedula, direccion, estado, id]
  );
};

// Eliminar profe (borrado lógico -> estado = 0)
export const deleteProfe = async (id) => {
  await pool.query('UPDATE profesores SET estado = 0 WHERE id = ?', [id]);
};

// obtener alumnos de la materia que dicta el profe
export const getAlumnosByMateriaProfesor = async (materiaId, profesorId) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id AS alumno_id, a.nombre, a.apellido, c.anio, c.bachillerato AS curso
       FROM materias_curso mc
       JOIN alumnos a ON mc.curso_id = a.curso_id
       JOIN cursos c ON a.curso_id = c.id
       WHERE mc.materia_id = ? AND mc.profesor_id = ?`,
      [materiaId, profesorId]
    );
    return rows;
  } catch (error) {
    console.error("Error en getAlumnosByMateriaProfesor:", error);
    throw error;
  }
};

// obtener los alumnos del profe y la asistencia de cada uno
export const getAlumnosMateriaConAsistencia = async (profesorId, materiaId, fecha) => {
  const [rows] = await pool.query(
    `SELECT a.id AS alumno_id, a.nombre, a.apellido,
            c.id AS curso_id, c.anio, c.bachillerato,
            m.id AS materia_id, m.nombre AS materia,
            IFNULL(asist.presente, NULL) AS presente
     FROM materias_curso mc
     JOIN cursos c ON mc.curso_id = c.id
     JOIN alumnos a ON a.curso_id = c.id
     JOIN materias m ON mc.materia_id = m.id
     LEFT JOIN asistencias asist
        ON asist.alumno_id = a.id
       AND asist.materia_id = m.id
       AND asist.fecha = ?
     WHERE mc.profesor_id = ?
       AND mc.materia_id = ?`,
    [fecha, profesorId, materiaId]
  );

  return rows;
};
