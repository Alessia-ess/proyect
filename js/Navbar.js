function Navbar({ cartCount, onSearchClick, onSupportClick }) {
  return (
    <nav className="bg-gradient-to-b from-blue-200 to-pink-200 h-24 flex justify-between items-center px-6 shadow-md sticky top-0 z-50">
      <a href="#home" className="flex items-center gap-3">
        <img src="tvirtual/logo1.png" alt="Logo" className="h-14" />
        <span className="font-italianno text-3xl font-bold">Muse Shop</span>
      </a>

      <div className="flex items-center gap-4">
        <a href="#home" className="p-2 hover:bg-white/20 rounded-full">
          <i className="fas fa-home text-xl"></i>
        </a>

        <button
          onClick={onSearchClick}
          className="p-2 hover:bg-white/20 rounded-full"
        >
          <i className="fas fa-headphones text-xl"></i>
        </button>

        <a href="#login" className="p-2 hover:bg-white/20 rounded-full">
          <i className="fas fa-user text-xl"></i>
        </a>

        <a href="#cart" className="p-2 hover:bg-white/20 rounded-full relative">
          <i className="fas fa-shopping-cart text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </a>

        <button
          onClick={onSupportClick}
          className="p-2 hover:bg-white/20 rounded-full"
        >
          <i className="fas fa-headset text-xl"></i>
        </button>

        <a href="#help" className="p-2 hover:bg-white/20 rounded-full">
          <i className="fas fa-question-circle text-xl"></i>
        </a>
      </div>
    </nav>
  );
}
