import pool from '../config/db.js';
import { createUser } from './usuario.model.js';

// Todos los alumnos
export const getAllAlumnos = async () => {
  const [rows] = await pool.query('SELECT * FROM alumnos');
  return rows;
};

// Alumno por ID
export const getAlumnoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id]);
  return rows[0];
};

// Crear alumno y su cuenta de usuario
export const createAlumno = async ({ nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email }) => {
  const emailUsuario = `${cedula}@correo.com`;
  const password = cedula.split('').reverse().join('') + '.';

  // 1. Insertar alumno
  const [result] = await pool.query(
    'INSERT INTO alumnos (nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email]
  );

  const alumnoId = result.insertId;

  // 2. Crear usuario vinculado
  await createUser({ gmail: emailUsuario, password, rol_id: 3,  alumno_id: alumnoId });

  return alumnoId;
};

// Actualizar alumno
// Actualizar alumno
export const updateAlumno = async (id, { nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email }) => {
  try {
    // Normalizar la fecha a formato YYYY-MM-DD si viene con formato ISO
    let fechaFormateada = null;
    if (fecha_nacimiento) {
      fechaFormateada = new Date(fecha_nacimiento).toISOString().split('T')[0];
    }

    await pool.query(
      'UPDATE alumnos SET nombre = ?, apellido = ?, cedula = ?, fecha_nacimiento = ?, telefono = ?, direccion = ?, email = ? WHERE id = ?',
      [nombre, apellido, cedula, fechaFormateada, telefono, direccion, email, id]
    );
  } catch (error) {
    console.error('❌ Error al actualizar alumno en modelo:', error);
    throw new Error('Error al actualizar alumno');
  }
};


// Eliminar alumno
export const deleteAlumno = async (id) => {
  await pool.query('DELETE FROM alumnos WHERE id = ?', [id]);
};

// obtener curso y materias de alumno 
export const getCursoYMateriasDeAlumno = async (alumnoId) => {
  const [rows] = await pool.query(`
    SELECT 
      c.id AS curso_id,
      c.anio,
      c.bachillerato,
      m.id AS materia_id,
      m.nombre AS materia_nombre,
      m.descripcion AS materia_descripcion
    FROM inscripciones i
    JOIN cursos c ON i.curso_id = c.id
    JOIN materias_curso mc ON c.id = mc.curso_id
    JOIN materias m ON mc.materia_id = m.id
    WHERE i.alumno_id = ?
    ORDER BY i.fecha_inscripcion DESC
  `, [alumnoId]);

  if (rows.length === 0) return null;

  const curso = {
    id: rows[0].curso_id,
    anio: rows[0].anio,
    bachillerato: rows[0].bachillerato,
    materias: rows.map(row => ({
      id: row.materia_id,
      nombre: row.materia_nombre,
      descripcion: row.materia_descripcion
    }))
  };

  return curso;
};


//