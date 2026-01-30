// ========================================
// SERVICIO API
// Todas las llamadas a DummyJSON API
// Transforma las respuestas al formato que espera la aplicación
// ========================================

// 1. URL BASE: DummyJSON API pública (reemplaza dummyapi.io que dejó de funcionar)
const API_BASE_URL = "https://dummyjson.com";

// 2. OBJETO API: Exportar todas las funciones disponibles
export const api = {
  // ========================================
  // POSTS
  // ========================================

  // 3. FUNCIÓN: Obtener posts con paginación
  //    page = número de página (0, 1, 2, ...)
  //    limit = cantidad de posts por página (default 20)
  getPosts: async (page = 0, limit = 20) => {
    // 4. CALCULAR: skip = cuántos posts saltar
    //    Ej: page=0, skip=0 (primeros 20)
    //        page=1, skip=20 (posts 21-40)
    const skip = page * limit;

    // 5. FETCH: Hacer petición GET a la API
    //    ?limit=20&skip=0 = parámetros de query
    const response = await fetch(
      `${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`,
    );

    // 6. VALIDAR: Si no es OK (status 200-299), lanzar error
    if (!response.ok) throw new Error("Failed to fetch posts");

    // 7. PARSEAR: Convertir respuesta JSON a objeto JavaScript
    const data = await response.json();
    // data = { posts: [...], total: 150, skip: 0, limit: 20 }

    // 8. TRANSFORMAR: DummyJSON tiene estructura diferente a dummyapi.io
    //    Mapeamos cada post a la estructura que espera la app
    return {
      data: data.posts.map((post) => ({
        // 9. ID del post
        id: post.id,

        // 10. TEXTO: post.body es el contenido
        text: post.body,

        // 11. IMAGEN: Picsum Photos genera imágenes aleatorias
        //     seed=${post.id} = misma imagen para mismo post siempre
        image: `https://picsum.photos/seed/${post.id}/800/600`,

        // 12. LIKES: DummyJSON devuelve { likes: 5, dislikes: 2 }
        //     Tomamos solo los likes
        likes: post.reactions.likes || post.reactions,

        // 13. TAGS: Array de strings (ej: ["history", "love"])
        tags: post.tags,

        // 14. FECHA: DummyJSON no provee fechas, usamos fecha actual
        publishDate: new Date().toISOString(),

        // 15. OWNER: Información del autor del post
        owner: {
          id: post.userId, // ID del usuario
          firstName: `User`, // DummyJSON no da nombre en /posts
          lastName: `${post.userId}`, // Usamos ID como apellido
          // 16. AVATAR: Pravatar genera avatares consistentes
          picture: `https://i.pravatar.cc/150?u=${post.userId}`,
          title: post.title, // Título del post
        },
      })),
      // 17. METADATA: Total de posts, página actual, límite
      total: data.total,
      page: page,
      limit: limit,
    };
  },

  // 18. FUNCIÓN: Obtener posts filtrados por tag
  //     tag = string (ej: "history", "love")
  //     DummyJSON devuelve TODOS los posts del tag, debemos paginar manualmente
  getPostsByTag: async (tag, page = 0, limit = 20) => {
    // 19. FETCH: Endpoint de DummyJSON para posts por tag
    const response = await fetch(`${API_BASE_URL}/posts/tag/${tag}`);

    // 20. VALIDAR respuesta
    if (!response.ok) throw new Error("Failed to fetch posts by tag");

    // 21. PARSEAR respuesta
    const data = await response.json();

    // 22. PAGINAR MANUALMENTE: DummyJSON devuelve todo, cortamos nosotros
    //     start = índice inicial
    //     start + limit = índice final
    const start = page * limit;
    const paginatedPosts = data.posts.slice(start, start + limit);

    // 23. TRANSFORMAR: Igual que getPosts
    return {
      data: paginatedPosts.map((post) => ({
        id: post.id,
        text: post.body,
        image: `https://picsum.photos/seed/${post.id}/800/600`,
        likes: post.reactions.likes || post.reactions,
        tags: post.tags,
        publishDate: new Date().toISOString(),
        owner: {
          id: post.userId,
          firstName: `User`,
          lastName: `${post.userId}`,
          picture: `https://i.pravatar.cc/150?u=${post.userId}`,
          title: post.title,
        },
      })),
      total: data.total,
      page: page,
      limit: limit,
    };
  },

  // 24. FUNCIÓN: Obtener un post específico por ID
  //     Actualmente no se usa, pero está disponible
  getPostById: async (postId) => {
    // 25. FETCH: Endpoint para post individual
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

    // 26. VALIDAR respuesta
    if (!response.ok) throw new Error("Failed to fetch post");

    // 27. PARSEAR: Devuelve el post directamente (no array)
    const post = await response.json();

    // 28. TRANSFORMAR: Mismo formato
    return {
      id: post.id,
      text: post.body,
      image: `https://picsum.photos/seed/${post.id}/800/600`,
      likes: post.reactions.likes || post.reactions,
      tags: post.tags,
      publishDate: new Date().toISOString(),
      owner: {
        id: post.userId,
        firstName: `User`,
        lastName: `${post.userId}`,
        picture: `https://i.pravatar.cc/150?u=${post.userId}`,
        title: post.title,
      },
    };
  },

  // ========================================
  // COMMENTS
  // ========================================

  // 29. FUNCIÓN: Obtener comentarios de un post
  //     Se usa en CommentsModal.jsx
  getPostComments: async (postId) => {
    // 30. FETCH: Endpoint para comentarios de un post
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`);

    // 31. VALIDAR respuesta
    if (!response.ok) throw new Error("Failed to fetch comments");

    // 32. PARSEAR respuesta
    const data = await response.json();
    // data = { comments: [...], total: 5, skip: 0, limit: 30 }

    // 33. TRANSFORMAR: Mapear comentarios al formato esperado
    return {
      data: data.comments.map((comment) => ({
        // 34. ID del comentario
        id: comment.id,

        // 35. MENSAJE: comment.body es el texto
        message: comment.body,

        // 36. OWNER: Autor del comentario
        owner: {
          id: comment.user.id,

          // 37. NOMBRE: DummyJSON da username (ej: "john.doe")
          //     Separamos por "." para firstName y lastName
          firstName: comment.user.username.split(".")[0] || "User",
          lastName: comment.user.username.split(".")[1] || comment.user.id,

          // 38. AVATAR: Pravatar con ID del usuario
          picture: `https://i.pravatar.cc/150?u=${comment.user.id}`,
        },

        // 39. FECHA: DummyJSON no da fecha, usamos actual
        publishDate: new Date().toISOString(),
      })),
    };
  },

  // ========================================
  // TAGS
  // ========================================

  // 40. FUNCIÓN: Obtener lista de todos los tags disponibles
  //     Se usa en TagFilter.jsx
  getTags: async () => {
    // 41. FETCH: Endpoint que devuelve array de strings
    const response = await fetch(`${API_BASE_URL}/posts/tag-list`);

    // 42. VALIDAR respuesta
    if (!response.ok) throw new Error("Failed to fetch tags");

    // 43. PARSEAR: Devuelve array directamente
    //     Ej: ["history", "american", "crime", "french", ...]
    const tags = await response.json();

    // 44. RETORNAR: Envolver en objeto { data: [...] }
    //     Para mantener consistencia con otros endpoints
    return {
      data: tags,
    };
  },

  // ========================================
  // USERS
  // ========================================

  // 45. FUNCIÓN: Obtener usuarios con paginación
  //     Se usa en Users.jsx
  getUsers: async (page = 0, limit = 20) => {
    // 46. CALCULAR skip (igual que en getPosts)
    const skip = page * limit;

    // 47. FETCH: Endpoint de usuarios con paginación
    const response = await fetch(
      `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`,
    );

    // 48. VALIDAR respuesta
    if (!response.ok) throw new Error("Failed to fetch users");

    // 49. PARSEAR respuesta
    const data = await response.json();
    // data = { users: [...], total: 208, skip: 0, limit: 20 }

    // 50. TRANSFORMAR: Mapear usuarios al formato esperado
    return {
      data: data.users.map((user) => ({
        // 51. ID del usuario
        id: user.id,

        // 52. NOMBRE: DummyJSON provee firstName y lastName
        firstName: user.firstName,
        lastName: user.lastName,

        // 53. EMAIL del usuario
        email: user.email,

        // 54. FOTO: DummyJSON provee URL de imagen real
        picture: user.image,

        // 55. TÍTULO: Puede venir de company.title, role, o default "User"
        //     ?.  = optional chaining, no falla si company es null
        //     || = OR, usa el primero que no sea falsy
        title: user.company?.title || user.role || "User",
      })),
      // 56. METADATA: Total, página actual, límite
      total: data.total,
      page: page,
      limit: limit,
    };
  },

  // 57. FUNCIÓN: Obtener un usuario específico por ID
  //     Actualmente no se usa, pero está disponible
  getUserById: async (userId) => {
    // 58. FETCH: Endpoint para usuario individual
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);

    // 59. VALIDAR respuesta
    if (!response.ok) throw new Error("Failed to fetch user");

    // 60. PARSEAR: Devuelve el usuario directamente
    const user = await response.json();

    // 61. TRANSFORMAR: Mismo formato que getUsers
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picture: user.image,
      title: user.company?.title || user.role || "User",
    };
  },
};

// ========================================
// RESUMEN DE ENDPOINTS DISPONIBLES
// ========================================
//
// POSTS:
// - api.getPosts(page, limit) → Lista de posts con paginación
// - api.getPostsByTag(tag, page, limit) → Posts filtrados por tag
// - api.getPostById(postId) → Post específico
//
// COMMENTS:
// - api.getPostComments(postId) → Comentarios de un post
//
// TAGS:
// - api.getTags() → Lista de todos los tags
//
// USERS:
// - api.getUsers(page, limit) → Lista de usuarios con paginación
// - api.getUserById(userId) → Usuario específico
//
// ========================================
