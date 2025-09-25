import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../../components/Modal.jsx';
import { obtenerInscripciones, actualizarInscripcion } from '../../services/inscripcionesService.js';

const FormEditarInscripcion = ({ inscripcion, onClose, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({ ...inscripcion });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarInscripcion(inscripcion.id, formData, token);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar la inscripción');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Año lectivo</label>
        <input
          type="number"
          name="anio_lectivo"
          value={formData.anio_lectivo}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div>
        <label>Estado</label>
        <select
          name="estado"
          value={formData.estado}
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

const InscripcionesEdit = () => {
  const { token } = useContext(AuthContext);
  const { cursoId } = useParams();
  const [inscripciones, setInscripciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inscripcionSeleccionada, setInscripcionSeleccionada] = useState(null);

  useEffect(() => {
    if (!cursoId) return;
    const fetchInscripciones = async () => {
      try {
        const data = await obtenerInscripciones(cursoId, token);
        setInscripciones(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInscripciones();
  }, [cursoId, token]);

  const handleEditar = (insc) => {
    setInscripcionSeleccionada(insc);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    // refrescar la lista
    const fetchInscripciones = async () => {
      const data = await obtenerInscripciones(cursoId, token);
      setInscripciones(data);
    };
    fetchInscripciones();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Alumnos inscritos en el curso</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Año lectivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((i) => (
            <tr key={i.id} className={i.estado === 'inactivo' ? 'bg-gray-200 text-gray-500' : ''}>
              <td>{i.alumno_nombre}</td>
              <td>{i.alumno_apellido}</td>
              <td>{i.anio_lectivo}</td>
              <td>{i.estado}</td>
              <td>
                <button
                  onClick={() => handleEditar(i)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && inscripcionSeleccionada && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <FormEditarInscripcion
            inscripcion={inscripcionSeleccionada}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default InscripcionesEdit;
