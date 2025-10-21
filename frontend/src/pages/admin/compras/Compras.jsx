import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerProveedores } from "../../../services/proveedorService";
import { obtenerProductos } from "../../../services/productoService";
import { obtenerInsumos } from "../../../services/insumoService"; // Nuevo servicio
import { crearCompra, descargarFacturaCompraPDF } from "../../../services/compraService";

import SeleccionarProveedor from "./SeleccionarProveedor";
import ProductosDisponibles from "./ProductosDisponibles";
import InsumosDisponibles from "./InsumosDisponibles";
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
  const [insumos, setInsumos] = useState([]);

  const [carritoProductos, setCarritoProductos] = useState([]);
  const [carritoInsumos, setCarritoInsumos] = useState([]);

  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Cargar proveedores, productos e insumos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const proveedoresData = await obtenerProveedores(token);
        setProveedores(proveedoresData);

        const productosData = await obtenerProductos(token);
        setProductos(
          productosData.map((p) => ({ ...p, precio_unitario: Number(p.precio_unitario) || 0 }))
        );

        const insumosData = await obtenerInsumos(token);
        setInsumos(
          insumosData.map((i) => ({ ...i, precio_unitario: Number(i.precio_unitario) || 0 }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    cargarDatos();
  }, [token]);

  // Funciones para agregar productos/insumos al carrito
  const handleAgregarProducto = (producto) => {
    setCarritoProductos((prev) => {
      const exist = prev.find((p) => p.id === producto.id);
      if (exist) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1, subtotal: (p.cantidad + 1) * p.precio_unitario }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1, subtotal: producto.precio_unitario }];
    });
    setTotal((prev) => prev + producto.precio_unitario);
  };

  const handleAgregarInsumo = (insumo) => {
    setCarritoInsumos((prev) => {
      const exist = prev.find((i) => i.id === insumo.id);
      if (exist) {
        return prev.map((i) =>
          i.id === insumo.id
            ? { ...i, cantidad: i.cantidad + 1, subtotal: (i.cantidad + 1) * i.precio_unitario }
            : i
        );
      }
      return [...prev, { ...insumo, cantidad: 1, subtotal: insumo.precio_unitario }];
    });
    setTotal((prev) => prev + insumo.precio_unitario);
  };

  // Función para cambiar cantidad de productos/insumos
  const handleCantidadChange = (id, cantidad, tipo) => {
    if (tipo === "producto") {
      setCarritoProductos((prev) => {
        const nuevo = prev.map((p) =>
          p.id === id ? { ...p, cantidad, subtotal: cantidad * p.precio_unitario } : p
        );
        const nuevoTotal = calcularTotal(nuevo, carritoInsumos);
        setTotal(nuevoTotal);
        return nuevo;
      });
    } else {
      setCarritoInsumos((prev) => {
        const nuevo = prev.map((i) =>
          i.id === id ? { ...i, cantidad, subtotal: cantidad * i.precio_unitario } : i
        );
        const nuevoTotal = calcularTotal(carritoProductos, nuevo);
        setTotal(nuevoTotal);
        return nuevo;
      });
    }
  };

  // Función para eliminar productos/insumos
  const handleEliminar = (id, tipo) => {
    if (tipo === "producto") {
      const nuevo = carritoProductos.filter((p) => p.id !== id);
      setCarritoProductos(nuevo);
      setTotal(calcularTotal(nuevo, carritoInsumos));
    } else {
      const nuevo = carritoInsumos.filter((i) => i.id !== id);
      setCarritoInsumos(nuevo);
      setTotal(calcularTotal(carritoProductos, nuevo));
    }
  };

  const calcularTotal = (productos, insumos) => {
    const totalProductos = productos.reduce((acc, p) => acc + p.subtotal, 0);
    const totalInsumos = insumos.reduce((acc, i) => acc + i.subtotal, 0);
    return totalProductos + totalInsumos;
  };

  // Confirmar compra
  const handleConfirmCompra = async () => {
    if (!selectedProveedor || (carritoProductos.length === 0 && carritoInsumos.length === 0)) {
      alert("Debe seleccionar proveedor y agregar al menos un producto o insumo");
      return;
    }

    setSubmitting(true);

    const compraData = {
      proveedor_id: selectedProveedor,
      productos: carritoProductos.map(({ id, cantidad, precio_unitario }) => ({
        producto_id: id,
        cantidad,
        precio_unitario,
      })),
      insumos: carritoInsumos.map(({ id, cantidad, precio_unitario }) => ({
        insumo_id: id,
        cantidad,
        precio_unitario,
      })),
      metodo_pago: "Efectivo",
    };

    try {
      const { facturaId } = await crearCompra(compraData, token);
      await descargarFacturaCompraPDF(facturaId, token);
      showNotification("Compra registrada y factura generada", "success");

      setCarritoProductos([]);
      setCarritoInsumos([]);
      setTotal(0);
      setSelectedProveedor(null);
      setIsModalOpen(false);
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

      <InsumosDisponibles
        insumos={insumos}
        agregarAlCarrito={handleAgregarInsumo}
        formatCurrency={formatCurrency}
      />

      <Carrito
        carrito={carritoProductos}
        cambiarCantidad={(id, cantidad) => handleCantidadChange(id, cantidad, "producto")}
        eliminarUno={(id) => handleEliminar(id, "producto")}
        total={total}
        formatCurrency={formatCurrency}
      />

      <Carrito
        carrito={carritoInsumos}
        cambiarCantidad={(id, cantidad) => handleCantidadChange(id, cantidad, "insumo")}
        eliminarUno={(id) => handleEliminar(id, "insumo")}
        total={total}
        formatCurrency={formatCurrency}
      />

      {(carritoProductos.length > 0 || carritoInsumos.length > 0) && (
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
        carrito={[...carritoProductos, ...carritoInsumos]}
        total={total}
        proveedor={selectedProveedor}
        submitting={submitting}
      />
    </div>
  );
};

export default Compras;
