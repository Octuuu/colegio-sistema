import express from "express";
import { listarAuditorias, verAuditoria, descargarAuditoriaPDF } from "../controllers/auditoria.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/pdf", authenticate, authorize(["admin"]), descargarAuditoriaPDF);
router.get("/", authenticate, authorize(["admin"]), listarAuditorias);
router.get("/:id", authenticate, authorize(["admin"]), verAuditoria);


export default router;
