import axios from "axios";

const API_URL = "http://localhost:3000/api/compras";

export const crearCompra = async (compra, token) => {
  const res = await axios.post(API_URL, compra, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const obtenerCompras = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const obtenerCompraPorId = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const descargarFacturaCompraPDF = async (facturaId, token) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/compras/facturas/${facturaId}/descargar`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error("Error al descargar PDF");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `factura_compra_${facturaId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Error descargando factura compra:", err);
  }
};
