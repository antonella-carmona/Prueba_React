// ========================================
// TARJETA DE POST
// Componente que muestra un post individual con imagen, autor, tags y likes
// ========================================

// 1. Importar useState para manejar la apertura/cierre del modal
import { useState } from "react";

// 2. Importar el modal de comentarios
import CommentsModal from "./CommentsModal";

// 3. COMPONENTE: Recibe un post como prop desde Home.jsx
//    post contiene: id, image, text, owner, tags, likes, publishDate
const PostCard = ({ post }) => {
  // 4. ESTADO: Controla si el modal de comentarios está abierto
  //    false = modal cerrado | true = modal abierto
  const [showComments, setShowComments] = useState(false);

  return (
    // 5. FRAGMENT: <> </> permite devolver múltiples elementos sin div extra
    <>
      {/* 6. ARTICLE: Tarjeta del post con efecto glass y hover */}
      {/* card-hover = efecto definido en index.css (elevación al pasar mouse) */}
      <article className="glass-effect rounded-2xl shadow-lg card-hover overflow-hidden border border-white/20">
        {/* 7. CONTENEDOR CLICKEABLE: Todo el post es clickeable para abrir comentarios */}
        {/* onClick={() => setShowComments(true)} = cambia estado a true */}
        {/* cursor-pointer = manita al pasar el mouse */}
        <div className="cursor-pointer" onClick={() => setShowComments(true)}>
          {/* 8. IMAGEN PRINCIPAL del post */}
          {/* aspect-video = relación 16:9 (típico de videos) */}
          {/* overflow-hidden = esconde partes de la imagen que sobresalen */}
          <div className="aspect-video w-full overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt={post.text}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {/* hover:scale-105 = crece 5% al pasar mouse (efecto zoom) */}
            {/* loading="lazy" = carga la imagen solo cuando está visible (optimización) */}
          </div>

          {/* 9. CONTENIDO: Cuerpo de la tarjeta con padding */}
          <div className="p-6">
            {/* 10. SECCIÓN DEL AUTOR: Foto y nombre */}
            <div className="flex items-center space-x-3 mb-4">
              {/* 11. FOTO DEL AUTOR circular */}
              <img
                src={post.owner.picture}
                alt={`${post.owner.firstName} ${post.owner.lastName}`}
                className="w-10 h-10 rounded-full"
              />

              {/* 12. INFO DEL AUTOR: Nombre y fecha */}
              <div>
                {/* 13. NOMBRE completo del autor */}
                <p className="text-sm font-medium text-gray-900">
                  {post.owner.firstName} {post.owner.lastName}
                </p>

                {/* 14. FECHA de publicación formateada */}
                {/* new Date() convierte string a objeto fecha */}
                {/* toLocaleDateString() lo formatea a texto legible */}
                <p className="text-xs text-gray-500">
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* 15. TEXTO DEL POST */}
            {/* line-clamp-3 = máximo 3 líneas, resto con "..." */}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
              {post.text}
            </p>

            {/* 16. TAGS: Etiquetas del post */}
            {/* flex-wrap = si no caben, pasan a la siguiente línea */}
            <div className="flex flex-wrap gap-2">
              {/* 17. MAPEAR tags: Convertir array de tags en spans */}
              {/* .map((tag, index) => ...) recorre cada tag */}
              {/* key={index} = identificador único para React */}
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100/80 rounded-full hover:bg-blue-200/80 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* 18. FOOTER: Likes y botón de comentarios */}
            {/* border-t = línea superior divisoria */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              {/* 19. Fila con likes a la izquierda y link a comentarios a la derecha */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                {/* 20. LIKES: Icono de corazón + número */}
                <span className="flex items-center space-x-1">
                  {/* 21. Icono SVG de corazón */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>

                  {/* 22. NÚMERO de likes */}
                  <span>{post.likes}</span>
                </span>

                {/* 23. TEXTO: Indicador para ver comentarios */}
                {/* → = flecha hacia la derecha */}
                <span className="text-blue-600 font-medium hover:text-blue-700">
                  View comments →
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 24. MODAL DE COMENTARIOS: Siempre está en el DOM pero invisible */}
      {/* isOpen={showComments} = controla visibilidad */}
      {/* onClose={() => setShowComments(false)} = función para cerrar */}
      {/* postId={post.id} = ID para obtener comentarios de este post */}
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        postId={post.id}
      />
    </>
  );
};

// 25. EXPORTAR para usarlo en Home.jsx
export default PostCard;
