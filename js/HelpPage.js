function HelpPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const helpItems = [
    {
      question: "¿Cómo realizar una compra?",
      answer: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Navega por nuestros álbumes y haz clic en 'Añadir al carrito'</li>
          <li>Ve a tu carrito (pestaña #cart)</li>
          <li>Selecciona método de envío</li>
          <li>Procede al pago seguro</li>
          <li>Recibe confirmación por email</li>
        </ul>
      ),
    },
    {
      question: "Métodos de pago aceptados",
      answer: (
        <div className="space-y-2">
          <p className="font-semibold">Aceptamos:</p>
          <ul className="list-disc pl-5">
            <li>Tarjetas (Visa, MasterCard, Amex)</li>
            <li>PayPal</li>
            <li>Transferencias bancarias</li>
            <li>Criptomonedas (Bitcoin, Ethereum)</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Políticas de envío",
      answer: (
        <div className="space-y-3">
          <div>
            <p className="font-semibold">Envío estándar:</p>
            <p>$5 (3-5 días hábiles)</p>
          </div>
          <div>
            <p className="font-semibold">Retiro en tienda:</p>
            <p>Gratis (previa cita)</p>
          </div>
          <div>
            <p className="font-semibold">Envíos internacionales:</p>
            <p>Varían según destino (7-14 días hábiles)</p>
          </div>
        </div>
      ),
    },
    {
      question: "Devoluciones y reembolsos",
      answer: (
        <div className="space-y-2">
          <p>
            Aceptamos devoluciones dentro de los <strong>30 días</strong>{" "}
            posteriores a la compra.
          </p>
          <p>Requisitos:</p>
          <ul className="list-disc pl-5">
            <li>Producto en empaque original</li>
            <li>Sin señales de uso</li>
            <li>Recibo de compra</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Contactar al soporte",
      answer: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Horario:</p>
            <p>Lunes a Viernes 9am-6pm</p>
            <p>Sábados 10am-2pm</p>
          </div>
          <div>
            <p className="font-semibold">Contacto:</p>
            <p>Email: soporte@museshop.com</p>
            <p>Teléfono: +1 (555) 123-4567</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Centro de Ayuda
        </h1>
        <p className="text-gray-600">
          Encuentra respuestas a tus preguntas frecuentes
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {helpItems.map((item, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className={`w-full p-6 text-left flex justify-between items-center transition-colors ${
                activeIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              aria-expanded={activeIndex === index}
              aria-controls={`help-item-${index}`}
            >
              <span className="text-lg font-medium text-gray-800">
                {item.question}
              </span>
              <i
                className={`fas ${
                  activeIndex === index
                    ? "fa-minus text-blue-500"
                    : "fa-plus text-gray-400"
                }`}
              />
            </button>

            <div
              id={`help-item-${index}`}
              className={`transition-all duration-300 overflow-hidden ${
                activeIndex === index ? "max-h-96 p-6" : "max-h-0"
              }`}
            >
              <div className="text-gray-700 space-y-3">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          ¿No encontraste lo que buscabas?
        </h2>
        <p className="mb-4">
          Nuestro equipo de soporte está listo para ayudarte
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Contactar Soporte
        </button>
      </div>
    </div>
  );
}
