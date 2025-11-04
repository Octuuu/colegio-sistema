import { useState } from "react";
import MatriculaList from "./MatriculaList";
import MatriculaForm from "./MatriculaForm";

const MatriculasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white">
        Gestión de Pagos de Matrículas
      </h1>

      <MatriculaList openModal={() => setModalOpen(true)} />

      {modalOpen && (
        <MatriculaForm closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default MatriculasPage;
