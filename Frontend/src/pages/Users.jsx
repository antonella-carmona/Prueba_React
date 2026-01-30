// ========================================
// PÁGINA USERS (PROTEGIDA)
// Lista de usuarios con paginación
// Guarda automáticamente cada página de usuarios en Firestore
// Solo accesible si el usuario está autenticado
// ========================================

// 1. Importar hooks de React
import { useState, useEffect } from "react";

// 2. Importar servicio API
import { api } from "../services/api";

// 3. Importar configuración de Firebase
import { db } from "../config/firebase";

// 4. Importar funciones de Firestore
//    collection = referencia a una colección
//    addDoc = agregar documento
//    getDocs = obtener documentos
//    query = construir consultas
//    orderBy = ordenar resultados
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// 5. COMPONENTE: Página de usuarios (protegida)
const Users = () => {
  // 6. ESTADO: Array de usuarios actuales
  const [users, setUsers] = useState([]);

  // 7. ESTADO: Indica si está cargando
  const [loading, setLoading] = useState(true);

  // 8. ESTADO: Página actual para paginación
  const [page, setPage] = useState(0);

  // 9. EFFECT: Se ejecuta cuando cambia la página
  //    Carga usuarios de la API Y los guarda en Firestore
  useEffect(() => {
    fetchUsers(); // Obtener usuarios para mostrar
    saveUsersToFirestore(); // Guardar usuarios en base de datos
  }, [page]); // Dependencia: page

  // 10. FUNCIÓN: Obtiene usuarios de la API para mostrarlos
  const fetchUsers = async () => {
    // 11. Activar loading
    setLoading(true);

    try {
      // 12. Llamar a la API: traer 20 usuarios de la página actual
      const data = await api.getUsers(page, 20);

      // 13. Guardar en estado
      setUsers(data.data || []);
    } catch (error) {
      // 14. Mostrar error en consola
      console.error("Error fetching users:", error);
    } finally {
      // 15. Desactivar loading
      setLoading(false);
    }
  };

  // 16. FUNCIÓN: Guarda usuarios en Firestore (persistencia)
  //     Esta función se ejecuta cada vez que se cambia de página
  //     Cumple con el requerimiento de "Persistir datos contra base de datos no relacional"
  const saveUsersToFirestore = async () => {
    try {
      // 17. Obtener usuarios de la API
      const data = await api.getUsers(page, 20);

      // 18. REFERENCIA: Colección "users" en Firestore
      //     Si no existe, Firestore la crea automáticamente
      const usersCollection = collection(db, "users");

      // 19. GUARDAR: Iterar sobre cada usuario y agregarlo a Firestore
      //     for...of = espera a que cada addDoc termine antes de continuar
      for (const user of data.data || []) {
        // 20. AGREGAR DOCUMENTO: Crear un nuevo documento en la colección
        //     addDoc genera un ID único automáticamente
        await addDoc(usersCollection, {
          userId: user.id, // ID del usuario de la API
          firstName: user.firstName, // Nombre
          lastName: user.lastName, // Apellido
          email: user.email, // Email
          picture: user.picture, // URL de la foto
          title: user.title || "", // Título (Mr, Ms, etc)
          savedAt: new Date().toISOString(), // Fecha de guardado
        });
      }
      // 21. NOTA: Firestore es NoSQL, cada documento se guarda independiente
      //     Estructura: users (colección) -> documento1, documento2, etc.
    } catch (error) {
      // 22. Mostrar error en consola si falla
      console.error("Error saving to Firestore:", error);
    }
  };

  // 23. RENDERIZADO CONDICIONAL: Si está cargando, mostrar skeletons
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 24. GRID DE SKELETONS: 1 col en móvil, 2 en tablet, 4 en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 25. MAPEAR: Crear 8 skeletons */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              {/* 26. Cuadrado gris (foto placeholder) */}
              <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
              {/* 27. Línea gris (nombre placeholder) */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              {/* 28. Línea gris (email placeholder) */}
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    // 29. CONTENEDOR PRINCIPAL
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 30. ENCABEZADO: Título y descripción */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
          Community Members
        </h1>
        <p className="text-blue-100 text-lg">
          Meet the people behind the stories
        </p>
      </div>

      {/* 31. GRID DE USUARIOS: Tarjetas responsivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 32. MAPEAR: Crear una tarjeta por cada usuario */}
        {users.map((user) => (
          <div
            key={user.id}
            className="glass-effect rounded-2xl shadow-lg card-hover overflow-hidden border border-white/20"
          >
            {/* 33. CONTENEDOR DE FOTO: aspect-square = mantiene proporción 1:1 */}
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              {/* 34. IMAGEN: object-cover = rellena todo el espacio sin deformar */}
              <img
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 35. INFORMACIÓN DEL USUARIO */}
            <div className="p-4">
              {/* 36. NOMBRE: title + firstName + lastName */}
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {user.title} {user.firstName} {user.lastName}
              </h3>

              {/* 37. EMAIL */}
              <p className="text-sm text-gray-600 mb-2">{user.email}</p>

              {/* 38. FECHA DE NACIMIENTO: Solo se muestra si existe */}
              {user.dateOfBirth && (
                <p className="text-xs text-gray-500">
                  {/* 39. Formatear fecha: new Date().toLocaleDateString() */}
                  Born: {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 40. CONTROLES DE PAGINACIÓN */}
      <div className="flex justify-center mt-8 space-x-4">
        {/* 41. BOTÓN PREVIOUS: Ir a página anterior */}
        {/* Math.max(0, page - 1) = no puede ser menor a 0 */}
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed glass-effect border border-white/20 text-gray-700 hover:shadow-lg"
        >
          Previous
        </button>

        {/* 42. INDICADOR: Muestra página actual (page + 1 porque empieza en 0) */}
        <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg">
          Page {page + 1}
        </span>

        {/* 43. BOTÓN NEXT: Ir a página siguiente */}
        {/* disabled={users.length < 20} = si hay menos de 20, es la última página */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={users.length < 20}
          className="px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed glass-effect border border-white/20 text-gray-700 hover:shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// 44. EXPORTAR componente
export default Users;
