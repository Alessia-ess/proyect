const { useState } = React;

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? "Inicio de sesión exitoso" : "Registro completado");
    window.location.hash = "#home";
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex border-b mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 font-medium ${
              isLogin
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 font-medium ${
              !isLogin
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition"
          >
            {isLogin ? "Ingresar" : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
