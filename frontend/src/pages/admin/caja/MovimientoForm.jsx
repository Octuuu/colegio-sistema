import { useState, useContext } from 'react';
import { crearMovimiento } from '../../../services/CajaService';
import { AuthContext } from '../../../context/AuthContext';

export default function MovimientoForm({ onMovimientoCreado }) {
  const { token } = useContext(AuthContext);

  const [tipo, setTipo] = useState('ingreso');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!monto || !descripcion) return alert('Completar todos los campos');
    if (!token) return alert('Token no definido');

    const fecha = new Date().toISOString().split('T')[0];
    await crearMovimiento({ fecha, tipo_movimiento: tipo, descripcion, monto: parseFloat(monto) }, token);

    setDescripcion('');
    setMonto('');
    onMovimientoCreado();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Registrar Movimiento</h2>

      <div className="mb-3">
        <label className="block mb-1">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Descripción"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Monto</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Monto"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
}
