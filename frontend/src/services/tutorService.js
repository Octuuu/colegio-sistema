import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tutores';

export const obtenerTutores = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const crearTutor = async (tutor, token) => {
  const res = await axios.post(API_URL, tutor, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const actualizarTutor = async (id, tutor, token) => {
  const res = await axios.put(`${API_URL}/${id}`, tutor, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const eliminarTutor = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const vincularTutorAlumno = async (alumnoId, tutorId, token) => {
  const res = await axios.post(`${API_URL}/vincular`, { alumnoId, tutorId }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const obtenerTutoresDeAlumno = async (alumnoId, token) => {
  const res = await axios.get(`${API_URL}/alumno/${alumnoId}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const obtenerAlumnosDeTutor = async (tutorId, token) => {
  const res = await axios.get(`${API_URL}/tutor/${tutorId}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
