import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProfesorDashboard from '../pages/profesor/ProfesorDashboard';
import AlumnoDashboard from '../pages/alumno/AlumnoDashboard';
import { ProtectedRoute } from './ProtectedRoute';
import Asistencias from '../pages/profesor/Asistencias';
import Calificaciones from '../pages/profesor/Calificaciones';
import Cursos from '../pages/profesor/Cursos';
import Materias from '../pages/profesor/Materias';
import Alumnos from '../pages/admin/Alumnos';
import AlumnosCursos from '../pages/admin/AlumnosCursos'
import HomeRedirect from '../components/HomeRedirect';
import CreateCourse from '../pages/admin/CreateCourse';
import CreateSubject from '../pages/admin/CreateSubject';
import AsignedSubject from '../pages/admin/AsignedSubject';
import CreateTeacher from '../pages/admin/CreateTeacher';
import MateriasList from '../pages/admin/MateriasList';
import EditarMateria from '../pages/admin/EditMateria';
import EditarAlumno from '../pages/admin/EditAlumno';
import AlumnosList from '../pages/admin/AlumnosList';
import EditarCurso from '../pages/admin/EditCurso';
import CursosList from '../pages/admin/CursosList';
import EditarProfesor from '../pages/admin/EditProfesor';
import ProfesorList from '../pages/admin/ProfesoresList';
import AlumnosAistencia from '../pages/profesor/AlumnosAsistencia';
import ListaMaterias from '../pages/profesor/ListaMaterias';
import ListaAsistencia from '../pages/profesor/ListaAsistencia';
import MateriasListCalif from '../pages/profesor/MateriasListCalif';
import RegistrarCalificacion from '../pages/profesor/RegistrarCalificacion';
import AdminLayout from '../pages/admin/AdminLayout';
import ProfesorLayout from '../pages/profesor/ProfesorLayout';
import InscripcionForm from '../pages/admin/InscripcionForm';
import InscripcionesList from '../pages/admin/InscripcionesList';
import MatriculaForm from '../pages/admin/MatriuclaForm';
import ProveedorForm from '../pages/admin/proveedores/ProveedorForm';
import Proveedores from '../pages/admin/proveedores/Proveedores';
import ProductForm from '../pages/admin/productos/ProductForm';
import Productos from '../pages/admin/productos/Productos';
import ServicioForm from '../pages/admin/servicios/ServicioForm';
import Servicios from '../pages/admin/servicios/Servicios';
import Insumos from '../pages/admin/insumos/Insumos';
import InsumosMovimientos from '../pages/admin/insumos/InsumosMovimientos';
import Ventas from '../pages/admin/ventas/Ventas';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />

      {/* rutas protegidas para admin */}
      <Route element={<ProtectedRoute allowedRoles={[1]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="alumnos" element={<Alumnos />} />
          <Route path="materias" element={<CreateSubject />} />
          <Route path="cursos" element={<CreateCourse />} />
          <Route path="asignarMateria" element={<AsignedSubject />} />
          <Route path="profesor" element={<CreateTeacher />} />
          <Route path="editarProfesor/:id" element={<EditarProfesor />} />
          <Route path="profesorList" element={<ProfesorList />} />
          <Route path="materiasList" element={<MateriasList />} />
          <Route path="editarMaterias/:id" element={<EditarMateria />} />
          <Route path="cursosList" element={<CursosList />} />
          <Route path='alumnosCursos' element={<AlumnosCursos />} />
          <Route path="editarCursos/:id" element={<EditarCurso />} />
          <Route path=":id/alumnos" element={<AlumnosList />} />
          <Route path="editarAlumnos/:id" element={<EditarAlumno />} />
          <Route path="inscribirAlumno/:alumnoId" element={<InscripcionForm />} />
          <Route path="inscripcionesList" element={<InscripcionesList />} />
          <Route path="matriculaForm" element={<MatriculaForm />} />
          <Route path="proveedorForm" element={<ProveedorForm />} />
          <Route path="proveedoresList" element={<Proveedores />} />

          <Route path="productoForm" element={<ProductForm />} />
          <Route path="productos" element={<Productos />} />
          
          <Route path="servicioForm" element={<ServicioForm />} />
          <Route path="servicios" element={<Servicios />} />

          <Route path="insumos" element={<Insumos />} />
          <Route path="insumosMovimientos" element={<InsumosMovimientos />} />


          <Route path="ventas" element={<Ventas />} />
        </Route>
      </Route>

      {/* rutas protegidas para profesor */}
      <Route element=
      {<ProtectedRoute allowedRoles={[2]} />}>
        <Route path="/profesor" element={<ProfesorLayout />}>
          <Route path="/profesor" element={<Navigate to="/profesor/dashboard" replace />} />
          <Route path="/profesor/dashboard" element={<ProfesorDashboard />} />
          <Route path="/profesor/asistencias" element={<Asistencias />} />
          <Route path="/profesor/cursos" element={<Cursos />} />
          <Route path="/profesor/materias" element={<Materias />} />
          <Route path="/profesor/alumnos" element={<Alumnos />} />
          <Route path="/profesor/:materiaId/alumnos" element={<AlumnosAistencia />} />
          <Route path="/profesor/listaMaterias" element={<ListaMaterias />} />
          <Route path="/profesor/materias/:materiaId/historial" element={<ListaAsistencia />} />
          <Route path="/profesor/calificaciones" element={<MateriasListCalif />} />
          <Route path="/profesor/materias/:materiaId/calificaciones/registrar" element={<RegistrarCalificacion />} />
        </Route>
      </Route>

      {/* Rutas protegidas para alumno */}
      <Route element={<ProtectedRoute allowedRoles={[3]} />}>
        <Route path="/alumno" element={<Navigate to="/alumno/dashboard" replace />} />
        <Route path="/alumno/dashboard" element={<AlumnoDashboard />} />
      </Route>

      {/* Ruta no autorizada */}
      <Route path="/unauthorized" element={<h1>No tenés permiso</h1>} />
    </Routes>
  );
}
