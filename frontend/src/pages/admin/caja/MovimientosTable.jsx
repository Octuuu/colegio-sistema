export default function MovimientosTable({ movimientos }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Monto</th>
          <th>Registrado Por</th>
        </tr>
      </thead>
      <tbody>
        {movimientos.map((mov) => (
          <tr key={mov.id}>
            <td>{mov.fecha ? new Date(mov.fecha).toLocaleDateString() : '-'}</td>
            <td>{mov.tipo}</td>
            <td>{mov.descripcion}</td>
            <td>₲{Number(mov.monto).toLocaleString()}</td>
            <td>{mov.registrado_por}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
