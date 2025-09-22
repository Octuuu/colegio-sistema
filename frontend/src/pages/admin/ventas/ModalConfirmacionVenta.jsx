import Modal from "../../../components/Modal";

const ModalConfirmacionVenta = ({ isOpen, onClose, onConfirm, carrito, total, alumno, tutor, submitting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Venta">
      <div>
        <p>Alumno ID: {alumno}</p>
        <p>Tutor ID: {tutor}</p>

        <table className="w-full border mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Producto</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((p) => (
              <tr key={p.id}>
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">{p.cantidad}</td>
                <td className="p-2">${p.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-2 font-bold">Total: ${total}</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
            disabled={submitting}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? "Procesando..." : "Confirmar Venta"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmacionVenta;
