import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../../../components/Modal";
import InsumoForm from "./InsumoForm";
import InsumosMovimientos from "./InsumosMovimientos";
import {
  obtenerInsumos,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
  obtenerInsumosStockBajo,
} from "../../../services/insumoService";
import { obtenerProveedores } from "../../../services/proveedorService";

const Insumos = () => {
  const { token } = useContext(AuthContext);
  const [insumos, setInsumos] = useState([]);
  const [stockBajo, setStockBajo] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMovimientosOpen, setIsMovimientosOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

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
      showNotification("Error al obtener datos", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await crearInsumo(formData, token);
      showNotification("Insumo creado correctamente");
      setIsFormOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showNotification("Error al crear insumo", "error");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await actualizarInsumo(editing.id, formData, token);
      showNotification("Insumo actualizado correctamente");
      setEditing(null);
      setIsFormOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showNotification("Error al actualizar insumo", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ ¿Eliminar insumo?")) return;
    try {
      await eliminarInsumo(id, token);
      showNotification("Insumo eliminado correctamente");
      fetchData();
      if (selectedInsumo?.id === id) setSelectedInsumo(null);
    } catch (err) {
      console.error(err);
      showNotification("Error al eliminar insumo", "error");
    }
  };

  const openForm = (insumo = null) => {
    setEditing(insumo);
    setIsFormOpen(true);
  };

  const openMovimientos = (insumo) => {
    setSelectedInsumo(insumo);
    setIsMovimientosOpen(true);
  };

  return (
    <div className="p-6">
 
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Insumos
        </h1>
        <button
          onClick={() => openForm()}
          className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          + Crear Insumo
        </button>
      </div>

      {stockBajo.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
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

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white dark:bg-gray-800 ">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Descripción</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Unidad</th>
              <th className="p-2 border">Proveedor</th>
              <th className="p-2 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {insumos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No hay insumos
                </td>
              </tr>
            ) : (
              insumos.map((i) => (
                <tr key={i.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-2">{i.nombre}</td>
                  <td className="p-2">{i.descripcion}</td>
                  <td className="p-2">{i.cantidad}</td>
                  <td className="p-2">{i.unidad}</td>
                  <td className="p-2">{i.proveedor || "-"}</td>
                  <td className="p-2 flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => openForm(i)}
                      className="text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(i.id)}
                      className="font-medium text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => openMovimientos(i)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Movimientos
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Crear/Editar Insumo */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <InsumoForm
          insumo={editing}
          proveedores={proveedores}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      </Modal>

      {/* Modal Movimientos */}
      <Modal
        isOpen={isMovimientosOpen}
        onClose={() => setIsMovimientosOpen(false)}
      >
        {selectedInsumo && (
          <InsumosMovimientos
            insumoId={selectedInsumo.id}
            token={token}
            onClose={() => setIsMovimientosOpen(false)}
            refresh={fetchData}
            showNotification={showNotification}
          />
        )}
      </Modal>
    </div>
  );
};

export default Insumos;
