import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { obtenerAlumnosInscritos } from '../../../services/inscripcionesService';
import Modal from '../../../components/Modal.jsx';

const AlumnosPorCurso = ({ cursoId, onClose }) => {
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        const data = await obtenerAlumnosInscritos(cursoId, token);
        setAlumnos(data);
      } catch (err) {
        console.error(err);
        alert('Error al cargar alumnos');
      } finally {
        setLoading(false);
      }
    };
    fetchAlumnos();
  }, [cursoId, token]);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h3 className="text-xl font-bold mb-4">Alumnos inscritos</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : alumnos.length === 0 ? (
        <p>No hay alumnos inscriptos</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((a) => (
              <tr key={a.id} className="text-center border-b">
                <td className="p-2">{a.alumno_nombre}</td>
                <td className="p-2">{a.alumno_apellido}</td>
                <td className="p-2">{a.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Modal>
  );
};

export default AlumnosPorCurso;
