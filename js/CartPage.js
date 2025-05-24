function CartPage({ cart, updateQuantity, removeFromCart, onCheckout }) {
  const [shipping, setShipping] = useState("standard");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = shipping === "standard" ? 5 : 0;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(1, Math.min(100, value));
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
          <p className="text-xl text-gray-500 mb-4">Tu carrito está vacío</p>
          <a
            href="#home"
            className="inline-block bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition"
          >
            Ver álbumes
          </a>
        </div>
      ) : !showPayment ? (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-wrap sm:flex-nowrap items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4 mb-2 sm:mb-0"
                  />
                  <div className="flex-1 min-w-[120px] mr-4 mb-2 sm:mb-0">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-selector flex items-center mr-4 mb-2 sm:mb-0">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 h-8 border-t border-b text-center"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold w-20 text-right mb-2 sm:mb-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                    aria-label="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Resumen</h2>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Método de envío</h3>
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShipping("standard")}
                    className={`flex-1 py-2 text-sm ${
                      shipping === "standard"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Estándar ($5)
                  </button>
                  <button
                    onClick={() => setShipping("pickup")}
                    className={`flex-1 py-2 text-sm ${
                      shipping === "pickup"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Pick-up (Gratis)
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition"
              >
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6">Método de pago</h2>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPaymentMethod("credit")}
              className={`w-full flex items-center gap-3 p-3 border rounded text-left ${
                paymentMethod === "credit"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <i className="far fa-credit-card text-blue-500 text-xl"></i>
              <span>Tarjeta de crédito/débito</span>
            </button>
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`w-full flex items-center gap-3 p-3 border rounded text-left ${
                paymentMethod === "paypal"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <i className="fab fa-paypal text-blue-500 text-xl"></i>
              <span>PayPal</span>
            </button>
            <button
              onClick={() => setPaymentMethod("transfer")}
              className={`w-full flex items-center gap-3 p-3 border rounded text-left ${
                paymentMethod === "transfer"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-university text-blue-500 text-xl"></i>
              <span>Transferencia bancaria</span>
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPayment(false)}
              className="flex-1 border border-black text-black py-2 rounded font-medium hover:bg-gray-100 transition"
            >
              Regresar
            </button>
            <button
              onClick={() => {
                if (paymentMethod) {
                  onCheckout({ paymentMethod, shippingMethod: shipping });
                  setShowPayment(false);
                } else {
                  alert("Por favor selecciona un método de pago");
                }
              }}
              className="flex-1 bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
              disabled={!paymentMethod}
            >
              Confirmar pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
