function SearchBar({ albums, onClose, onAlbumSelect }) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  React.useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = albums
        .filter((album) =>
          album.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, albums]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Buscar en Muse Shop
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar álbumes, artistas..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto border-t">
          {results.length > 0 ? (
            results.map((album) => (
              <div
                key={album.id}
                onClick={() => {
                  onAlbumSelect(album);
                  onClose();
                }}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors flex items-center gap-4 border-b"
              >
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-12 h-12 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {album.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${album.price.toFixed(2)}
                  </p>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            ))
          ) : query.length > 1 ? (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-search fa-2x mb-3 opacity-30"></i>
              <p>No encontramos "{query}"</p>
              <p className="text-sm mt-1">Prueba con otras palabras</p>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-search fa-2x mb-3 opacity-30"></i>
              <p>Escribe para buscar álbumes</p>
              <p className="text-sm mt-1">Mínimo 2 caracteres</p>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="p-3 bg-gray-50 text-right text-sm text-gray-500">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </div>
        )}
      </div>
    </div>
  );
}
