import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const crearMateria = async (datos, token) => {
    const res = await axios.post(`${API_URL}/materias`, datos, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },    
    });

    return res.data;
};

export const actualizarMateria = async (id, datos, token) => {
    const res = await axios.put(`${API_URL}/materias/${id}`, datos, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const eliminarMateria = async (id, token) => {
    const res = await axios.delete(`${API_URL}/materias/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const obtenerMaterias = async (token) => {
    const res = await axios.get(`${API_URL}/materias`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return res.data;
}

export const obtenerMateriaPorId = async (id, token) => {
    const res = await axios.get(`${API_URL}/materias/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}
