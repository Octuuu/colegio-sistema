const InsumosDisponibles = ({ insumos, agregarAlCarrito, formatCurrency }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold">Insumos para comprar:</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {insumos.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => agregarAlCarrito(i)}
            className="border p-2 rounded flex justify-between items-center hover:bg-yellow-100"
          >
            <span>{i.nombre} - {formatCurrency(i.precio_unitario)}</span>
            <span className="text-yellow-600 font-bold ml-2">+</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InsumosDisponibles;
