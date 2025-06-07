import jwt from 'jsonwebtoken';
import { findUserByCredentials } from '../models/usuario.model.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, rol_id: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};