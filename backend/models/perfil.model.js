import pool from "../config/db.js";

export const obtenerPerfilPorUsuario = async (usuarioId, rolId) => {
  let query;
  const params = [usuarioId];

  if (rolId === 3) {
    // Alumno
    query = `
    SELECT 
        u.id AS usuario_id,
        u.gmail AS email,
        r.nombre AS rol,
        a.id AS alumno_id,
        a.nombre,
        a.apellido,
        a.cedula,
        a.fecha_nacimiento,
        a.direccion,
        a.telefono,
        a.email AS email_alumno,
        a.curso_id AS curso_id
    FROM usuarios u
    JOIN roles r ON u.rol_id = r.id
    JOIN alumnos a ON u.alumno_id = a.id
    WHERE u.id = ?
    `;

  } else if (rolId === 2) {
    // Profesor
    query = `
        SELECT 
            u.id AS usuario_id,
            u.gmail AS email,
            r.nombre AS rol,
            p.id AS profesor_id,
            p.nombre,
            p.apellido,
            p.cedula,
            p.direccion,
            p.telefono,
            p.correo AS email_profesor
        FROM usuarios u
        JOIN roles r ON u.rol_id = r.id
        JOIN profesores p ON u.profesor_id = p.id
        WHERE u.id = ?
        `;

  } else {
    // Admin
    query = `
        SELECT 
            u.id AS usuario_id,
            u.gmail AS email,
            r.nombre AS rol
        FROM usuarios u
        JOIN roles r ON u.rol_id = r.id
        WHERE u.id = ?
        `;
  }

  const [rows] = await pool.query(query, params);
  return rows[0];
};
