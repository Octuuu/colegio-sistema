import pool from "../config/db.js";

// registrar auditoría
export const registrarAuditoria = async (usuarioId, accion, descripcion, ip, modulo = null) => {
  // si no se pasa módulo, derivamos del primer "palabra" de la acción
  if (!modulo && accion) {
    modulo = accion.split(" ")[1] || accion.split(" ")[0];
  }

  await pool.query(
    `INSERT INTO auditoria (usuario_id, accion, descripcion, ip_usuario, modulo)
     VALUES (?, ?, ?, ?, ?)`,
    [usuarioId, accion, descripcion, ip || null, modulo]
  );
};

// obtener auditorías (solo usuarios con gmail)
export const obtenerAuditorias = async (filters = {}) => {
  let query = `
    SELECT 
      a.id, 
      a.accion, 
      a.descripcion, 
      a.ip_usuario, 
      a.fecha,
      u.gmail AS usuario_nombre
    FROM auditoria a
    LEFT JOIN usuarios u ON a.usuario_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.usuario) {
    query += " AND u.gmail LIKE ?";
    params.push(`%${filters.usuario}%`);
  }

  if (filters.evento) {
    query += " AND a.accion LIKE ?";
    params.push(`%${filters.evento}%`);
  }

  query += " ORDER BY a.fecha DESC";

  const [rows] = await pool.query(query, params);
  return rows;
};

// obtener auditoría por ID
export const obtenerAuditoriaPorId = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      a.*, 
      u.gmail AS usuario_nombre
    FROM auditoria a
    LEFT JOIN usuarios u ON a.usuario_id = u.id
    WHERE a.id = ?
    `,
    [id]
  );
  return rows[0];
};
