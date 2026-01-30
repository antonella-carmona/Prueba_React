// ========================================
// BARRA DE NAVEGACIÓN
// Menú superior que se muestra en todas las páginas
// ========================================

// 1. Importar Link de React Router para navegar sin recargar la página
import { Link } from "react-router-dom";

// 2. Importar el hook personalizado para acceder al usuario y logout
import { useAuth } from "../context/AuthContext";

// 3. COMPONENTE: Navbar principal de la aplicación
const Navbar = () => {
  
  // 4. OBTENER DATOS: Extraer user y logout del contexto de autenticación
  //    user = null si no está logueado, objeto si está logueado
  //    logout = función para cerrar sesión
  const { user, logout } = useAuth();

  return (
    // 5. NAV: Contenedor principal con efecto glass y borde
    //    glass-effect = transparencia con blur (definido en index.css)
    <nav className="glass-effect shadow-2xl border-b border-white/20 backdrop-blur-xl">
      
      {/* 6. Contenedor con ancho máximo y padding responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 7. Fila principal: Logo/links a la izquierda, usuario a la derecha */}
        {/* justify-between = espacio entre los grupos */}
        <div className="flex justify-between items-center h-16">
          
          {/* 8. LADO IZQUIERDO: Logo y links de navegación */}
          <div className="flex items-center space-x-8">
            
            {/* 9. LOGO: Link a home con efecto gradiente en el texto */}
            {/* bg-gradient-to-r = gradiente de izquierda a derecha */}
            {/* bg-clip-text = aplica el gradiente solo al texto */}
            {/* text-transparent = hace el texto transparente para ver el gradiente */}
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition"
            >
              Blog<span className="text-purple-600">.</span>
            </Link>
            
            {/* 10. LINKS DE NAVEGACIÓN: Se ocultan en móvil (hidden md:flex) */}
            {/* md:flex = mostrar en pantallas medianas y grandes */}
            <div className="hidden md:flex space-x-6">
              
              {/* 11. Link a Posts (página principal) */}
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Posts
              </Link>
              
              {/* 12. CONDICIONAL: Link a Users solo si hay usuario logueado */}
              {/* {user && ...} = renderizar solo si user existe (no es null) */}
              {user && (
                <Link
                  to="/users"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Users
                </Link>
              )}
            </div>
          </div>

          {/* 13. LADO DERECHO: Info de usuario o botón Sign In */}
          <div className="flex items-center space-x-4">
            
            {/* 14. CONDICIONAL: Mostrar diferentes cosas según si hay usuario */}
            {/* user ? ... : ... = operador ternario (si hay user, muestra X, sino Y) */}
            {user ? (
              // 15. CASO 1: Usuario logueado → Mostrar foto, nombre y logout
              <div className="flex items-center space-x-4">
                
                {/* 16. Foto y nombre del usuario */}
                <div className="flex items-center space-x-3">
                  
                  {/* 17. FOTO DE PERFIL del usuario (viene de Google) */}
                  {/* user.photoURL es proporcionado por Google Sign-In */}
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-md"
                  />
                  
                  {/* 18. NOMBRE del usuario */}
                  {/* hidden sm:block = oculto en móvil, visible en pantallas pequeñas+ */}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.displayName}
                  </span>
                </div>
                
                {/* 19. BOTÓN LOGOUT: Cierra la sesión al hacer click */}
                {/* onClick={logout} ejecuta la función logout de AuthContext */}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              // 20. CASO 2: NO hay usuario → Mostrar botón Sign In
              {/* Link a /login con estilo de botón con gradiente */}
              {/* hover:scale-105 = crece ligeramente al pasar el mouse */}
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// 21. EXPORTAR: Para usarlo en App.jsx
export default Navbar;
