import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  obtenerAlumnos
} from "../../../services/alumnoService";
import { obtenerTutoresDeAlumno } from "../../../services/tutorService";
import { obtenerProductos } from "../../../services/productoService";
import { crearVenta, descargarFacturaPDF } from "../../../services/ventaService";

const Ventas = () => {
  const { token } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [tutores, setTutores] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar alumnos y productos al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      const alumnosData = await obtenerAlumnos(token);
      setAlumnos(alumnosData);

      const productosData = await obtenerProductos(token);
      setProductos(productosData);
    };
    cargarDatos();
  }, [token]);

  // Manejar selección de alumno
  const handleAlumnoChange = async (e) => {
    const alumnoId = e.target.value;
    setSelectedAlumno(alumnoId);

    // Obtener tutores del alumno
    const tutoresAlumno = await obtenerTutoresDeAlumno(alumnoId, token);
    setTutores(tutoresAlumno);

    // Seleccionar automáticamente el primer tutor si existe
    setSelectedTutor(tutoresAlumno.length > 0 ? tutoresAlumno[0].id : null);
  };

  // Agregar producto al carrito
  const handleAgregarProducto = (producto) => {
    const exist = carrito.find((p) => p.id === producto.id);
    if (exist) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1, subtotal: (p.cantidad + 1) * p.precio_unitario }
            : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1, subtotal: producto.precio_unitario }]);
    }
    calcularTotal();
  };

  const handleCantidadChange = (id, cantidad) => {
    setCarrito(
      carrito.map((p) =>
        p.id === id
          ? { ...p, cantidad, subtotal: cantidad * p.precio_unitario }
          : p
      )
    );
    calcularTotal();
  };

  const calcularTotal = () => {
    const suma = carrito.reduce((acc, p) => acc + p.subtotal, 0);
    setTotal(suma);
  };

  // Enviar venta al backend y descargar factura
  const handleSubmitVenta = async (e) => {
    e.preventDefault();
    if (!selectedAlumno || !selectedTutor || carrito.length === 0) {
      alert("Debe seleccionar alumno, tutor y agregar al menos un producto");
      return;
    }

    const ventaData = {
      alumno_id: selectedAlumno,
      tutor_id: selectedTutor || null,
      productos: carrito.map(({ id, cantidad, precio_unitario }) => ({
        producto_id: id,
        cantidad,
        precio_unitario,
      })),
      metodo_pago: "Efectivo",
    };

    try {
      const { facturaId } = await crearVenta(ventaData, token);
      alert("Venta realizada y factura generada ✅");

      // Descargar automáticamente la factura
      await descargarFacturaPDF(facturaId, token);

      // Limpiar formulario
      setCarrito([]);
      setTotal(0);
      setSelectedAlumno(null);
      setSelectedTutor(null);
    } catch (err) {
      console.error(err);
      alert("Error al generar la venta");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nueva Venta</h2>

      <form onSubmit={handleSubmitVenta}>
        <div className="mb-4">
          <label>Alumno:</label>
          <select
            className="border p-2 rounded w-full"
            value={selectedAlumno || ""}
            onChange={handleAlumnoChange}
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map((al) => (
              <option key={al.id} value={al.id}>
                {al.nombre} {al.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label>Tutor:</label>
          <select
            className="border p-2 rounded w-full"
            value={selectedTutor || ""}
            onChange={(e) => setSelectedTutor(e.target.value)}
          >
            {tutores.length === 0 ? (
              <option value="">Sin tutor asignado</option>
            ) : (
              tutores.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre} {t.apellido}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mb-4">
          <label>Productos/Servicios:</label>
          <div className="grid grid-cols-2 gap-2">
            {productos.map((p) => (
              <button
                key={p.id}
                type="button"
                className="border p-2 rounded hover:bg-gray-200"
                onClick={() => handleAgregarProducto(p)}
              >
                {p.nombre} - ${p.precio_unitario}
              </button>
            ))}
          </div>
        </div>

        {carrito.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Carrito:</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Producto</th>
                  <th className="p-2">Cantidad</th>
                  <th className="p-2">Precio Unitario</th>
                  <th className="p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2">{p.nombre}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="1"
                        value={p.cantidad}
                        onChange={(e) =>
                          handleCantidadChange(p.id, parseInt(e.target.value))
                        }
                        className="w-16 border rounded p-1"
                      />
                    </td>
                    <td className="p-2">${p.precio_unitario}</td>
                    <td className="p-2">${p.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 font-bold">Total: ${total}</p>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generar Venta y Factura
        </button>
      </form>
    </div>
  );
};

export default Ventas;
