import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// crear asistencia
export const crearAsistencia = async (datos, token) => {
  const res = await axios.post(`${API_URL}/asistencias`, 
    datos, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  )

  return res.data;
}

// obtener alumnos
export const obtenerAlumnos = async (token) => {
  const res = await axios.get(`${API_URL}/alumnos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data;
};

// traer la materia
export const obtenerMaterias = async (token) => {
  const res = await axios.get(`${API_URL}/materias/profesor/mis-materias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// historial de asistencias por materia
export const obtenerHistorialMateria = async (token, materiaId, params = {}) => {
  const res = await axios.get(
    `${API_URL}/asistencias/materia/${materiaId}/historial`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }
  );
  return res.data;
};

// descargar reporte PDF
export const descargarPDFHistorial = async (token, materiaId) => {
  const response = await axios.get(`${API_URL}/asistencias/materia/${materiaId}/historial/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob", 
  });

  // crear un enlace para descargar
  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Historial_Materia_${materiaId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};