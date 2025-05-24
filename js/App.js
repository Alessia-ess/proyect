import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SupportChat from "./SupportChat";
import AlbumCard from "./AlbumCard";
import AlbumDetail from "./AlbumDetail";
import AuthPage from "./AuthPage";
import CartPage from "./CartPage";
import HelpPage from "./HelpPage";
import Footer from "./Footer";

function App() {
  const [view, setView] = useState("home");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrito con mejor manejo de errores
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("museShopCart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      return [];
    }
  });

  // Carga de datos más robusta
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/js/data.Product.json");
        if (!response.ok) throw new Error("Error al cargar los álbumes");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Formato de datos inválido");
        setAlbumsData(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Detección de móvil optimizada
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  // Manejo de rutas mejorado
  useEffect(() => {
    const handleHashChange = () => {
      const [route, param] = window.location.hash.substring(1).split("=");

      switch (route) {
        case "cart":
          setView("cart");
          break;
        case "login":
          setView("login");
          break;
        case "help":
          setView("help");
          break;
        case "album":
          const albumId = parseInt(param);
          const album = albumsData.find((a) => a.id === albumId);
          setSelectedAlbum(album || null);
          setView(album ? "album" : "home");
          break;
        default:
          setView("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [albumsData]);

  // Funciones del carrito optimizadas

  const addToCart = (album, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === album.id);
      return existing
        ? prev.map((item) =>
            item.id === album.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { ...album, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setCart([]);
    window.location.hash = "";
    alert("¡Compra realizada con éxito!");
  };

  // Persistencia del carrito
  useEffect(() => {
    try {
      localStorage.setItem("museShopCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  }, [cart]);

  // Contador del carrito memorizado
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Renderizado condicional mejorado
  const renderView = () => {
    if (loading)
      return <div className="text-center py-8">Cargando catálogo...</div>;
    if (error)
      return (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      );

    switch (view) {
      case "album":
        return (
          selectedAlbum && (
            <AlbumDetail
              album={selectedAlbum}
              onBack={() => (window.location.hash = "")}
              onAddToCart={addToCart}
            />
          )
        );
      case "login":
        return <AuthPage />;
      case "cart":
        return (
          <CartPage
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
        );
      case "help":
        return <HelpPage />;
      default:
        return (
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
              Álbumes Destacados
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {albumsData.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onAddToCart={addToCart}
                  onSelect={() => {
                    setSelectedAlbum(album);
                    window.location.hash = `album=${album.id}`;
                  }}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  // Función debounce para resize
  function debounce(func, wait) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        cartCount={cartCount}
        onSearchClick={() => setShowSearch(true)}
        onSupportClick={() => setShowSupport(true)}
      />

      {showSearch && (
        <SearchBar
          albums={albumsData}
          onClose={() => setShowSearch(false)}
          onAlbumSelect={(album) => {
            setSelectedAlbum(album);
            window.location.hash = `album=${album.id}`;
          }}
        />
      )}

      {showSupport && (
        <SupportChat
          onClose={() => setShowSupport(false)}
          isMobile={isMobile}
        />
      )}

      <main className="flex-grow p-4 md:p-6">{renderView()}</main>

      <Footer />
    </div>
  );
}
