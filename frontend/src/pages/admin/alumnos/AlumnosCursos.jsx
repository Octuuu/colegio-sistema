import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext.js';
import { obtenerCurso } from '../../../services/cursoService.js';
import ListaGenerica from '../../../components/ListaGenerica.jsx';

const AlumnosCursos = () => {
  const { token } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState(null);

  const cargarCursos = useCallback(async () => {
    try {
      const data = await obtenerCurso(token);
      setCursos(data);
    } catch (err) {
      console.error('Error al obtener cursos:', err);
      setError('Error al cargar cursos');
    }
  }, [token]);

  useEffect(() => {
    cargarCursos();
  }, [cargarCursos]);

  const columns = [
    { key: 'anio', label: 'Año', render: (v) => `${v}°` },
    { key: 'bachillerato', label: 'Nombre del curso' },
  ];

  const handleVerAlumnos = (curso, navigate) => {
    navigate(`/admin/inscripcionesList/${curso.id}`);
  };

  return (
    <ListaGenerica
      title="Alumnos de cada curso"
      columns={columns}
      data={cursos}
      error={error}
      onCloseError={() => setError(null)}
      onActionClick={handleVerAlumnos}
    />
  );
};

export default AlumnosCursos;
