import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const crearProfesor = async (datos, token) => {
    const res =  await axios.post(`${API_URL}/profesor`, datos,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const actualizarProfesor = async (id, datos, token) => {
    const res = await axios.put(`${API_URL}/profesor/${id}`, datos, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
};

export const eliminarProfesor = async (id, token) => {
    const res = await axios.delete(`${API_URL}/profesor/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const obtenerProfesorPorId = async (id, token) => {
    const res = await axios.get(`${API_URL}/profesor/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const obtenerProfesor = async (token) => {
    const res = await axios.get(`${API_URL}/profesor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

// alumnos de la materia del profe
export const obtenerAlumnos = async (token, materiaId) => {
    const res = await axios.get(`http://localhost:3000/api/profesor/materia/${materiaId}/alumnos`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

// guardar asistencia masiva
export const guardarAsistencia = async (token, materiaId, asistencias) => {
  const { data } = await axios.post(`${API_URL}/asistencias/masiva`, {
    materia_id: materiaId,
    asistencias
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return data;
};