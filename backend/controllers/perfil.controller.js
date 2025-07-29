import { obtenerPerfilPorUsuario } from "../models/perfil.model.js";

export const obtenerPerfil = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const rolId = req.user.rol_id;

    const perfil = await obtenerPerfilPorUsuario(usuarioId, rolId);

    if (!perfil) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }

    res.json(perfil);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
};
