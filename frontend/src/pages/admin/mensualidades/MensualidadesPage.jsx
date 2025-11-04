import { useState } from "react";
import MensualidadesList from "./MensualidadesList";
import MensualidadForm from "./MensualidadForm";

const MensualidadesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Pagos Registrados</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar Pago de Mensualidad
        </button>
      </div>

      <MensualidadesList />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Registrar Pago de Mensualidad</h2>
            <MensualidadForm onSuccess={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MensualidadesPage;
