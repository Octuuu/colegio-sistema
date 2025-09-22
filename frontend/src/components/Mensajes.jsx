const Mensaje = ({ mensajes, onClose }) => {
  if (!mensajes || mensajes.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {mensajes.map((msg, index) => (
        <div
          key={index}
          className={`px-4 py-2 rounded shadow text-white ${
            msg.tipo === "error" ? "bg-red-600" : "bg-yellow-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{msg.texto}</span>
            <button onClick={() => onClose(index)} className="ml-4 font-bold">x</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mensaje;
