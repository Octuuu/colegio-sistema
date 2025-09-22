import {
  getAllAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  getCursoYMateriasDeAlumno,
} from '../models/alumno.model.js';

// Obtener todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await getAllAlumnos();
    res.json(alumnos);
  } catch (error) {
    console.error('❌ Error al obtener alumnos:', error);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
};

// Obtener un alumno por ID
export const getAlumno = async (req, res) => {
  try {
    const alumno = await getAlumnoById(req.params.id);
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (error) {
    console.error('❌ Error al obtener alumno:', error);
    res.status(500).json({ error: 'Error al obtener alumno' });
  }
};

// Crear nuevo alumno
export const createAlumnoHandler = async (req, res) => {
  try {
    const { nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email } = req.body;

    if (!nombre || !apellido || !cedula) {
      return res.status(400).json({ error: 'Nombre, apellido y cédula son obligatorios' });
    }

    const id = await createAlumno({ nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email });
    res.status(201).json({ id, message: 'Alumno y usuario creados correctamente' });
  } catch (error) {
    console.error('❌ Error en createAlumnoHandler:', error);
    res.status(500).json({ error: 'Error al crear alumno' });
  }
};

// Actualizar alumno
export const updateAlumnoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email } = req.body;

    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Nombre y apellido son obligatorios' });
    }

    await updateAlumno(id, { nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email });
    res.json({ message: 'Alumno actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar alumno:', error.sqlMessage || error);
    res.status(500).json({ error: 'Error al actualizar alumno' });
  }
};

// Eliminar alumno
export const deleteAlumnoHandler = async (req, res) => {
  try {
    await deleteAlumno(req.params.id);
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar alumno:', error);
    res.status(500).json({ error: 'Error al eliminar alumno' });
  }
};

// obtener curso y materia de alumno por ID
export const getCursoConMaterias = async (req, res) => {
  try {
    const alumnoId = req.params.id;
    const curso = await getCursoYMateriasDeAlumno(alumnoId);

    if (!curso) return res.status(404).json({ error: 'Alumno o curso no encontrado' });
    res.json(curso);
  } catch (error) {
    console.error('❌ Error al obtener curso y materias:', error);
    res.status(500).json({ error: 'Error al obtener curso y materias' });
  }
};

// obtener curso y materias del alumno logueado
export const getCursoConMateriasAlumno = async (req, res) => {
  try {
    const alumnoId = req.user.alumno_id;
    if (!alumnoId) {
      return res.status(403).json({ error: 'Este usuario no está asociado a un alumno' });
    }

    const curso = await getCursoYMateriasDeAlumno(alumnoId);
    if (!curso) {
      return res.status(404).json({ error: 'No se encontraron curso ni materias' });
    }

    res.json(curso);
  } catch (error) {
    console.error('❌ Error al obtener curso y materias del alumno logueado:', error);
    res.status(500).json({ error: 'Error al obtener curso y materias' });
  }
};
