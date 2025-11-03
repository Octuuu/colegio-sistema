import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, GraduationCap, Truck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import {
  fetchCounts,
  fetchCajaBalance,
  fetchIngresosEgresosPorMes,
  fetchVentasRecientes,
  fetchProductosMasVendidos
} from "../../services/dashboardService";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const StatCard = ({ title, value, colorClass = "text-gray-800", bgClass = "bg-white", icon = null }) => (
  <Link to="#" className={`p-5 rounded-2xl shadow-sm border ${bgClass} transition-all group`}>
    <div className="flex items-center">
      <div className="mr-4 p-2 rounded-lg bg-opacity-20" style={{minWidth:40}}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className={`text-2xl font-semibold ${colorClass}`}>{value ?? "—"}</div>
      </div>
    </div>
  </Link>
);

const SmallTable = ({ title, columns = [], rows = [] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 overflow-x-auto">
    <h3 className="font-semibold mb-3">{title}</h3>
    <table className="w-full min-w-[600px]">
      <thead>
        <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
          {columns.map((c)=> <th key={c.key} className="pb-2">{c.title}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length} className="py-4 text-gray-500">Sin datos</td></tr>
        ) : rows.map((r, i)=>(
          <tr key={i} className={`${i%2===0?"bg-transparent":"bg-gray-50 dark:bg-gray-900"}`}>
            {columns.map(c => <td key={c.key} className="py-2 text-sm text-gray-700 dark:text-gray-200">{c.render ? c.render(r) : r[c.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [counts, setCounts] = useState({ alumnos: null, cursos: null, materias: null, proveedores: null });
  const [balance, setBalance] = useState(null);
  const [series, setSeries] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [productosTop, setProductosTop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Panel de Admin";
    loadAll();
    // eslint-disable-next-line
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [c, b, se, vr, pt] = await Promise.all([
        fetchCounts(token),
        fetchCajaBalance(token),
        fetchIngresosEgresosPorMes(token),
        fetchVentasRecientes(token, 8),
        fetchProductosMasVendidos(token, 6)
      ]);
      setCounts(c || {});
      setBalance(b || null);
      setSeries(se || null);
      setVentas(vr || []);
      setProductosTop(pt || []);
    } catch (err) {
      console.error("Error dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const lineData = () => {
    if (!series || !series.labels) return null;
    return {
      labels: series.labels,
      datasets: [
        {
          label: "Ingresos",
          data: series.ingresos || [],
          tension: 0.3,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.5)"
        },
        {
          label: "Egresos",
          data: series.egresos || [],
          tension: 0.3,
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
      ]
    };
  };

  const pieData = () => {
    if (!productosTop || productosTop.length === 0) return null;
    return {
      labels: productosTop.map(p=>p.nombre || p.producto || "Producto"),
      datasets: [{
        data: productosTop.map(p=>p.cantidad || p.cantidad_vendida || p.total || 1),
        backgroundColor: ["#7c3aed","#a78bfa","#60a5fa","#34d399","#f59e0b","#f97316"]
      }]
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <div className="text-sm text-gray-600">Última actualización: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Cursos" value={counts.cursos ?? "—"} colorClass="text-green-700" bgClass="bg-green-50 border-green-200" icon={<BookOpen size={20} />} />
        <StatCard title="Alumnos" value={counts.alumnos ?? "—"} colorClass="text-pink-700" bgClass="bg-red-50 border-pink-200" icon={<Users size={20} />} />
        <StatCard title="Materias" value={counts.materias ?? "—"} colorClass="text-yellow-700" bgClass="bg-orange-50 border-yellow-200" icon={<GraduationCap size={20} />} />
        <StatCard title="Proveedores" value={counts.proveedores ?? "—"} colorClass="text-purple-700" bgClass="bg-purple-50 border-purple-200" icon={<Truck size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Ingresos vs Egresos (mes)</h3>
            <div className="text-sm text-gray-500">Últimos meses</div>
          </div>

          {lineData() ? (
            <div className="h-64">
              <Line data={lineData()} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">No hay datos para graficar</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Balance</h3>
            <div className="text-sm text-gray-500">Resumen</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">Ingresos</div>
              <div className="text-lg font-semibold text-green-600">{balance?.ingresos ? new Intl.NumberFormat("es-PY",{ style:"currency", currency:"PYG", minimumFractionDigits:0 }).format(balance.ingresos) : "—"}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Egresos</div>
              <div className="text-lg font-semibold text-red-600">{balance?.egresos ? new Intl.NumberFormat("es-PY",{ style:"currency", currency:"PYG", minimumFractionDigits:0 }).format(balance.egresos) : "—"}</div>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <div className="text-sm">Balance</div>
              <div className={`text-lg font-semibold ${ (balance && (balance.ingresos - balance.egresos) >=0) ? "text-green-700":"text-red-700" }`}>
                {balance ? new Intl.NumberFormat("es-PY",{ style:"currency", currency:"PYG", minimumFractionDigits:0 }).format(balance.ingresos - balance.egresos) : "—"}
              </div>
            </div>
            <div className="pt-2">
              <small className="text-gray-500">Última caja: {balance?.ultimaCaja ? new Date(balance.ultimaCaja).toLocaleString() : "—"}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Productos más vendidos</h3>
            <div className="text-sm text-gray-500">Top</div>
          </div>

          {pieData() ? (
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="w-full lg:w-1/2 h-56">
                <Pie data={pieData()} options={{responsive:true, maintainAspectRatio:false}}/>
              </div>
              <div className="w-full lg:w-1/2">
                <ul className="space-y-2">
                  {productosTop.map((p,i)=>(
                    <li key={i} className="flex justify-between items-center">
                      <div className="text-sm">{p.nombre || p.producto || `Producto ${i+1}`}</div>
                      <div className="text-sm font-semibold">{p.cantidad ?? p.total ?? "-"}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-500">Sin datos</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Ventas recientes</h3>
            <div className="text-sm text-gray-500">Últimas</div>
          </div>

          <SmallTable
            title=""
            columns={[
              { key: "id", title: "ID" },
              { key: "cliente", title: "Cliente", render: (r)=> r.cliente_nombre || r.cliente || r.cliente_email || "-" },
              { key: "total", title: "Total", render: (r)=> r.total ? new Intl.NumberFormat("es-PY",{ style:"currency", currency:"PYG", minimumFractionDigits:0 }).format(r.total) : "-" },
              { key: "fecha", title: "Fecha", render: (r)=> r.fecha ? new Date(r.fecha).toLocaleString() : (r.createdAt? new Date(r.createdAt).toLocaleString() : "-") }
            ]}
            rows={ventas}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Resumen rápido</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                <div className="text-sm text-gray-500">Ventas hoy</div>
                <div className="text-lg font-semibold">{balance?.ventasHoy ?? "—"}</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                <div className="text-sm text-gray-500">Pagos pendientes</div>
                <div className="text-lg font-semibold">{balance?.pagosPendientes ?? "—"}</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                <div className="text-sm text-gray-500">Productos en stock bajo</div>
                <div className="text-lg font-semibold">{balance?.productosBajo ?? "—"}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Acciones rápidas</h3>
            <div className="flex flex-col gap-2">
              <Link to="/admin/productos" className="px-3 py-2 bg-violet-100 text-violet-700 rounded flex items-center justify-between">
                Ir a Productos <ArrowUpRight size={18} />
              </Link>
              <Link to="/admin/ventas" className="px-3 py-2 bg-green-100 text-green-700 rounded flex items-center justify-between">
                Ir a Ventas <ArrowDownRight size={18} />
              </Link>
              <Link to="/admin/caja" className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded flex items-center justify-between">
                Ir a Caja <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
