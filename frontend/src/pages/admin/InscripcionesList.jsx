import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerAlumnosInscritos } from '../../services/inscripcionesService';

const InscripcionesList = () => {
  const { token } = useContext(AuthContext);
  const { cursoId } = useParams(); // <-- obtenemos el ID del curso
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    if (!cursoId) return;

    const fetchInscripciones = async () => {
      try {
        const data = await obtenerAlumnosInscritos(cursoId, token);
        setInscripciones(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInscripciones();
  }, [cursoId, token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Alumnos inscritos en el curso</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Año lectivo</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((i) => (
            <tr key={i.id}>
              <td>{i.alumno_nombre}</td>
              <td>{i.alumno_apellido}</td>
              <td>{i.anio_lectivo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InscripcionesList;
