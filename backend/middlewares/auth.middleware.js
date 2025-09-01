import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token);

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);

    // 🔹 Obtener datos básicos desde la tabla usuarios
    const [userRows] = await pool.query(
      `SELECT id AS usuario_id, rol_id, profesor_id, alumno_id
       FROM usuarios
       WHERE id = ?`,
      [decoded.id]
    );

    const user = userRows[0];
    console.log('Usuario desde usuarios:', user);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // 🔹 Guardar datos en req.user
    req.user = {
      id: user.usuario_id,
      rol_id: user.rol_id,
      profesor_id: user.profesor_id || null,
      alumno_id: user.alumno_id || null,
    };

    console.log('req.user final:', req.user);

    next();
  } catch (error) {
    console.log('Error authenticate:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

export const authorize = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      console.log('Usuario en authorize:', req.user);

      const [rolRows] = await pool.query(
        'SELECT nombre FROM roles WHERE id = ?',
        [req.user.rol_id]
      );

      console.log('Rol de la base de datos:', rolRows[0]);

      const rolNombre = rolRows[0]?.nombre.toLowerCase();
      console.log('Rol normalizado:', rolNombre);

      if (!rolesPermitidos.map(r => r.toLowerCase()).includes(rolNombre)) {
        console.log('Acceso denegado');
        return res.status(403).json({ error: 'Acceso no autorizado para tu rol' });
      }

      next();
    } catch (error) {
      console.log('Error authorize:', error);
      res.status(500).json({ error: error.message });
    }
  };
};
