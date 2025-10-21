export default function MovimientosTable({ movimientos }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Fecha</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Monto</th>
            <th className="p-2">Registrado Por</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((mov) => {
            let tipoEtiqueta = mov.tipo_movimiento;
            if (mov.venta_id) tipoEtiqueta = 'venta';
            if (mov.compra_id) tipoEtiqueta = 'compra';
            if (mov.pago_matricula_id) tipoEtiqueta = 'matrícula';
            if (mov.pago_mensualidad_id) tipoEtiqueta = 'mensualidad';

            return (
              <tr key={mov.id} className="border-b">
                <td className="p-2">{new Date(mov.fecha).toLocaleDateString()}</td>
                <td className={`p-2 font-bold ${['ingreso', 'apertura', 'venta', 'matrícula', 'mensualidad'].includes(tipoEtiqueta) ? 'text-green-600' : 'text-red-600'}`}>
                  {tipoEtiqueta}
                </td>
                <td className="p-2">{mov.descripcion}</td>
                <td className="p-2">${mov.monto}</td>
                <td className="p-2">{mov.registrado_por}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
