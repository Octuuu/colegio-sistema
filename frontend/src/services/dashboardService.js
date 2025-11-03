import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const build = (url, token, params = {}) => ({
  method: "get",
  url: `${API_URL}${url}`,
  headers: { Authorization: `Bearer ${token}` },
  params,
});

export const fetchCounts = async (token) => {
  // Intenta llamar endpoints comunes; si falla devuelve nulls
  try {
    const [alumnos, cursos, materias, proveedores] = await Promise.all([
      axios(build("/alumnos", token)).then(r => r.data).catch(()=>null),
      axios(build("/cursos", token)).then(r => r.data).catch(()=>null),
      axios(build("/materias", token)).then(r => r.data).catch(()=>null),
      axios(build("/proveedores", token)).then(r => r.data).catch(()=>null),
    ]);

    return {
      alumnos: Array.isArray(alumnos) ? alumnos.length : (alumnos?.total ?? null),
      cursos: Array.isArray(cursos) ? cursos.length : (cursos?.total ?? null),
      materias: Array.isArray(materias) ? materias.length : (materias?.total ?? null),
      proveedores: Array.isArray(proveedores) ? proveedores.length : (proveedores?.total ?? null),
    };
  } catch (err) {
    return { alumnos: null, cursos: null, materias: null, proveedores: null };
  }
};

export const fetchCajaBalance = async (token) => {
  try {
    const res = await axios(build("/caja/balance", token));
    return res.data;
  } catch (err) {
    return null;
  }
};

export const fetchIngresosEgresosPorMes = async (token) => {
  // Intentamos varios endpoints posibles, el primero que funcione lo usamos
  const endpoints = [
    "/caja/resumen-mensual",    // hipotético
    "/ventas/resumen-mensual",  // hipotético
    "/caja/balance"             // fallback: puede contener totals
  ];
  for (const ep of endpoints) {
    try {
      const res = await axios(build(ep, token));
      if (res?.data) return res.data;
    } catch (err) {
      // seguir al siguiente
    }
  }
  return null;
};

export const fetchVentasRecientes = async (token, limit = 8) => {
  try {
    const res = await axios(build("/ventas", token, { _limit: limit, _sort: "fecha", _order: "desc" }));
    // si tu backend devuelve {items,total} lo manejamos
    if (res.data?.items) return res.data.items;
    if (Array.isArray(res.data)) return res.data;
    return [];
  } catch (err) {
    return [];
  }
};

export const fetchProductosMasVendidos = async (token, limit = 5) => {
  // intenta endpoint específico o construye de /ventas
  try {
    const res = await axios(build("/productos/top", token, { limit })).catch(()=>null);
    if (res?.data) return res.data;

    // fallback: intentar /ventas y calcular top (si ventas contienen items)
    const ventas = await axios(build("/ventas", token, { _limit: 200 })).then(r => r.data).catch(()=>null);
    const items = ventas?.items || ventas || [];
    if (!Array.isArray(items) || items.length === 0) return [];

    const counter = {};
    items.forEach(v => {
      (v.items || v.detalle || []).forEach(it => {
        const key = it.producto_id || it.productoId || it.id || it.nombre;
        const nombre = it.nombre || it.producto_nombre || "Producto";
        const qty = Number(it.cantidad || it.cantidad_vendida || it.qty || 1);
        if (!counter[key]) counter[key] = { nombre, cantidad: 0, total: 0 };
        counter[key].cantidad += qty;
        counter[key].total += (Number(it.precio_unitario || it.precio || 0) * qty);
      });
    });
    const arr = Object.values(counter).sort((a,b)=>b.cantidad - a.cantidad).slice(0, limit);
    return arr;
  } catch (err) {
    return [];
  }
};
