import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerProveedores } from "../../../services/proveedorService";
import { obtenerProductos } from "../../../services/productoService";
import { crearCompra, descargarFacturaCompraPDF } from "../../../services/compraService";

import SeleccionarProveedor from "./SeleccionarProveedor";
import ProductosDisponibles from "./ProductosDisponibles.jsx";
import Carrito from "./Carrito";
import ModalConfirmacionCompra from "./ModalConfirmacionCompra";

const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    minimumFractionDigits: 0,
  }).format(number);
};

const Compras = () => {
  const { token } = useContext(AuthContext);

  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Cargar proveedores y productos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const proveedoresData = await obtenerProveedores(token);
        setProveedores(proveedoresData);

        const productosData = await obtenerProductos(token);
        setProductos(
          productosData.map((p) => ({
            ...p,
            precio_unitario: Number(p.precio_unitario) || 0,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    cargarDatos();
  }, [token]);

  const handleAgregarProducto = (producto) => {
    let nuevoCarrito;
    setCarrito((prevCarrito) => {
      const exist = prevCarrito.find((p) => p.id === producto.id);

      if (exist) {
        nuevoCarrito = prevCarrito.map((p) =>
          p.id === producto.id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                subtotal: (p.cantidad + 1) * p.precio_unitario,
              }
            : p
        );
      } else {
        nuevoCarrito = [
          ...prevCarrito,
          { ...producto, cantidad: 1, subtotal: producto.precio_unitario },
        ];
      }
      return nuevoCarrito;
    });

    setTotal((prev) => prev + producto.precio_unitario);
  };

  const handleCantidadChange = (id, cantidad) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.map((p) =>
        p.id === id
          ? { ...p, cantidad, subtotal: cantidad * p.precio_unitario }
          : p
      );
      const nuevoTotal = nuevoCarrito.reduce((acc, p) => acc + p.subtotal, 0);
      setTotal(nuevoTotal);
      return nuevoCarrito;
    });
  };

  const eliminarUno = (id) => {
    const producto = carrito.find((p) => p.id === id);
    if (!producto) return;

    const nuevaCantidad = producto.cantidad - 1;
    let nuevoCarrito;

    if (nuevaCantidad <= 0) {
      nuevoCarrito = carrito.filter((p) => p.id !== id);
    } else {
      nuevoCarrito = carrito.map((p) =>
        p.id === id
          ? {
              ...p,
              cantidad: nuevaCantidad,
              subtotal: nuevaCantidad * p.precio_unitario,
            }
          : p
      );
    }

    setCarrito(nuevoCarrito);
    const nuevoTotal = nuevoCarrito.reduce((acc, p) => acc + p.subtotal, 0);
    setTotal(nuevoTotal);
  };

  const handleConfirmCompra = async () => {
    if (!selectedProveedor || carrito.length === 0) {
      alert("Debe seleccionar proveedor y agregar al menos un producto");
      return;
    }

    setSubmitting(true);

    const compraData = {
      proveedor_id: selectedProveedor,
      productos: carrito.map(({ id, cantidad, precio_unitario }) => ({
        producto_id: id,
        cantidad,
        precio_unitario,
      })),
      metodo_pago: "Efectivo",
    };

    try {
      const { facturaId } = await crearCompra(compraData, token);
      await descargarFacturaCompraPDF(facturaId, token);

      showNotification("Compra registrada y factura generada ✅", "success");

      setCarrito([]);
      setTotal(0);
      setSelectedProveedor(null);
      setIsModalOpen(false);

      const productosData = await obtenerProductos(token);
      setProductos(
        productosData.map((p) => ({
          ...p,
          precio_unitario: Number(p.precio_unitario) || 0,
        }))
      );
    } catch (err) {
      console.error(err);
      showNotification("Error al registrar compra", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Nueva Compra</h2>

      <SeleccionarProveedor
        proveedores={proveedores}
        selectedProveedor={selectedProveedor}
        setSelectedProveedor={setSelectedProveedor}
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Confirmar Compra
        </button>
      )}

      <ModalConfirmacionCompra
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCompra}
        carrito={carrito}
        total={total}
        proveedor={selectedProveedor}
        submitting={submitting}
      />
    </div>
  );
};

export default Compras;
