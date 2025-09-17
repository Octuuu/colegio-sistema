import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  obtenerInsumos,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
  obtenerInsumosStockBajo,
} from "../../../services/insumoService";
import { obtenerProveedores } from "../../../services/proveedorService";
import InsumoForm from "./InsumoForm";
import InsumosMovimientos from "./InsumosMovimientos";

const Insumos = () => {
  const { token } = useContext(AuthContext);
  const [insumos, setInsumos] = useState([]);
  const [stockBajo, setStockBajo] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [proveedores, setProveedores] = useState([]);

  const fetchData = async () => {
    try {
      const data = await obtenerInsumos(token);
      setInsumos(data);
      const low = await obtenerInsumosStockBajo(5, token);
      setStockBajo(low);
      const provs = await obtenerProveedores(token);
      setProveedores(provs);
    } catch (err) {
      console.error(err);
      alert("Error al obtener datos");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    await crearInsumo(formData, token);
    fetchData();
  };

  const handleUpdate = async (formData) => {
    await actualizarInsumo(editing.id, formData, token);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar insumo?")) return;
    await eliminarInsumo(id, token);
    fetchData();
    if (selectedInsumo?.id === id) setSelectedInsumo(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Insumos</h1>

      {/* Formulario de creación/edición */}
      <InsumoForm
        insumo={editing}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancel={() => setEditing(null)}
        proveedores={proveedores}
      />

      {/* Lista de insumos */}
      <h2 className="text-xl font-semibold mt-6">Lista de Insumos</h2>
      <table className="min-w-full mt-4 bg-white dark:bg-gray-800 border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Unidad</th>
            <th className="p-2 border">Proveedor</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2">{i.nombre}</td>
              <td className="p-2">{i.descripcion}</td>
              <td className="p-2">{i.cantidad}</td>
              <td className="p-2">{i.unidad}</td>
              <td className="p-2">{i.proveedor || "-"}</td>
              <td className="p-2 flex gap-2 flex-wrap">
                <button
                  onClick={() => setEditing(i)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setSelectedInsumo(i)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Movimientos
                </button>
              </td>
            </tr>
          ))}
          {insumos.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No hay insumos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Stock bajo */}
      {stockBajo.length > 0 && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded">
          <h3 className="font-semibold">⚠️ Insumos con stock bajo:</h3>
          <ul className="list-disc ml-6">
            {stockBajo.map((s) => (
              <li key={s.id}>
                {s.nombre} - {s.cantidad} {s.unidad}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Componente de movimientos */}
      {selectedInsumo && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">
            Movimientos de: {selectedInsumo.nombre}
          </h2>
          <InsumosMovimientos insumoId={selectedInsumo.id} />
          <button
            className="mt-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => setSelectedInsumo(null)}
          >
            Cerrar movimientos
          </button>
        </div>
      )}
    </div>
  );
};

export default Insumos;
