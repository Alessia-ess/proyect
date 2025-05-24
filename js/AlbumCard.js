function AlbumCard({ album, onAddToCart, onSelect }) {
  const theme = album.theme || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    button: "bg-blue-500 hover:bg-blue-600 text-white",
  };

  const handleSelect = (e) => {
    e.preventDefault();
    onSelect(album);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(album);
  };

  return (
    <div
      className={`album-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.bg} ${theme.text}`}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleSelect(e)}
      aria-label={`Ver detalles de ${album.name}`}
    >
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={album.image}
          alt={`Portada del álbum ${album.name}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-album.jpg";
            e.target.alt = "Portada no disponible";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 hover:opacity-80">
          {album.name}
        </h3>
        <p className="font-bold mb-3">${album.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded font-bold transition ${theme.button} focus:outline-none focus:ring-2 focus:ring-offset-2`}
          aria-label={`Añadir ${album.name} al carrito`}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
