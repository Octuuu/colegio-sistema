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

  useEffect(() => {
    const cargarDatos = async () => {
      const alumnosData = await obtenerAlumnos(token);
      setAlumnos(alumnosData);

      const productosData = await obtenerProductos(token);
      setProductos(productosData);
    };
    cargarDatos();
  }, [token]);

  const handleAlumnoChange = async (alumnoId) => {
    setSelectedAlumno(alumnoId);

    const tutoresAlumno = await obtenerTutoresDeAlumno(alumnoId, token);
    setTutores(tutoresAlumno);
    setSelectedTutor(tutoresAlumno.length > 0 ? tutoresAlumno[0].id : null);
  };

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

      alert("Venta realizada y factura generada ✅");
      setCarrito([]);
      setTotal(0);
      setSelectedAlumno(null);
      setSelectedTutor(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al generar la venta");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
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
      />

      <Carrito
        carrito={carrito}
        cambiarCantidad={handleCantidadChange}
        total={total}
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
      />
    </div>
  );
};

export default Ventas;
