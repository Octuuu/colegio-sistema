import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerMateriaPorId, actualizarMateria } from '../../services/crearMateria.js';

function EditarCurso() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  /*
  const [nombre, setNombre] = useState(materia.nombre);
  const [descripcion, setDescripcion] = useState(materia.descripcion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarMateria(materia.id, { nombre, descripcion }, token);
      alert('✅ Materia actualizada correctamente');
      onClose();
    } catch (error) {
      console.error('❌ Error al actualizar la materia:', error);
      alert('❌ No se pudo actualizar la materia');
    }
  };

  */
  useEffect(() => {
    
    const fetchMateria = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token');

        const materia = await obtenerMateriaPorId(id, token);
        setNombre(materia.nombre);
        setDescripcion(materia.descripcion);
        setCargando(false);
      } catch (error) {
        console.error('❌ Error al obtener la materia:', error);
        alert('⚠️ No autorizado. Iniciá sesión.');
        navigate('/login'); // o la ruta correspondiente
      }
    };

    fetchMateria();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarMateria(id, { nombre, descripcion }, token);
      alert('✅ Materia actualizada correctamente');
      navigate('/admin/materiasList');
    } catch (error) {
      console.error('❌ Error al actualizar la materia:', error);
      alert('❌ No se pudo actualizar la materia');
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Materia</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
