import Modal from "../../../components/Modal";
import { FiCheck, FiX, FiLoader, FiFileText, FiTruck } from "react-icons/fi";

const ModalConfirmacionCompra = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  carrito, 
  total, 
  proveedor, 
  submitting,
  formatCurrency 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Compra">
      <div className="space-y-6">
        {/* Información del Proveedor */}
        {proveedor && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <FiTruck className="text-blue-600 dark:text-blue-400" size={20} />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300">Proveedor</p>
              <p className="text-blue-700 dark:text-blue-400">{proveedor.nombre}</p>
              {proveedor.contacto && (
                <p className="text-sm text-blue-600 dark:text-blue-500">Contacto: {proveedor.contacto}</p>
              )}
            </div>
          </div>
        )}

        {/* Detalles de la Compra */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FiFileText className="text-gray-600 dark:text-gray-400" size={18} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Detalles de la Compra</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Producto/Insumo
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {carrito.map((item) => (
                  <tr key={`${item.tipo}-${item.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {item.nombre}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.tipo === "producto" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {item.cantidad}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={onClose}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium disabled:opacity-50"
          >
            <FiX className="text-lg" />
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                Procesando...
              </>
            ) : (
              <>
                <FiCheck className="text-lg" />
                Confirmar Compra
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmacionCompra;