export default function ResumenCaja({ resumen }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md flex justify-around space-x-4">
      <div>
        <p className="text-gray-500">Total Ingresos</p>
        <p className="text-green-600 font-bold text-lg">${resumen.total_ingresos}</p>
      </div>
      <div>
        <p className="text-gray-500">Total Egresos</p>
        <p className="text-red-600 font-bold text-lg">${resumen.total_egresos}</p>
      </div>
      <div>
        <p className="text-gray-500">Saldo Final</p>
        <p className="text-blue-600 font-bold text-lg">${resumen.saldo_final}</p>
      </div>
    </div>
  );
}
