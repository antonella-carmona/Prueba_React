// ========================================
// CONFIGURACIÓN DE FIREBASE
// Este archivo conecta nuestra app con los servicios de Firebase
// ========================================

// 1. Importar la función principal que inicializa Firebase
import { initializeApp } from "firebase/app";

// 2. Importar funciones para autenticación:
//    - getAuth: Para manejar login/logout
//    - GoogleAuthProvider: Para login específicamente con Google
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 3. Importar función para la base de datos Firestore (donde guardamos usuarios)
import { getFirestore } from "firebase/firestore";

// 4. CONFIGURACIÓN: Credenciales de tu proyecto Firebase
//    import.meta.env lee variables del archivo .env (por seguridad)
//    Estas claves conectan con TU proyecto específico en Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Clave para usar la API de Firebase
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Dominio donde se autentica (blog-test-3b271.firebaseapp.com)
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // ID único de tu proyecto (blog-test-3b271)
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Para guardar archivos (imágenes, etc)
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Para notificaciones push
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // ID único de la app
};

// 5. INICIALIZAR: Crear la conexión con Firebase usando la configuración
//    Esto "enciende" Firebase en tu app
const app = initializeApp(firebaseConfig);

// 6. EXPORTAR auth: Objeto para manejar autenticación (login, logout, usuario actual)
//    Otros archivos lo importan con: import { auth } from '../config/firebase'
export const auth = getAuth(app);

// 7. EXPORTAR googleProvider: Configuración específica para login con Google
//    Le dice a Firebase: "quiero autenticar con Google"
export const googleProvider = new GoogleAuthProvider();

// 8. EXPORTAR db: Objeto para usar la base de datos Firestore
//    Lo usas en Users.jsx para guardar datos con addDoc()
export const db = getFirestore(app);
