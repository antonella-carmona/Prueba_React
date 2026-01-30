// ========================================
// MODAL DE COMENTARIOS
// Ventana emergente que muestra los comentarios de un post
// ========================================

// 1. Importar hooks de React:
//    - useEffect: Para cargar comentarios cuando se abre el modal
//    - useState: Para guardar comentarios y estado de carga
import { useEffect, useState } from "react";

// 2. Importar el servicio API que trae los comentarios desde DummyJSON
import { api } from "../services/api";

// 3. COMPONENTE: Recibe props desde PostCard.jsx
//    - isOpen: booleano que indica si el modal está abierto (true/false)
//    - onClose: función para cerrar el modal (viene de PostCard)
//    - postId: ID del post del cual queremos ver comentarios
const CommentsModal = ({ isOpen, onClose, postId }) => {
  // 4. ESTADO: Array para guardar los comentarios
  //    Empieza vacío [], se llena cuando llegan de la API
  const [comments, setComments] = useState([]);

  // 5. ESTADO: Indica si estamos cargando comentarios
  //    false = no está cargando | true = cargando...
  const [loading, setLoading] = useState(false);

  // 6. EFFECT: Se ejecuta cuando cambia isOpen o postId
  //    Solo carga comentarios si el modal está abierto Y hay postId
  useEffect(() => {
    if (isOpen && postId) {
      fetchComments(); // Llama la función que trae comentarios
    }
  }, [isOpen, postId]); // Dependencias: vuelve a ejecutar si cambian

  // 7. FUNCIÓN: Obtiene comentarios de la API
  const fetchComments = async () => {
    // 8. Activar indicador de carga (muestra spinner)
    setLoading(true);

    try {
      // 9. Llamar a la API con el ID del post
      //    api.getPostComments(postId) hace fetch a dummyjson.com/comments/post/{postId}
      const data = await api.getPostComments(postId);

      // 10. Guardar comentarios en el estado
      //     data.data contiene el array de comentarios
      //     || [] es por si data.data es undefined, usa array vacío
      setComments(data.data || []);
    } catch (error) {
      // 11. Si hay error (sin internet, API caída), mostrar en consola
      console.error("Error fetching comments:", error);
    } finally {
      // 12. Siempre (error o éxito) desactivar loading
      setLoading(false);
    }
  };

  // 13. GUARDIA: Si el modal está cerrado, no renderizar nada
  //     Esto evita que el modal esté en el DOM cuando no se necesita
  if (!isOpen) return null;

  // 14. RENDERIZADO del modal
  return (
    // 15. FONDO OSCURO: Capa semi-transparente que cubre toda la pantalla
    //     fixed = posición fija en pantalla
    //     inset-0 = ocupa todo (top:0, right:0, bottom:0, left:0)
    //     z-50 = aparece sobre todo lo demás
    //     onClick={onClose} = Cerrar al hacer click en el fondo
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 16. CONTENEDOR DEL MODAL: La caja blanca con los comentarios */}
      {/* onClick={(e) => e.stopPropagation()} = NO cerrar al hacer click dentro del modal */}
      {/* stopPropagation evita que el click se propague al fondo */}
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 17. HEADER: Título y botón de cerrar */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          {/* 18. Título con contador de comentarios */}
          <h2 className="text-xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>

          {/* 19. BOTÓN CERRAR: X en la esquina superior derecha */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            {/* 20. Icono X (cruz) en SVG */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 21. CUERPO: Contenido con scroll si hay muchos comentarios */}
        {/* overflow-y-auto = scroll vertical si es necesario */}
        {/* max-h-[calc(80vh-80px)] = altura máxima - 80px del header */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* 22. CONDICIONAL: Mostrar spinner, mensaje vacío, o lista de comentarios */}
          {loading ? (
            // 23. CASO 1: Está cargando → Mostrar spinner animado
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : comments.length === 0 ? (
            // 24. CASO 2: No hay comentarios → Mostrar mensaje
            <div className="text-center py-8">
              <p className="text-gray-500">No comments yet</p>
            </div>
          ) : (
            // 25. CASO 3: Hay comentarios → Mostrar lista
            // space-y-4 = espaciado vertical entre comentarios
            <div className="space-y-4">
              {/* 26. MAPEAR: Convertir cada comentario en un componente visual */}
              {/* .map() recorre el array de comentarios y crea un div por cada uno */}
              {comments.map((comment) => (
                // 27. TARJETA de comentario individual
                // key={comment.id} = identificador único (React lo necesita)
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  {/* 28. Layout: Foto a la izquierda, contenido a la derecha */}
                  <div className="flex items-start space-x-3">
                    {/* 29. FOTO del usuario que comentó */}
                    <img
                      src={comment.owner.picture}
                      alt={`${comment.owner.firstName} ${comment.owner.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />

                    {/* 30. CONTENIDO: Nombre, fecha y mensaje */}
                    <div className="flex-1">
                      {/* 31. Fila con nombre y fecha */}
                      <div className="flex items-center space-x-2 mb-1">
                        {/* 32. Nombre del usuario */}
                        <span className="font-medium text-gray-900">
                          {comment.owner.firstName} {comment.owner.lastName}
                        </span>

                        {/* 33. Fecha del comentario (convertida a texto legible) */}
                        <span className="text-xs text-gray-500">
                          {new Date(comment.publishDate).toLocaleDateString()}
                        </span>
                      </div>

                      {/* 34. MENSAJE del comentario */}
                      <p className="text-gray-700 text-sm">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 35. EXPORTAR el componente para usarlo en PostCard.jsx
export default CommentsModal;
