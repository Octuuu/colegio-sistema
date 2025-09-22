import { useState } from 'react';
import { actualizarMateria } from '../../services/crearMateria.js';

function EditarMateria({ materia, onSuccess }) {
  const [nombre, setNombre] = useState(materia.nombre);
  const [descripcion, setDescripcion] = useState(materia.descripcion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarMateria(materia.id, { nombre, descripcion }, token);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('❌ Error al actualizar la materia:', error);
      alert('❌ No se pudo actualizar la materia');
    }
  };

  return (
    <div>
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

export default EditarMateria;
