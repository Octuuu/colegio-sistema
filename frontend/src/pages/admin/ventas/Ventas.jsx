import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerAlumnos } from "../../../services/alumnoService";
import { obtenerTutoresDeAlumno } from "../../../services/tutorService";
import { obtenerProductos } from "../../../services/productoService";
import { crearVenta, descargarFacturaPDF } from "../../../services/ventaService";

import SeleccionarAlumnoTutor from "./SeleccionarAlumnoTutor";
import ProductosDisponibles from "./ProductosDisponibles";
import Carrito from "./Carrito";
import ModalConfirmacionVenta from "./ModalConfirmacionVenta";
import Modal from "../../../components/Modal";

// Formatear precios en guaraníes
const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    minimumFractionDigits: 0,
  }).format(number);
};

const Ventas = () => {
  const { token } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [tutores, setTutores] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Notificaciones flotantes
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Cargar alumnos y productos al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const alumnosData = await obtenerAlumnos(token);
        setAlumnos(alumnosData);

        const productosData = await obtenerProductos(token);
        setProductos(
          productosData.map(p => ({
            ...p,
            precio_unitario: Number(p.precio_unitario) || 0
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    cargarDatos();
  }, [token]);

  // Al cambiar alumno, cargar tutores
  const handleAlumnoChange = async (alumnoId) => {
    setSelectedAlumno(alumnoId);
    try {
      const tutoresAlumno = await obtenerTutoresDeAlumno(alumnoId, token);
      setTutores(tutoresAlumno);
      setSelectedTutor(tutoresAlumno.length > 0 ? tutoresAlumno[0].id : null);
    } catch (err) {
      console.error(err);
    }
  };

  // Agregar producto al carrito
  const handleAgregarProducto = (producto) => {
    if (producto.stock <= 0) {
      showNotification(`El producto "${producto.nombre}" está agotado`, "error");
      return;
    }

    setCarrito(prevCarrito => {
      const exist = prevCarrito.find(p => p.id === producto.id);
      let nuevoCarrito;

      if (exist) {
        nuevoCarrito = prevCarrito.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1, subtotal: (p.cantidad + 1) * p.precio_unitario }
            : p
        );
      } else {
        nuevoCarrito = [...prevCarrito, { ...producto, cantidad: 1, subtotal: producto.precio_unitario }];
      }

      // Reducir stock del producto
      setProductos(prev =>
        prev.map(p =>
          p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
        )
      );

      // Recalcular total
      const nuevoTotal = nuevoCarrito.reduce((acc, p) => acc + p.subtotal, 0);
      setTotal(nuevoTotal);

      return nuevoCarrito;
    });
  };

  // Cambiar cantidad de un producto en el carrito
  const handleCantidadChange = (id, cantidad) => {
    setCarrito(prevCarrito => {
      const productoCarrito = prevCarrito.find(p => p.id === id);
      if (!productoCarrito) return prevCarrito;

      const diff = cantidad - productoCarrito.cantidad; // diferencia de stock
      const nuevoCarrito = prevCarrito.map(p =>
        p.id === id
          ? { ...p, cantidad, subtotal: cantidad * p.precio_unitario }
          : p
      );

      // Ajustar stock
      setProductos(prev =>
        prev.map(p =>
          p.id === id ? { ...p, stock: p.stock - diff } : p
        )
      );

      // Recalcular total
      const nuevoTotal = nuevoCarrito.reduce((acc, p) => acc + p.subtotal, 0);
      setTotal(nuevoTotal);

      return nuevoCarrito;
    });
  };

  // Eliminar de a uno del carrito
  const eliminarUno = (id) => {
    setCarrito(prevCarrito => {
      const producto = prevCarrito.find(p => p.id === id);
      if (!producto) return prevCarrito;

      // Devolver stock
      setProductos(prev =>
        prev.map(p => p.id === id ? { ...p, stock: p.stock + 1 } : p)
      );

      let nuevoCarrito;
      if (producto.cantidad === 1) {
        nuevoCarrito = prevCarrito.filter(p => p.id !== id);
      } else {
        nuevoCarrito = prevCarrito.map(p =>
          p.id === id
            ? { ...p, cantidad: p.cantidad - 1, subtotal: (p.cantidad - 1) * p.precio_unitario }
            : p
        );
      }

      // Recalcular total
      const nuevoTotal = nuevoCarrito.reduce((acc, p) => acc + p.subtotal, 0);
      setTotal(nuevoTotal);

      return nuevoCarrito;
    });
  };

  // Confirmar venta
  const handleConfirmVenta = async () => {
    if (!selectedAlumno || !selectedTutor || carrito.length === 0) {
      alert("Debe seleccionar alumno, tutor y agregar al menos un producto");
      return;
    }

    setSubmitting(true);

    const ventaData = {
      alumno_id: selectedAlumno,
      tutor_id: selectedTutor,
      productos: carrito.map(({ id, cantidad, precio_unitario }) => ({
        producto_id: id,
        cantidad,
        precio_unitario,
      })),
      metodo_pago: "Efectivo",
    };

    try {
      const { facturaId } = await crearVenta(ventaData, token);
      await descargarFacturaPDF(facturaId, token);

      showNotification("Venta realizada y factura generada ✅", "success");

      // Reset
      setCarrito([]);
      setTotal(0);
      setSelectedAlumno(null);
      setSelectedTutor(null);
      setIsModalOpen(false);

      // Refrescar stock
      const productosData = await obtenerProductos(token);
      setProductos(productosData.map(p => ({ ...p, precio_unitario: Number(p.precio_unitario) || 0 })));
    } catch (err) {
      console.error(err);
      showNotification("Error al generar la venta", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Nueva Venta</h2>

      <SeleccionarAlumnoTutor
        alumnos={alumnos}
        selectedAlumno={selectedAlumno}
        setSelectedAlumno={handleAlumnoChange}
        tutores={tutores}
        selectedTutor={selectedTutor}
        setSelectedTutor={setSelectedTutor}
      />

      <ProductosDisponibles
        productos={productos}
        agregarAlCarrito={handleAgregarProducto}
        formatCurrency={formatCurrency}
      />

      <Carrito
        carrito={carrito}
        cambiarCantidad={handleCantidadChange}
        eliminarUno={eliminarUno}
        total={total}
        formatCurrency={formatCurrency}
      />

      {carrito.length > 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
        >
          Confirmar Venta
        </button>
      )}

      <ModalConfirmacionVenta
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmVenta}
        carrito={carrito}
        total={total}
        alumno={selectedAlumno}
        tutor={selectedTutor}
        submitting={submitting}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Ventas;
