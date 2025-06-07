import express from 'express';
import authRoutes from './routes/auth.routes.js';
import rolRoutes from './routes/rol.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import alumnoRoutes from './routes/alumno.routes.js'
import profeRoutes from './routes/profesor.routes.js';
import materiaRoutes from './routes/materia.routes.js';

const app = express();

app.use(express.json());

// rutas publicas
app.use('/api/auth', authRoutes);

// rutas protegidas
app.use('/api/roles', rolRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/profesor', profeRoutes);
app.use('/api/materias', materiaRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;