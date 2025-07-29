import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const loginRequest = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data; 
};
