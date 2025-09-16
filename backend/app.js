import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import rolRoutes from './routes/rol.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import alumnoRoutes from './routes/alumno.routes.js'
import profeRoutes from './routes/profesor.routes.js';
import materiaRoutes from './routes/materia.routes.js';
import cursoRoutes from './routes/curso.routes.js'
import asistenciaRoutes from './routes/asistencia.routes.js';
import calificacionRoutes from './routes/calificacion.routes.js';
import perfilRoutes from "./routes/perfil.routes.js";
import asignacionesRoutes from './routes/asignaciones.routes.js';
import inscripcionesRoutes from './routes/inscripciones.routes.js';
import matriculaRoutes from './routes/matricula.routes.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// rutas publicas
app.use('/api/auth', authRoutes);

// rutas protegidas
app.use('/api/roles', rolRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/profesor', profeRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/cursos', cursoRoutes)
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/calificacion', calificacionRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/asignaciones', asignacionesRoutes);
app.use('/api/matriculas', matriculaRoutes);
// manejo de errores
app.use(errorHandler);

export default app;