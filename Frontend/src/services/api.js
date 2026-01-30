const API_BASE_URL = "https://dummyjson.com";

export const api = {
  // Get all posts with pagination
  getPosts: async (page = 0, limit = 20) => {
    const skip = page * limit;
    const response = await fetch(
      `${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) throw new Error("Failed to fetch posts");
    const data = await response.json();

    // Transform to match old structure
    return {
      data: data.posts.map((post) => ({
        id: post.id,
        text: post.body,
        image: `https://picsum.photos/seed/${post.id}/800/600`, // Random image
        likes: post.reactions.likes || post.reactions,
        tags: post.tags,
        publishDate: new Date().toISOString(), // DummyJSON doesn't provide dates
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

  // Get posts by tag
  getPostsByTag: async (tag, page = 0, limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/posts/tag/${tag}`);
    if (!response.ok) throw new Error("Failed to fetch posts by tag");
    const data = await response.json();

    // Paginate manually
    const start = page * limit;
    const paginatedPosts = data.posts.slice(start, start + limit);

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

  // Get post by ID with full details
  getPostById: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    const post = await response.json();

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

  // Get comments for a post
  getPostComments: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    const data = await response.json();

    return {
      data: data.comments.map((comment) => ({
        id: comment.id,
        message: comment.body,
        owner: {
          id: comment.user.id,
          firstName: comment.user.username.split(".")[0] || "User",
          lastName: comment.user.username.split(".")[1] || comment.user.id,
          picture: `https://i.pravatar.cc/150?u=${comment.user.id}`,
        },
        publishDate: new Date().toISOString(),
      })),
    };
  },

  // Get all tags
  getTags: async () => {
    const response = await fetch(`${API_BASE_URL}/posts/tag-list`);
    if (!response.ok) throw new Error("Failed to fetch tags");
    const tags = await response.json();

    return {
      data: tags,
    };
  },

  // Get all users
  getUsers: async (page = 0, limit = 20) => {
    const skip = page * limit;
    const response = await fetch(
      `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();

    return {
      data: data.users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.image,
        title: user.company?.title || user.role || "User",
      })),
      total: data.total,
      page: page,
      limit: limit,
    };
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    const user = await response.json();

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
