import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { actualizarCurso, obtenerCursoPorId } from '../../services/cursoService.js';

const EditarCurso = ({ curso, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [cursoData, setCursoData] = useState(null);
  const [formData, setFormData] = useState({ anio: '', bachillerato: '' });
  const [error, setError] = useState('');

  // Traer los datos completos del curso cuando el componente se monta
  useEffect(() => {
    const fetchCurso = async () => {
      if (!curso?.id) return; // Evitar llamadas con undefined
      try {
        const data = await obtenerCursoPorId(curso.id, token); // PASAR TOKEN
        setCursoData(data);
        setFormData({ anio: data.anio, bachillerato: data.bachillerato });
      } catch (err) {
        console.error('❌ Error al obtener el curso: ', err);
        setError('Error al cargar los datos del curso');
      }
    };

    fetchCurso();
  }, [curso, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curso?.id) return;
    try {
      await actualizarCurso(curso.id, formData, token); // PASAR TOKEN
      onSuccess(); // Cierra modal y refresca la lista
    } catch (err) {
      console.error('❌ Error al actualizar el curso: ', err);
      setError('No se pudo actualizar el curso');
    }
  };

  if (!cursoData) return <p>Cargando curso...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Editar Curso</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Año</label>
          <input
            type="number"
            name="anio"
            value={formData.anio}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nombre del curso</label>
          <input
            type="text"
            name="bachillerato"
            value={formData.bachillerato}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarCurso;
