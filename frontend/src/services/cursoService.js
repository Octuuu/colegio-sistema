import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const crearCurso = async (datos, token) => {
    const res = await axios.post(`${API_URL}/cursos`, datos,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const actualizarCurso = async (id, datos, token) => {
    const res = await axios.put(`${API_URL}/cursos/${id}`,
    datos, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const eliminarCurso = async (id, token) => {
    const res = await axios.delete(`${API_URL}/cursos/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const obtenerCurso = async (token) => {
  const res = await axios.get(`${API_URL}/cursos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
 
export const obtenerCursoPorId = async (id, token) => {
  const res = await axios.get(`${API_URL}/cursos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// obtener alumnso por cursos 
export const obtenerAlumnosPorCurso = async (cursoId, token) => {
  const response = await axios.get(`http://localhost:3000/api/cursos/${cursoId}/alumnos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};