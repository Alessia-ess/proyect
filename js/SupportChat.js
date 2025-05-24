function SupportChat({ onClose, isMobile }) {
  const [messages, setMessages] = React.useState([
    {
      text: "¡Hola! Soy tu asistente de Muse Shop. ¿En qué puedo ayudarte hoy?",
      sender: "agent",
    },
  ]);

  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { text: newMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Gracias por tu mensaje. Un agente te responderá pronto.",
          sender: "agent",
        },
      ]);
    }, 1000);
  };

  const containerClasses = isMobile
    ? "fixed inset-x-0 bottom-0 top-24 z-40 bg-white shadow-xl flex flex-col"
    : "fixed bottom-4 right-4 w-80 max-h-[500px] z-50 rounded-lg bg-white shadow-xl flex flex-col";

  return ReactDOM.createPortal(
    <div className={containerClasses}>
      <div className="bg-blue-500 p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold text-white">Atención al cliente</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div
        className="flex-1 p-3 overflow-y-auto"
        style={{
          maxHeight: isMobile ? "calc(100vh - 170px)" : "300px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-lg p-3 mb-2 max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t flex gap-2 bg-gray-50">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>,
    document.body
  );
}
