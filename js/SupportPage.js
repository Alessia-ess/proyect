function SupportPage() {
  const [form, setForm] = React.useState({
    nombre: "",
    email: "",
    mensaje: "",
    tipo: "soporte",
  });
  const [enviado, setEnviado] = React.useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Contáctanos</h1>
      <p className="mb-6 text-center text-gray-600">
        ¿Tienes una duda, problema o sugerencia? Completa el formulario y te
        responderemos pronto.
      </p>
      {enviado ? (
        <div className="bg-green-100 text-green-700 p-4 rounded text-center mb-6">
          ¡Gracias por tu mensaje! Te contactaremos pronto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tipo de mensaje</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="soporte">Soporte</option>
              <option value="sugerencia">Sugerencia</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Mensaje</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}

