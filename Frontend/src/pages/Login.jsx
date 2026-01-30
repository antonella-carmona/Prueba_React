// ========================================
// PÁGINA LOGIN
// Página para iniciar sesión con Google
// Si el usuario ya está autenticado, redirige a /users
// ========================================

// 1. Importar hook de navegación
import { useNavigate } from "react-router-dom";

// 2. Importar hook de autenticación personalizado
import { useAuth } from "../context/AuthContext";

// 3. Importar hooks de React
import { useEffect, useState } from "react";

// 4. COMPONENTE: Página de inicio de sesión
const Login = () => {
  // 5. OBTENER: usuario actual y función de login desde AuthContext
  const { user, loginWithGoogle } = useAuth();

  // 6. OBTENER: función para navegar a otras rutas
  const navigate = useNavigate();

  // 7. ESTADO: Mensajes de error
  const [error, setError] = useState(null);

  // 8. ESTADO: Indica si está procesando el login
  const [loading, setLoading] = useState(false);

  // 9. EFFECT: Redirigir si el usuario ya está autenticado
  //    Si user cambia y no es null, ir a /users
  useEffect(() => {
    if (user) {
      // 10. Navegar a la página protegida
      navigate("/users");
    }
  }, [user, navigate]); // Dependencias: user y navigate

  // 11. FUNCIÓN: Maneja el click en el botón "Continue with Google"
  const handleGoogleLogin = async () => {
    try {
      // 12. Activar loading y limpiar error previo
      setLoading(true);
      setError(null);

      // 13. Log para debugging
      console.log("Intentando login con Google...");

      // 14. LLAMAR: loginWithGoogle() de AuthContext
      //     Abre popup de Google, espera a que el usuario elija cuenta
      const result = await loginWithGoogle();

      // 15. Si llega aquí, el login fue exitoso
      console.log("Login exitoso:", result);
      // El useEffect de arriba detectará user y redirigirá
    } catch (error) {
      // 16. Si hay error, mostrar detalles en consola
      console.error("Login error completo:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje:", error.message);

      // 17. TRADUCIR: códigos de error de Firebase a mensajes amigables
      let errorMessage = "Error al iniciar sesión";

      // 18. ERROR: Usuario cerró el popup sin completar el login
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Cerraste el popup. Intenta nuevamente.";
      }
      // 19. ERROR: Navegador bloqueó el popup
      else if (error.code === "auth/popup-blocked") {
        errorMessage =
          "El navegador bloqueó el popup. Habilita los popups para este sitio.";
      }
      // 20. ERROR: Este dominio no está configurado en Firebase Console
      else if (error.code === "auth/unauthorized-domain") {
        errorMessage =
          "Este dominio no está autorizado. Configura Firebase correctamente.";
      }
      // 21. ERROR: Google Sign-In no está habilitado en Firebase Console
      else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Google Sign-In no está habilitado en Firebase.";
      }
      // 22. ERROR: Cualquier otro error, usar mensaje original
      else {
        errorMessage = error.message;
      }

      // 23. Guardar mensaje en estado para mostrarlo en la UI
      setError(errorMessage);
    } finally {
      // 24. Desactivar loading siempre, haya éxito o error
      setLoading(false);
    }
  };

  return (
    // 25. CONTENEDOR: Centrado vertical y horizontal
    //     min-h-[calc(100vh-4rem)] = altura completa menos navbar
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      {/* 26. TARJETA DE LOGIN: max-w-md = ancho máximo mediano */}
      <div className="max-w-md w-full">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* 27. ENCABEZADO: Icono, título y descripción */}
          <div className="text-center mb-8">
            {/* 28. ICONO: Candado circular con color naranja Infobae */}
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* 29. Path SVG: dibujo del candado */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {/* 30. TÍTULO: Welcome Back */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>

            {/* 31. DESCRIPCIÓN: Explica para qué sirve el login */}
            <p className="text-gray-600">
              Sign in to access the users directory
            </p>
          </div>

          {/* 32. BOTÓN DE GOOGLE SIGN-IN */}
          {/* disabled={loading} = deshabilitado mientras está procesando */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-orange-500 hover:shadow-lg transition-all font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* 33. CONDICIONAL: Si está loading, mostrar spinner */}
            {loading ? (
              <>
                {/* 34. SPINNER: Círculo que gira */}
                <svg
                  className="animate-spin h-5 w-5 text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* 35. Circle de fondo (opacity-25) */}
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  {/* 36. Path que gira (opacity-75) */}
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {/* 37. Texto mientras está cargando */}
                <span>Conectando...</span>
              </>
            ) : (
              <>
                {/* 38. LOGO DE GOOGLE: colores oficiales */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  {/* 39. Azul de Google */}
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  {/* 40. Verde de Google */}
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  {/* 41. Amarillo de Google */}
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  {/* 42. Rojo de Google */}
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {/* 43. Texto del botón */}
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* 44. MENSAJE DE ERROR: Solo se muestra si hay error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start">
                {/* 45. Icono de alerta */}
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  {/* 46. Mostrar mensaje de error */}
                  <p className="text-sm font-medium text-red-800">{error}</p>

                  {/* 47. Sugerencia: ver consola para más detalles */}
                  <p className="text-xs text-red-600 mt-1">
                    Verifica la consola del navegador (F12) para más detalles
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 48. PIE DE PÁGINA: Texto informativo */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Protected route - Authentication required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 49. EXPORTAR componente
export default Login;
