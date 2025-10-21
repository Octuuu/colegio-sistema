import Modal from "../../../components/Modal";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG", minimumFractionDigits: 0 }).format(value);

const ModalConfirmacionCompra = ({ isOpen, onClose, onConfirm, carrito, total, proveedor, submitting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Compra">
      <div>
        <p>Proveedor ID: {proveedor}</p>
        <table className="w-full border mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nombre</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((p) => (
              <tr key={`${p.tipo}-${p.id}`}>
                <td className="p-2">{p.nombre} ({p.tipo})</td>
                <td className="p-2">{p.cantidad}</td>
                <td className="p-2">{formatCurrency(p.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 font-bold">Total: {formatCurrency(total)}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={onClose} disabled={submitting}>Cancelar</button>
          <button className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onConfirm} disabled={submitting}>
            {submitting ? "Procesando..." : "Confirmar Compra"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmacionCompra;
