import { useState, useContext } from 'react';
import { crearMovimiento } from '../../../services/CajaService';
import { AuthContext } from '../../../context/AuthContext';

export default function MovimientoFormModal({ onClose, onMovimientoCreado }) {
  const { token } = useContext(AuthContext);
  const [tipo, setTipo] = useState('ingreso');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descripcion || !monto) return alert('Completar todos los campos');
    if (!token) return alert('Token no definido');

    const fecha = new Date().toISOString().split('T')[0];
    await crearMovimiento({ fecha, tipo_movimiento: tipo, descripcion, monto: parseFloat(monto) }, token);

    setDescripcion('');
    setMonto('');
    onMovimientoCreado();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Registrar Movimiento</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border rounded p-2 mb-3"
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>

          <label className="block mb-2">Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            placeholder="Descripción del movimiento"
          />

          <label className="block mb-2">Monto (Gs)</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Ej: 200000"
          />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
