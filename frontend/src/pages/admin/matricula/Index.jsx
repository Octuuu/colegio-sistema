import { useState } from "react";
import MatriculaForm from "./MatriculaForm";
import MatriculaList from "./MatriculaList";

const MatriculasPage = () => {
  const [activeTab, setActiveTab] = useState("listado");

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white">
        Gestión de Matrículas
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("listado")}
          className={`px-4 py-2 font-bold rounded ${
            activeTab === "listado"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          }`}
        >
          Listado de Pagos
        </button>
        <button
          onClick={() => setActiveTab("formulario")}
          className={`px-4 py-2 font-bold rounded ${
            activeTab === "formulario"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          }`}
        >
          Registrar Pago
        </button>
      </div>

      {activeTab === "listado" ? <MatriculaList /> : <MatriculaForm />}
    </div>
  );
};

export default MatriculasPage;
