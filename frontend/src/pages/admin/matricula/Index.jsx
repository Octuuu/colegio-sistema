import { useState } from "react";
import MatriculaList from "./MatriculaList";
import MatriculaForm from "./MatriculaForm";

const MatriculasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  const handlePagoRegistrado = () => {
    setModalOpen(false);
    setReloadList(prev => !prev); // Cambiar el estado para recargar
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Gestión de Pagos de Matrículas
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
        >
          Registrar Pago
        </button>
      </div>

      <MatriculaList reload={reloadList} />

      {modalOpen && (
        <MatriculaForm
          closeModal={() => setModalOpen(false)}
          onPagoRegistrado={handlePagoRegistrado}
        />
      )}
    </div>
  );
};

export default MatriculasPage;