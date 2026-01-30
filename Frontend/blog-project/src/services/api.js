const API_BASE_URL = 'https://dummyapi.io/data/v1';
const APP_ID = import.meta.env.VITE_DUMMYAPI_APP_ID;

const headers = {
  'app-id': APP_ID
};

export const api = {
  // Get all posts with pagination
  getPosts: async (page = 0, limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/post?page=${page}&limit=${limit}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  // Get posts by tag
  getPostsByTag: async (tag, page = 0, limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/tag/${tag}/post?page=${page}&limit=${limit}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch posts by tag');
    return response.json();
  },

  // Get post by ID with full details
  getPostById: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/post/${postId}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  // Get comments for a post
  getPostComments: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/post/${postId}/comment`, { headers });
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  // Get all tags
  getTags: async () => {
    const response = await fetch(`${API_BASE_URL}/tag`, { headers });
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  },

  // Get all users
  getUsers: async (page = 0, limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/user?page=${page}&limit=${limit}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  }
};
