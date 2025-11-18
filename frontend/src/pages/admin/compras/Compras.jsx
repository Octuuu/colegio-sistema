import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerProveedores } from "../../../services/proveedorService";
import { obtenerProductos } from "../../../services/productoService";
import { obtenerInsumos } from "../../../services/insumoService";
import { crearCompra, descargarFacturaCompraPDF } from "../../../services/compraService";
import Notification from "../../../components/Notification";
import SeleccionarProveedor from "./SeleccionarProveedor";
import ProductosDisponibles from "./ProductosDisponibles";
import InsumosDisponibles from "./InsumosDisponibles";
import Carrito from "./Carrito";
import ModalConfirmacionCompra from "./ModalConfirmacionCompra";
import { FiShoppingCart, FiLoader } from "react-icons/fi";

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
  const [loading, setLoading] = useState(false);

  const [carritoProductos, setCarritoProductos] = useState([]);
  const [carritoInsumos, setCarritoInsumos] = useState([]);

  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [notification, setNotification] = useState({ message: "", type: "" });

  // Cargar proveedores, productos e insumos
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const [proveedoresData, productosData, insumosData] = await Promise.all([
          obtenerProveedores(token),
          obtenerProductos(token),
          obtenerInsumos(token)
        ]);

        setProveedores(proveedoresData);
        setProductos(productosData.map((p) => ({ ...p, precio_unitario: Number(p.precio_unitario) || 0 })));
        setInsumos(insumosData.map((i) => ({ ...i, precio_unitario: Number(i.precio_unitario) || 0 })));
      } catch (err) {
        console.error(err);
        setNotification({ message: "Error al cargar los datos", type: "error" });
      } finally {
        setLoading(false);
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
      return [...prev, { ...producto, cantidad: 1, subtotal: producto.precio_unitario, tipo: "producto" }];
    });
    setTotal((prev) => prev + producto.precio_unitario);
    setNotification({ message: `${producto.nombre} agregado al carrito`, type: "success" });
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
      return [...prev, { ...insumo, cantidad: 1, subtotal: insumo.precio_unitario, tipo: "insumo" }];
    });
    setTotal((prev) => prev + insumo.precio_unitario);
    setNotification({ message: `${insumo.nombre} agregado al carrito`, type: "success" });
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
      const producto = carritoProductos.find(p => p.id === id);
      setCarritoProductos(prev => prev.filter((p) => p.id !== id));
      setTotal(prev => prev - (producto?.subtotal || 0));
      setNotification({ message: `${producto?.nombre} eliminado del carrito`, type: "info" });
    } else {
      const insumo = carritoInsumos.find(i => i.id === id);
      setCarritoInsumos(prev => prev.filter((i) => i.id !== id));
      setTotal(prev => prev - (insumo?.subtotal || 0));
      setNotification({ message: `${insumo?.nombre} eliminado del carrito`, type: "info" });
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
      setNotification({ message: "Debe seleccionar proveedor y agregar al menos un producto o insumo", type: "error" });
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
      setNotification({ message: "Compra registrada y factura generada correctamente", type: "success" });

      // Resetear estado
      setCarritoProductos([]);
      setCarritoInsumos([]);
      setTotal(0);
      setSelectedProveedor(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error al registrar compra", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const totalItems = carritoProductos.length + carritoInsumos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <FiShoppingCart className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nueva Compra
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gestiona las compras de productos e insumos
              </p>
            </div>
          </div>
          
          {totalItems > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total del carrito</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(total)}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <FiShoppingCart className="text-lg" />
                Confirmar Compra
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FiLoader className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <>
            {/* Selección de Proveedor */}
            <SeleccionarProveedor
              proveedores={proveedores}
              selectedProveedor={selectedProveedor}
              onProveedorChange={setSelectedProveedor}
            />

            {/* Productos e Insumos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            </div>

            {/* Carritos */}
            {(carritoProductos.length > 0 || carritoInsumos.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {carritoProductos.length > 0 && (
                  <Carrito
                    titulo="Productos en Carrito"
                    carrito={carritoProductos}
                    cambiarCantidad={(id, cantidad) => handleCantidadChange(id, cantidad, "producto")}
                    eliminarUno={(id) => handleEliminar(id, "producto")}
                    total={carritoProductos.reduce((acc, p) => acc + p.subtotal, 0)}
                    formatCurrency={formatCurrency}
                    tipo="producto"
                  />
                )}

                {carritoInsumos.length > 0 && (
                  <Carrito
                    titulo="Insumos en Carrito"
                    carrito={carritoInsumos}
                    cambiarCantidad={(id, cantidad) => handleCantidadChange(id, cantidad, "insumo")}
                    eliminarUno={(id) => handleEliminar(id, "insumo")}
                    total={carritoInsumos.reduce((acc, i) => acc + i.subtotal, 0)}
                    formatCurrency={formatCurrency}
                    tipo="insumo"
                  />
                )}
              </div>
            )}
          </>
        )}

        <ModalConfirmacionCompra
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmCompra}
          carrito={[...carritoProductos, ...carritoInsumos]}
          total={total}
          proveedor={proveedores.find(p => p.id === selectedProveedor)}
          submitting={submitting}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default Compras;