function CartComponent({ items, onRemoveItem, onUpdateQuantity }) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 shadow-lg rounded-lg w-80 z-50">
      <h2 className="font-bold text-lg mb-4">Carrito ({items.length})</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <div className="space-y-4">
          <div className="max-h-64 overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border-b pb-3 mb-3"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} c/u
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            <button
              className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              onClick={() => (window.location.hash = "#checkout")}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
