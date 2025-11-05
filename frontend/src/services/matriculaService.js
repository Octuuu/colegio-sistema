import axios from "axios";

const API_URL = "http://localhost:3000/api/matriculas";
const API_URL_ALUMNOS = "http://localhost:3000/api/alumnos";

// Obtener todos los pagos
export const obtenerTodosLosPagos = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Crear nueva matrícula/pago
export const crearMatricula = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Descargar factura PDF automáticamente
export const descargarFacturaMatriculaPDF = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob", // importante para archivos
  });

  // Descargar archivo
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `factura_matricula_${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// Buscar alumnos en tiempo real
export const buscarAlumnosPorCedula = async (cedula, token) => {
  const res = await axios.get(
    `${API_URL_ALUMNOS}/search?q=${encodeURIComponent(cedula)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
