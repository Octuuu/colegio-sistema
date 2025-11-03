import { useState } from "react";
import MensualidadForm from "./MensualidadForm";
import MensualidadesList from "./MensualidadesList";

const MensualidadesPage = () => {
  const [tab, setTab] = useState("list");

  return (
    <div className="max-w-6xl mx-auto bg-white ">
      <h1 className="text-2xl font-bold mb-4">Gestión de Mensualidades</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("list")}
          className={`px-4 py-2 rounded ${tab === "list" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Lista de Pagos
        </button>
        <button
          onClick={() => setTab("pay")}
          className={`px-4 py-2 rounded ${tab === "pay" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Pagar Mensualidad
        </button>
      </div>

      {tab === "list" ? <MensualidadesList /> : <MensualidadForm />}
    </div>
  );
};

export default MensualidadesPage;
