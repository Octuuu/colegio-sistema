import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerAlumnosInscritos, actualizarInscripcion } from '../../services/inscripcionesService';
import axios from 'axios';

const InscripcionesList = () => {
  const { token } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cursos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursos(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchCursos();
  }, [token]);

  useEffect(() => {
    if (!cursoSeleccionado) return;
    const fetchInscripciones = async () => {
      try {
        const data = await obtenerAlumnosInscritos(cursoSeleccionado, token);
        setInscripciones(data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchInscripciones();
  }, [cursoSeleccionado, token]);

  const handleChange = (id, field, value) => {
    setInscripciones((prev) =>
      prev.map((insc) =>
        insc.id === id ? { ...insc, [field]: value } : insc
      )
    );
  };
  
  const handleUpdate = async (insc) => {
    try {
      await actualizarInscripcion(insc.id, insc, token);
      alert('Inscripción actualizada');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
        Inscripciones por Curso
      </h2>

      <select
        value={cursoSeleccionado}
        onChange={(e) => setCursoSeleccionado(e.target.value)}
        className="border border-slate-500 h-[36px] font-semibold pl-5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      >
        <option value="">Seleccione un curso</option>
        {cursos.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.anio}° - {curso.bachillerato}
          </option>
        ))}
      </select>

      {inscripciones.length > 0 && (
        <table className="w-full border mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Alumno</th>
              <th className="p-2">Año lectivo</th>
              <th className="p-2">Fecha inscripción</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((insc) => (
              <tr key={insc.id}>
                <td className="p-2">{insc.alumno_nombre} {insc.alumno_apellido}</td>
                <td className="p-2">
                  <input
                    type="text"
                    value={insc.anio_lectivo}
                    onChange={(e) => handleChange(insc.id, 'anio_lectivo', e.target.value)}
                    className="border border-slate-400 px-2 py-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="date"
                    value={insc.fecha_inscripcion}
                    onChange={(e) => handleChange(insc.id, 'fecha_inscripcion', e.target.value)}
                    className="border border-slate-400 px-2 py-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleUpdate(insc)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InscripcionesList;
