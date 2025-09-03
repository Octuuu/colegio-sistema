import express from "express";
import { registrarCalificacionHandler, verCalificacionesAlumnoHandler } from "../controllers/calificacion.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Roles permitidos
const rolesProfesorAdmin = ["profesor", "admin"];
const rolesAlumno = ["alumno"];

// Registrar calificación → solo profesor o admin
router.post("/", authenticate, authorize(rolesProfesorAdmin), registrarCalificacionHandler);

// Ver calificaciones
// Alumno puede ver sus calificaciones
router.get("/mis-calificaciones", authenticate, authorize(rolesAlumno), verCalificacionesAlumnoHandler);
// Admin y profesor pueden ver de cualquier alumno
router.get("/:id", authenticate, authorize(rolesProfesorAdmin), verCalificacionesAlumnoHandler);

export default router;
