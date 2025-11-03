import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// obtener auditoria
export const obtenerAuditorias = async (token, params = {}) => {
  const res = await axios.get(`${API_URL}/auditoria`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return res.data;
};

// descargar auditoria en PDF
export const descargarAuditoriaPDF = async (token, params = {}) => {
  const res = await axios.get(`${API_URL}/auditoria/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Auditoria.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
