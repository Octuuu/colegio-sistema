import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const [user] = await pool.query(
      'SELECT id, rol_id FROM usuarios WHERE id = ?',
      [decoded.id]
    );

    if (!user[0]) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = user[0];
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

export const authorize = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      const [rol] = await pool.query(
        'SELECT nombre FROM roles WHERE id = ?',
        [req.user.rol_id]
      );

      if (!rolesPermitidos.includes(rol[0]?.nombre)) {
        return res.status(403).json({ error: 'Acceso no autorizado para tu rol' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};