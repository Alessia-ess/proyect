function Catalogo({ albums, onAddToCart, onAlbumSelect }) {
  const { useState } = React;

  // Estados para búsqueda
  const [showSearch, setShowSearch] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  const [searchQuery, setSearchQuery] = useState("");

  // Manejar selección de álbum (para SearchBar)
  const handleAlbumSelect = (album) => {
    window.location.hash = `album=${album.id}`;
  };

  // Filtrar álbumes
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredAlbums(
      query.trim() === ""
        ? albums
        : albums.filter(
            (album) =>
              album.name.toLowerCase().includes(query.toLowerCase()) ||
              album.artist.toLowerCase().includes(query.toLowerCase())
          )
    );
  };

  // Añadir al carrito desde la tarjeta de álbum
  const handleAddToCart = (album, e) => {
    e.stopPropagation(); // Evita que se active el click en la tarjeta
    onAddToCart(album);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header con título y botón de búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Nuestro Catálogo</h1>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowSearch(true)}
            className="bg-white/80 hover:bg-white text-pink-500 font-medium px-5 py-2 rounded-full 
             border-2 border-pink-300 shadow-sm hover:shadow-md backdrop-blur-sm 
             transition duration-200 hover:scale-105"
          >
            Buscar álbumes
          </button>
        </div>
      </div>

      {/* Modal de búsqueda */}
      {showSearch && (
        <SearchBar
          albums={albums}
          onClose={() => setShowSearch(false)}
          onAlbumSelect={handleAlbumSelect}
        />
      )}

      {/* Listado de álbumes */}
      {filteredAlbums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              onClick={() => (window.location.hash = `album=${album.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group relative"
            >
              <img
                src={album.image}
                alt={album.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">
                  {album.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{album.artist}</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">
                    ${album.price.toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => handleAddToCart(album, e)}
                    className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
                    title="Añadir al carrito"
                  >
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="fas fa-music text-4xl text-gray-300 mb-4"></i>
          <p className="text-xl text-gray-500">
            {searchQuery
              ? `No se encontraron resultados para "${searchQuery}"`
              : "No hay álbumes disponibles"}
          </p>
        </div>
      )}
    </div>
  );
}
