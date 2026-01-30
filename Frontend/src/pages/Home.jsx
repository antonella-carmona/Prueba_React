// ========================================
// PÁGINA HOME (PRINCIPAL)
// Muestra el listado de posts con filtrado por tags y paginación
// ========================================

// 1. Importar hooks de React
import { useState, useEffect } from "react";

// 2. Importar servicio API
import { api } from "../services/api";

// 3. Importar componentes
import PostCard from "../components/PostCard";
import TagFilter from "../components/TagFilter";

// 4. COMPONENTE: Página principal de la aplicación
const Home = () => {
  // 5. ESTADO: Array de posts que se muestran en la página
  //    Empieza vacío [], se llena con datos de la API
  const [posts, setPosts] = useState([]);

  // 6. ESTADO: Indica si está cargando posts
  //    Empieza en true porque cargamos al inicio
  const [loading, setLoading] = useState(true);

  // 7. ESTADO: Tag seleccionado para filtrar
  //    null = sin filtro (All Posts)
  //    string = tag específico (ej: "history", "love")
  const [selectedTag, setSelectedTag] = useState(null);

  // 8. ESTADO: Página actual para paginación
  //    Empieza en 0 (primera página)
  const [page, setPage] = useState(0);

  // 9. ESTADO: Guarda mensajes de error si algo falla
  const [error, setError] = useState(null);

  // 10. EFFECT: Cargar posts cuando cambia el tag o la página
  //     [selectedTag, page] = dependencias, se re-ejecuta si cambian
  useEffect(() => {
    fetchPosts();
  }, [selectedTag, page]);

  // 11. FUNCIÓN: Obtiene posts de la API
  const fetchPosts = async () => {
    // 12. Activar loading y limpiar error previo
    setLoading(true);
    setError(null);

    try {
      // 13. Log para debugging (ver en consola del navegador)
      console.log("Fetching posts...", { selectedTag, page });

      let data;

      // 14. CONDICIONAL: Si hay tag seleccionado, filtrar por tag
      //     Si NO hay tag, traer todos los posts
      if (selectedTag) {
        // 15. Obtener posts del tag específico
        //     Ej: api.getPostsByTag("history", 0)
        data = await api.getPostsByTag(selectedTag, page);
      } else {
        // 16. Obtener todos los posts
        //     Ej: api.getPosts(0) trae página 0
        data = await api.getPosts(page);
      }

      // 17. Log para ver qué llegó de la API
      console.log("Posts received:", data);

      // 18. Guardar posts en el estado
      //     data.data contiene el array de posts
      //     || [] es por si data.data es undefined
      setPosts(data.data || []);
    } catch (error) {
      // 19. Si hay error, mostrarlo en consola y guardarlo en estado
      console.error("Error fetching posts:", error);
      setError(error.message);
    } finally {
      // 20. Siempre desactivar loading al terminar
      setLoading(false);
    }
  };

  // 21. FUNCIÓN: Maneja cuando el usuario selecciona un tag
  //     Recibe el tag desde TagFilter.jsx
  const handleTagSelect = (tag) => {
    // 22. Cambiar tag seleccionado
    setSelectedTag(tag);

    // 23. Resetear a página 0 cuando se cambia el filtro
    //     Evita estar en página 3 de "history" y cambiar a "love" que solo tiene 1 página
    setPage(0);
  };

  return (
    // 24. Contenedor principal con padding
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 25. ENCABEZADO: Título y descripción */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
          Discover Stories
        </h1>
        <p className="text-blue-100 text-lg">
          Explore the latest posts from our community
        </p>
      </div>

      {/* 26. COMPONENTE TagFilter: Botones para filtrar por tag */}
      {/* Le pasamos el tag actual y la función para cambiarlo */}
      <div className="mb-8">
        <TagFilter selectedTag={selectedTag} onTagSelect={handleTagSelect} />
      </div>

      {/* 27. RENDERIZADO CONDICIONAL: Mostrar error, loading, vacío o posts */}
      {error ? (
        // 28. CASO 1: Hay error → Mostrar mensaje de error con botón reintentar
        <div className="text-center py-12 glass-effect rounded-2xl border border-red-300 bg-red-50 p-8">
          {/* 29. Icono de alerta */}
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
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
          <p className="text-red-700 text-lg font-medium mb-2">
            Error loading posts
          </p>
          {/* 30. Mostrar mensaje de error */}
          <p className="text-red-600 text-sm">{error}</p>
          {/* 31. Botón para volver a intentar */}
          <button
            onClick={fetchPosts}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        // 32. CASO 2: Está cargando → Mostrar skeletons (placeholders animados)
        // Grid de 6 tarjetas fake que pulsan
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            // 33. Skeleton: Tarjeta placeholder que pulsa
            <div
              key={i}
              className="animate-pulse glass-effect rounded-2xl p-4 border border-white/20"
            >
              {/* 34. Rectángulo gris que simula imagen */}
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 aspect-video rounded-xl mb-4"></div>
              {/* 35. Líneas grises que simulan texto */}
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        // 36. CASO 3: No hay posts → Mostrar mensaje vacío
        <div className="text-center py-12 glass-effect rounded-2xl border border-white/20 p-8">
          {/* 37. Icono de documento */}
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {/* 38. Mensaje que cambia según si hay tag o no */}
          <p className="text-gray-700 text-lg font-medium">
            No posts found{selectedTag ? " for this tag" : ""}
          </p>
        </div>
      ) : (
        // 39. CASO 4: Hay posts → Mostrar grid de PostCards
        <>
          {/* 40. GRID DE POSTS: 1 columna en móvil, 2 en tablet, 3 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 41. MAPEAR posts: Crear un PostCard por cada post */}
            {/* key={post.id} = identificador único para React */}
            {/* post={post} = pasar el objeto post completo como prop */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* 42. PAGINACIÓN: Botones Previous/Next y número de página */}
          <div className="flex justify-center mt-8 space-x-4">
            {/* 43. BOTÓN PREVIOUS: Ir a página anterior */}
            {/* Math.max(0, page - 1) = no puede ser negativo */}
            {/* disabled={page === 0} = deshabilitado si estamos en página 0 */}
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed glass-effect border border-white/20 text-gray-700 hover:shadow-lg"
            >
              Previous
            </button>

            {/* 44. INDICADOR: Muestra página actual */}
            {/* page + 1 porque page empieza en 0 (página 1 es índice 0) */}
            <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg">
              Page {page + 1}
            </span>

            {/* 45. BOTÓN NEXT: Ir a página siguiente */}
            {/* disabled={posts.length < 20} = si hay menos de 20, no hay más páginas */}
            {/* Cada página trae 20 posts, si trae menos es porque es la última */}
            <button
              onClick={() => setPage(page + 1)}
              disabled={posts.length < 20}
              className="px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed glass-effect border border-white/20 text-gray-700 hover:shadow-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// 46. EXPORTAR para usarlo en App.jsx
export default Home;
