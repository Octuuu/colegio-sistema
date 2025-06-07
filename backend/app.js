import express from 'express';
import authRoutes from './routes/auth.routes.js';
import rolRoutes from './routes/rol.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import alumnoRoutes from './routes/alumno.routes.js'
import profeRoutes from './routes/profesor.routes.js';
import materiaRoutes from './routes/materia.routes.js';
import cursoRoutes from './routes/curso.routes.js'

const app = express();

app.use(express.json());

// rutas publicas
app.use('/api/auth', authRoutes);

// rutas protegidas
app.use('/api/roles', rolRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/profesor', profeRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/cursos', cursoRoutes)

// Manejo de errores
app.use(errorHandler);

export default app;