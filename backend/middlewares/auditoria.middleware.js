import { registrarAuditoria } from "../models/auditoria.model.js";

export const auditar = (accion, descripcion) => {
  return async (req, res, next) => {
    try {
      const usuarioId = req.user?.id;
      const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      // módulo opcional derivado de la acción
      const modulo = accion.split(" ")[1] || accion.split(" ")[0];

      await registrarAuditoria(usuarioId, accion, descripcion, ip, modulo);
    } catch (error) {
      console.error("Error al registrar auditoría:", error);
    }
    next();
  };
};
