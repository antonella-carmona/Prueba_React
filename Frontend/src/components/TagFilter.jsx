// ========================================
// FILTRO DE TAGS
// Componente que muestra botones para filtrar posts por tag
// ========================================

// 1. Importar hooks de React
import { useEffect, useState } from "react";

// 2. Importar servicio API para obtener tags
import { api } from "../services/api";

// 3. COMPONENTE: Recibe props de Home.jsx
//    selectedTag = tag actualmente seleccionado (null si es "All Posts")
//    onTagSelect = función para cambiar el tag (viene de Home.jsx)
const TagFilter = ({ selectedTag, onTagSelect }) => {
  // 4. ESTADO: Array para guardar la lista de tags disponibles
  const [tags, setTags] = useState([]);

  // 5. ESTADO: Indica si está cargando los tags
  const [loading, setLoading] = useState(true);

  // 6. EFFECT: Cargar tags cuando el componente se monta
  //    [] = dependencias vacías = solo se ejecuta una vez al inicio
  useEffect(() => {
    fetchTags();
  }, []);

  // 7. FUNCIÓN: Obtiene todos los tags disponibles de la API
  const fetchTags = async () => {
    try {
      // 8. Llamar al endpoint que devuelve lista de tags
      //    DummyJSON tiene un endpoint /posts/tag-list
      const data = await api.getTags();

      // 9. Guardar tags en el estado
      //    data.data contiene el array de tags como strings ["history", "love", etc]
      setTags(data.data || []);
    } catch (error) {
      // 10. Si hay error, mostrar en consola
      console.error("Error fetching tags:", error);
    } finally {
      // 11. Siempre desactivar loading al terminar
      setLoading(false);
    }
  };

  // 12. GUARDIA: Mientras carga, mostrar skeleton (placeholders animados)
  if (loading) {
    return (
      // 13. Skeleton: 4 rectángulos grises que pulsan (animate-pulse)
      //     Simula los botones que aparecerán
      <div className="animate-pulse flex space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
        ))}
      </div>
    );
  }

  // 14. RENDERIZADO del componente cuando ya cargaron los tags
  return (
    // 15. Contenedor con efecto glass
    <div className="glass-effect rounded-2xl shadow-lg border border-white/20 p-6">
      {/* 16. TÍTULO con icono de etiqueta */}
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        {/* 17. Icono SVG de etiqueta/tag */}
        <svg
          className="w-5 h-5 mr-2 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        Filter by Tag
      </h3>

      {/* 18. CONTENEDOR DE BOTONES: flex-wrap permite que pasen a la siguiente línea */}
      <div className="flex flex-wrap gap-2">
        {/* 19. BOTÓN "ALL POSTS": Resetea el filtro */}
        {/* onClick={() => onTagSelect(null)} = llama función de Home.jsx con null */}
        {/* null = sin filtro, mostrar todos los posts */}
        <button
          onClick={() => onTagSelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            // 20. CONDICIONAL DE ESTILOS:
            //     Si NO hay tag seleccionado (!selectedTag)
            //     → fondo naranja Infobae, texto blanco, ligeramente más grande
            //     Si hay tag seleccionado
            //     → fondo blanco semi-transparente, texto gris
            !selectedTag
              ? "bg-orange-600 text-white shadow-md scale-105"
              : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
          }`}
        >
          All Posts
        </button>

        {/* 21. BOTONES DE TAGS: Uno por cada tag disponible */}
        {/* tags.slice(0, 15) = tomar solo los primeros 15 tags */}
        {/* (evita mostrar demasiados botones si hay muchos) */}
        {tags.slice(0, 15).map((tag) => (
          // 22. BOTÓN individual para cada tag
          // key={tag} = identificador único (React lo requiere)
          // onClick={() => onTagSelect(tag)} = filtrar posts por este tag
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              // 23. CONDICIONAL DE ESTILOS:
              //     Si este tag es el seleccionado (selectedTag === tag)
              //     → fondo naranja Infobae, texto blanco, más grande (activo)
              //     Si NO es el seleccionado
              //     → fondo blanco semi-transparente, texto gris (inactivo)
              selectedTag === tag
                ? "bg-orange-600 text-white shadow-md scale-105"
                : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
            }`}
          >
            {/* 24. Texto del botón con # antes del tag */}#{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// 25. EXPORTAR para usarlo en Home.jsx
export default TagFilter;
