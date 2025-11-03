import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const generarBackupDB = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/backup`, { 
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", 
    });
    return res;
  } catch (error) {
    console.error("Error generando backup:", error);
    throw error;
  }
};

