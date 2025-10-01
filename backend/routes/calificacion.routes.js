import express from "express";
import { registrarCalificacionHandler, verCalificacionesAlumnoHandler } from "../controllers/calificacion.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

const rolesProfesorAdmin = ["profesor", "admin"];
const rolesAlumno = ["alumno"];

router.post("/", authenticate, authorize(rolesProfesorAdmin), registrarCalificacionHandler);
router.get("/mis-calificaciones", authenticate, authorize(rolesAlumno), verCalificacionesAlumnoHandler);
router.get("/:id", authenticate, authorize(rolesProfesorAdmin), verCalificacionesAlumnoHandler);

export default router;
