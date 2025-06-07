import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import { getUserByCredentials } from '../models/usuario.model.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, rolId: user.rol_id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};