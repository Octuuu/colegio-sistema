import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  obtenerTutores,
  crearTutor,
  actualizarTutor,
  eliminarTutor,
  vincularTutorAlumno
} from '../../../services/tutorService';
import { obtenerAlumnos } from '../../../services/alumnoService';
import TutorForm from './TutorForm';

const Tutores = () => {
  const { token } = useContext(AuthContext);
  const [tutores, setTutores] = useState([]);
  const [editing, setEditing] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');

  // Obtener tutores y alumnos
  const fetchTutores = async () => {
    try {
      const data = await obtenerTutores(token);
      setTutores(data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener tutores');
    }
  };

  const fetchAlumnos = async () => {
    try {
      const data = await obtenerAlumnos(token);
      setAlumnos(data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener alumnos');
    }
  };

  useEffect(() => {
    fetchTutores();
    fetchAlumnos();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await crearTutor(formData, token);
      fetchTutores();
      alert('Tutor creado');
    } catch (err) {
      console.error(err);
      alert('Error al crear tutor');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await actualizarTutor(editing.id, formData, token);
      setEditing(null);
      fetchTutores();
      alert('Tutor actualizado');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar tutor');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este tutor?')) return;
    try {
      await eliminarTutor(id, token);
      fetchTutores();
      alert('Tutor eliminado');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar tutor');
    }
  };

  const handleVincular = async (tutorId) => {
    if (!alumnoSeleccionado) return alert('Seleccione un alumno');
    try {
      await vincularTutorAlumno(alumnoSeleccionado, tutorId, token);
      alert('Tutor vinculado al alumno');
    } catch (err) {
      console.error(err);
      alert('Error al vincular tutor al alumno');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tutores</h1>

      <TutorForm
        tutor={editing}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancel={() => setEditing(null)}
      />

      <div className="mt-6 mb-4">
        <select
          value={alumnoSeleccionado}
          onChange={(e) => setAlumnoSeleccionado(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre} {a.apellido} ({a.cedula})
            </option>
          ))}
        </select>
        <span className="text-gray-600 text-sm">
          Seleccione el alumno al cual quiere vincular un tutor
        </span>
      </div>

      <table className="min-w-full mt-4 bg-white dark:bg-gray-800 border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="p-2">{t.nombre}</td>
              <td className="p-2">{t.apellido}</td>
              <td className="p-2">{t.telefono}</td>
              <td className="p-2">{t.correo}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => setEditing(t)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleVincular(t.id)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Vincular al alumno
                </button>
              </td>
            </tr>
          ))}
          {tutores.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No hay tutores
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tutores;
