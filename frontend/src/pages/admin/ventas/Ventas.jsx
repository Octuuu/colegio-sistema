import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerAlumnos } from "../../../services/alumnoService";
import { obtenerTutoresDeAlumno } from "../../../services/tutorService";
import { obtenerProductos } from "../../../services/productoService";
import { crearVenta, descargarFacturaPDF } from "../../../services/ventaService";
import Notification from "../../../components/Notification";
import SeleccionarAlumnoTutor from "./SeleccionarAlumnoTutor";
import ProductosDisponibles from "./ProductosDisponibles";
import Carrito from "./Carrito";
import ModalConfirmacionVenta from "./ModalConfirmacionVenta";
import { FiShoppingCart, FiLoader, FiPackage } from "react-icons/fi";

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
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const [alumnosData, productosData] = await Promise.all([
          obtenerAlumnos(token),
          obtenerProductos(token)
        ]);

        setAlumnos(alumnosData);
        setProductos(
          productosData.map(p => ({
            ...p,
            precio_unitario: Number(p.precio_unitario) || 0
          }))
        );
      } catch (err) {
        console.error(err);
        setNotification({ message: "Error al cargar los datos", type: "error" });
      } finally {
        setLoading(false);
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
      setNotification({ message: "Error al cargar los tutores", type: "error" });
    }
  };

  const handleAgregarProducto = (producto) => {
    if (producto.stock <= 0) {
      setNotification({ message: `El producto "${producto.nombre}" está agotado`, type: "error" });
      return;
    }

    setCarrito((prevCarrito) => {
      const exist = prevCarrito.find((p) => p.id === producto.id);

      if (exist) {
        return prevCarrito.map((p) =>
          p.id === producto.id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                subtotal: (p.cantidad + 1) * p.precio_unitario,
              }
            : p
        );
      } else {
        return [
          ...prevCarrito,
          {
            ...producto,
            cantidad: 1,
            subtotal: producto.precio_unitario,
          },
        ];
      }
    });

    // Reducir stock
    setProductos((prev) =>
      prev.map((p) =>
        p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    // Recalcular total
    setTotal((prevTotal) => prevTotal + producto.precio_unitario);
    setNotification({ message: `${producto.nombre} agregado al carrito`, type: "success" });
  };

  const handleCantidadChange = (id, cantidad) => {
    setCarrito(prevCarrito => {
      const productoCarrito = prevCarrito.find(p => p.id === id);
      if (!productoCarrito) return prevCarrito;

      const diff = cantidad - productoCarrito.cantidad;
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
  
  const eliminarUno = (id) => {
    const producto = carrito.find(p => p.id === id);
    if (!producto) return;

    const nuevaCantidad = producto.cantidad - 1;

    let nuevoCarrito;
    if (nuevaCantidad <= 0) {
      nuevoCarrito = carrito.filter(p => p.id !== id);
    } else {
      nuevoCarrito = carrito.map(p =>
        p.id === id
          ? { ...p, cantidad: nuevaCantidad, subtotal: nuevaCantidad * p.precio_unitario }
          : p
      );
    }

    setCarrito(nuevoCarrito);
    const nuevoTotal = nuevoCarrito.reduce((acc, p) => acc + p.subtotal, 0);
    setTotal(nuevoTotal);

    // Ajustar stock
    setProductos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p
      )
    );

    setNotification({ message: `${producto.nombre} eliminado del carrito`, type: "info" });
  };

  const handleConfirmVenta = async () => {
    if (!selectedAlumno || carrito.length === 0) {
      setNotification({ message: "Debe seleccionar alumno y agregar al menos un producto", type: "error" });
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

      setNotification({ message: "Venta realizada y factura generada correctamente", type: "success" });

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
      setNotification({ message: "Error al generar la venta", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

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
            <div className="p-3 bg-green-500 rounded-xl shadow-lg">
              <FiShoppingCart className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Nueva Venta
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gestiona las ventas de productos y servicios
              </p>
            </div>
          </div>
          
          {carrito.length > 0 && (
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
                Confirmar Venta
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
            {/* Selección de Alumno y Tutor */}
            <SeleccionarAlumnoTutor
              alumnos={alumnos}
              selectedAlumno={selectedAlumno}
              onAlumnoChange={handleAlumnoChange}
              tutores={tutores}
              selectedTutor={selectedTutor}
              onTutorChange={setSelectedTutor}
            />

            {/* Productos Disponibles */}
            <ProductosDisponibles
              productos={productos}
              agregarAlCarrito={handleAgregarProducto}
              formatCurrency={formatCurrency}
            />

            {/* Carrito */}
            {carrito.length > 0 && (
              <Carrito
                carrito={carrito}
                cambiarCantidad={handleCantidadChange}
                eliminarUno={eliminarUno}
                total={total}
                formatCurrency={formatCurrency}
              />
            )}
          </>
        )}

        <ModalConfirmacionVenta
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmVenta}
          carrito={carrito}
          total={total}
          alumno={alumnos.find(a => a.id === selectedAlumno)}
          tutor={tutores.find(t => t.id === selectedTutor)}
          submitting={submitting}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default Ventas;