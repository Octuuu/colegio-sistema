import { FiTruck } from "react-icons/fi";

const SeleccionarProveedor = ({ proveedores, selectedProveedor, onProveedorChange }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FiTruck className="text-blue-600 dark:text-blue-400 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Seleccionar Proveedor
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Elige el proveedor para esta compra
          </p>
        </div>
      </div>

      <select
        value={selectedProveedor || ""}
        onChange={(e) => onProveedorChange(e.target.value ? Number(e.target.value) : null)}
        className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
      >
        <option value="">Seleccionar proveedor...</option>
        {proveedores.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre} {p.contacto ? `- ${p.contacto}` : ''}
          </option>
        ))}
      </select>

      {selectedProveedor && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-300">
            Proveedor seleccionado: <strong>{proveedores.find(p => p.id === selectedProveedor)?.nombre}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default SeleccionarProveedor;