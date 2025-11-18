import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import Notification from "../../../components/Notification";
import { generarBackupDB } from "../../../services/configuracionService";

const Configuracion = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleBackup = async () => {
    setLoading(true);
    try {
      const backupFileName = await generarBackupDB(token);

      const url = window.URL.createObjectURL(new Blob([backupFileName.data], { type: "application/sql" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setNotification({ message: "Backup descargado correctamente", type: "success" });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error al generar el backup", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Configuración
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
        <h2 className="text-xl font-medium mb-4">Backup de Base de Datos</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Puedes generar un backup completo de la base de datos.
        </p>
        <button
          onClick={handleBackup}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Generando backup..." : "Generar Backup"}
        </button>
      </div>
    </div>
  );
};

export default Configuracion;
