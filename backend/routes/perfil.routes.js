import express from "express";
import { obtenerPerfil } from "../controllers/perfil.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, obtenerPerfil);

export default router;
