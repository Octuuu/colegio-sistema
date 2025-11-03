import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../../components/Modal.jsx';
import ListaGenerica from '../../components/ListaGenerica.jsx';
import {
  obtenerAlumnosInscritos,
  darDeBajaInscripcion,
  reactivarInscripcion,
  actualizarInscripcion
} from '../../services/inscripcionesService';

const VerAlumnoModal = ({ alumno, onClose }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Datos del alumno</h2>
    <div className="grid grid-cols-2 gap-2">
      <div><strong>Nombre:</strong> {alumno.alumno_nombre}</div>
      <div><strong>Apellido:</strong> {alumno.alumno_apellido}</div>
      <div><strong>Cédula:</strong> {alumno.cedula}</div>
      <div><strong>Fecha Nacimiento:</strong> {alumno.fecha_nacimiento}</div>
      <div><strong>Teléfono:</strong> {alumno.telefono}</div>
      <div><strong>Dirección:</strong> {alumno.direccion}</div>
      <div><strong>Email:</strong> {alumno.email}</div>
      <div><strong>Creado:</strong> {alumno.created_at}</div>
      <div><strong>Actualizado:</strong> {alumno.updated_at}</div>
    </div>
    <div className="flex justify-end">
      <button onClick={onClose} className="px-4 py-1 border rounded">Cerrar</button>
    </div>
  </div>
);

const EditarInscripcionModal = ({ alumno, onClose, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [inscripcionData, setInscripcionData] = useState({
    anio_lectivo: alumno.anio_lectivo,
    estado: alumno.estado
  });

  const handleChange = (e) => {
    setInscripcionData({ ...inscripcionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarInscripcion(alumno.id, inscripcionData, token);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar la inscripción');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Editar inscripción</h2>
      <div>
        <label>Año lectivo</label>
        <input
          type="text"
          name="anio_lectivo"
          value={inscripcionData.anio_lectivo}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div>
        <label>Estado</label>
        <select
          name="estado"
          value={inscripcionData.estado}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-1 border rounded">Cancelar</button>
        <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">Guardar</button>
      </div>
    </form>
  );
};

const InscripcionesList = () => {
  const { token } = useContext(AuthContext);
  const { cursoId } = useParams();
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState(null);
  const [verAlumnoModal, setVerAlumnoModal] = useState(false);
  const [editarInscripcionModal, setEditarInscripcionModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const fetchAlumnos = async () => {
    try {
      const data = await obtenerAlumnosInscritos(cursoId, token);
      setAlumnos(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los alumnos inscritos.');
    }
  };

  useEffect(() => {
    if (cursoId) fetchAlumnos();
  }, [cursoId, token]);

  const handleDarDeBaja = async (id) => {
    try {
      await darDeBajaInscripcion(id, token);
      fetchAlumnos();
    } catch (err) {
      console.error(err);
      alert('Error al dar de baja');
    }
  };

  const handleReactivar = async (id) => {
    try {
      await reactivarInscripcion(id, token);
      fetchAlumnos();
    } catch (err) {
      console.error(err);
      alert('Error al reactivar');
    }
  };

  const handleVerAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setVerAlumnoModal(true);
  };

  const handleEditarInscripcion = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setEditarInscripcionModal(true);
  };

  const handleSuccess = () => {
    setEditarInscripcionModal(false);
    fetchAlumnos();
  };

  const columns = [
    { key: 'alumno_nombre', label: 'Nombre' },
    { key: 'alumno_apellido', label: 'Apellido' },
    { key: 'email', label: 'Email' },
    { key: 'estado', label: 'Estado' },
  ];

  return (
    <div>
      <ListaGenerica
        title="Alumnos inscriptos en el curso"
        columns={columns}
        data={alumnos}
        error={error}
        onCloseError={() => setError(null)}
        renderActions={(alumno) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => handleVerAlumno(alumno)}
              className="text-black bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-xl border border-gray-700 transition"
            >
              Ver Alumno
            </button>
            <button
              onClick={() => handleEditarInscripcion(alumno)}
              className="text-blue-700 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-xl border border-blue-700 transition"
            >
              Editar
            </button>
            {alumno.estado === 'activo' ? (
              <button
                onClick={() => handleDarDeBaja(alumno.id)}
                className="text-red-700 bg-red-100 hover:bg-red-200 px-2 py-1 rounded-xl border border-red-500 transition"
              >
                Dar de baja
              </button>
            ) : (
              <button
                onClick={() => handleReactivar(alumno.id)}
                className="text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded-xl border border-green-500 transition"
              >
                Reactivar
              </button>
            )}
          </div>
        )}
      />

      {verAlumnoModal && alumnoSeleccionado && (
        <Modal isOpen={verAlumnoModal} onClose={() => setVerAlumnoModal(false)}>
          <VerAlumnoModal alumno={alumnoSeleccionado} onClose={() => setVerAlumnoModal(false)} />
        </Modal>
      )}

      {editarInscripcionModal && alumnoSeleccionado && (
        <Modal isOpen={editarInscripcionModal} onClose={() => setEditarInscripcionModal(false)}>
          <EditarInscripcionModal
            alumno={alumnoSeleccionado}
            onClose={() => setEditarInscripcionModal(false)}
            onSuccess={handleSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default InscripcionesList;
