import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Login = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/users");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Intentando login con Google...");
      const result = await loginWithGoogle();
      console.log("Login exitoso:", result);
    } catch (error) {
      console.error("Login error completo:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje:", error.message);

      // Mensajes de error más específicos
      let errorMessage = "Error al iniciar sesión";

      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Cerraste el popup. Intenta nuevamente.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage =
          "El navegador bloqueó el popup. Habilita los popups para este sitio.";
      } else if (error.code === "auth/unauthorized-domain") {
        errorMessage =
          "Este dominio no está autorizado. Configura Firebase correctamente.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Google Sign-In no está habilitado en Firebase.";
      } else {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access the users directory
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 hover:shadow-lg transition-all font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Conectando...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start">
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
                  <p className="text-sm font-medium text-red-800">{error}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Verifica la consola del navegador (F12) para más detalles
                  </p>
                </div>
              </div>
            </div>
          )}

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

export default Login;
