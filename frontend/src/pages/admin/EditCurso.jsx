import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerCursoPorId, actualizarCurso } from '../../services/cursoService.js';

function EditarCurso({ onSuccess }) {
  const [anio, setAnio] = useState('');
  const [bachillerato, setBachillerato] = useState('');
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token');

        const curso = await obtenerCursoPorId(id, token);
        setAnio(curso.anio);
        setBachillerato(curso.bachillerato);
        setCargando(false);
      } catch (error) {
        console.error('❌ Error al obtener el curso:', error);
        alert('⚠️ No autorizado o curso no encontrado.');
      }
    };

    fetchCurso();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarCurso(id, { anio, bachillerato }, token);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('❌ Error al actualizar el curso:', error);
      alert('❌ No se pudo actualizar el curso');
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Curso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Año</label>
          <input
            type="text"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Bachillerato</label>
          <textarea
            value={bachillerato}
            onChange={(e) => setBachillerato(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarCurso;
