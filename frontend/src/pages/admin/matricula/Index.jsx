import { useState } from "react";
import MatriculaList from "./MatriculaList";
import MatriculaForm from "./MatriculaForm";

const MatriculasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  const handlePagoRegistrado = () => {
    setModalOpen(false);
    setReloadList(!reloadList);
  };

  return (
    <div className="max-w-6xl mx-auto mt-2 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
          Gestión de Pagos de Matrículas
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold"
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
