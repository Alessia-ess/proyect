const { useState } = React;

function AlbumDetail({ album, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  // Validación segura con valores por defecto mejorados
  const safeAlbum = {
    ...album,
    name: album && album.name ? album.name : "Álbum sin nombre",
    image: album && album.image ? album.image : "/default-album.jpg",
    price: album && album.price ? album.price : 0,
    tracks:
      album && album.tracks ? album.tracks : ["Información no disponible"],
    description:
      album && album.description
        ? album.description
        : "Descripción no disponible",
    details: album && album.details ? album.details : "Detalles no disponibles",
    theme: {
      bg:
        album && album.theme && album.theme.bg
          ? album.theme.bg
          : "bg-gradient-to-r from-gray-800 to-gray-900",
      text:
        album && album.theme && album.theme.text
          ? album.theme.text
          : "text-white",
      button:
        album && album.theme && album.theme.button
          ? album.theme.button
          : "bg-blue-600 hover:bg-blue-700 text-white",
    },
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + amount)));
  };

  const handleAddToCart = () => {
    onAddToCart({ album, quantity });
    window.location.hash = "#cart";
  };

  const totalPrice = (safeAlbum.price * quantity).toFixed(2);

  return (
    <div
      className={`min-h-screen ${safeAlbum.theme.bg} ${safeAlbum.theme.text} p-4`}
      aria-labelledby="album-title"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Volver al listado"
        >
          <span className="text-2xl">←</span>
          <span>Volver al listado</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sección de imagen */}
          <div className="relative bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden aspect-square">
            <img
              src={safeAlbum.image}
              alt={`Portada del álbum ${safeAlbum.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/default-album.jpg";
                e.target.alt = "Portada no disponible";
              }}
            />
          </div>

          {/* Sección de detalles */}
          <div className="space-y-6">
            <h1 id="album-title" className="text-4xl font-bold">
              {safeAlbum.name}
            </h1>

            <p className="text-3xl font-bold text-white/90">
              ${safeAlbum.price.toFixed(2)}
            </p>

            <section aria-labelledby="description-heading">
              <h2 id="description-heading" className="sr-only">
                Descripción
              </h2>
              <p className="text-lg text-white/80">{safeAlbum.description}</p>
            </section>

            {/* Lista de canciones */}
            <section aria-labelledby="tracklist-heading">
              <h2
                id="tracklist-heading"
                className="text-2xl font-semibold mb-3"
              >
                Lista de canciones
              </h2>
              <ul className="space-y-2">
                {safeAlbum.tracks.map((track, index) => (
                  <li
                    key={`${track}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-white/60 w-6">{index + 1}.</span>
                    <span>{track}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Detalles del producto */}
            <section aria-labelledby="details-heading">
              <h2 id="details-heading" className="text-2xl font-semibold mb-3">
                Detalles del álbum
              </h2>
              <p className="text-white/80">{safeAlbum.details}</p>
            </section>

            {/* Controles de compra */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <div
                className="flex items-center bg-white/20 rounded-full"
                role="group"
                aria-label="Selector de cantidad"
              >
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 hover:bg-white/10 rounded-l-full focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={quantity <= 1}
                  aria-label="Reducir cantidad"
                >
                  -
                </button>
                <span className="px-4" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 hover:bg-white/10 rounded-r-full focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={quantity >= 10}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-full font-bold transition-all ${safeAlbum.theme.button} hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label={`Añadir ${quantity} copia(s) al carrito por $${totalPrice}`}
              >
                Añadir al carrito - ${totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
