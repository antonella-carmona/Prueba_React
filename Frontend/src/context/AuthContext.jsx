// ========================================
// CONTEXTO DE AUTENTICACIÓN
// Sistema global para manejar el estado del usuario en toda la app
// ========================================

// 1. Importar herramientas de React:
//    - createContext: Crea un "almacén" global de datos
//    - useContext: Lee datos del contexto
//    - useState: Maneja datos que cambian (user, loading)
//    - useEffect: Ejecuta código cuando la página carga
import { createContext, useContext, useState, useEffect } from "react";

// 2. Importar la configuración de Firebase que creamos
import { auth, googleProvider } from "../config/firebase";

// 3. Importar funciones específicas de autenticación de Firebase:
//    - signInWithPopup: Abre popup de Google para login
//    - signOut: Cierra sesión
//    - onAuthStateChanged: Escucha cambios en el estado de autenticación
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// 4. CREAR EL CONTEXTO: El "almacén" donde se guarda el usuario
//    Empieza vacío (undefined), luego lo llenamos con user, loginWithGoogle, etc
const AuthContext = createContext();

// 5. HOOK PERSONALIZADO: Facilita usar el contexto en otros componentes
//    En lugar de hacer useContext(AuthContext), solo haces useAuth()
export const useAuth = () => {
  // Lee el contexto actual
  const context = useContext(AuthContext);

  // Si alguien intenta usar useAuth() fuera de AuthProvider, lanza error
  // Protección: asegura que el contexto esté disponible
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  // Devuelve el contexto (user, loginWithGoogle, logout, loading)
  return context;
};

// 6. PROVEEDOR: Componente que envuelve la app y comparte el usuario
//    { children } = todo lo que está dentro (App, pages, components)
export const AuthProvider = ({ children }) => {
  // 7. ESTADO: user guarda la información del usuario logueado
  //    null = no hay usuario logueado
  //    objeto = usuario logueado con { displayName, email, photoURL, etc }
  const [user, setUser] = useState(null);

  // 8. ESTADO: loading indica si aún estamos verificando si hay usuario
  //    true = verificando... | false = ya verificamos
  const [loading, setLoading] = useState(true);

  // 9. EFFECT: Se ejecuta UNA VEZ cuando el componente carga
  useEffect(() => {
    // 10. OBSERVADOR: Firebase vigila cambios en autenticación 24/7
    //     Si el usuario hace login → llama esta función con currentUser
    //     Si hace logout → llama con currentUser = null
    //     Si recarga la página → recupera el usuario si seguía logueado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Actualiza el estado con el usuario actual (o null si no hay)
      setUser(currentUser);
      // Ya terminamos de verificar, quitamos el loading
      setLoading(false);
    });

    // 11. CLEANUP: Cuando el componente se desmonta, deja de vigilar
    //     Evita memory leaks (fugas de memoria)
    return () => unsubscribe();
  }, []); // [] = ejecutar solo al montar el componente

  // 12. FUNCIÓN: Login con Google (async porque espera respuesta de Firebase)
  const loginWithGoogle = async () => {
    try {
      // Abre popup de Google, espera que el usuario se autentique
      // result contiene toda la info: user, credential, etc
      const result = await signInWithPopup(auth, googleProvider);

      // Devuelve solo la info del usuario
      return result.user;
    } catch (error) {
      // Si algo falla (usuario cierra popup, error de red), muestra error
      console.error("Error logging in:", error);
      // Lanza el error para que lo maneje quien llamó la función
      throw error;
    }
  };

  // 13. FUNCIÓN: Logout (cierra sesión)
  const logout = async () => {
    try {
      // Le dice a Firebase: "cierra la sesión de este usuario"
      // Automáticamente onAuthStateChanged detecta esto y setUser(null)
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // 14. VALOR: Lo que compartimos con toda la app
  //     Cualquier componente que use useAuth() tendrá acceso a esto
  const value = {
    user, // Usuario actual (null o objeto)
    loginWithGoogle, // Función para hacer login
    logout, // Función para cerrar sesión
    loading, // Si aún estamos cargando
  };

  // 15. PROVIDER: Envuelve a children y les da acceso al value
  //     children = todo lo que envolvemos en App.jsx (<AuthProvider>...</AuthProvider>)
  //     {!loading && children} = Solo muestra children cuando terminó de cargar
  //     Evita que la app se muestre antes de verificar si hay usuario
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
