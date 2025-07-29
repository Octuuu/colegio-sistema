import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const crearAsignacion = async (datos, token) => {
    const res = await axios.post(`${API_URL}/asignaciones`, datos, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const obtenerMaterias = async (token) => {
    const res = await axios.get(`${API_URL}/materias`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const obtenerCursos = async (token) => {
    const res = await axios.get(`${API_URL}/cursos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const obtenerProfesores = async (token) => {
    const res = await axios.get(`${API_URL}/profesor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}


