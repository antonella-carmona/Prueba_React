import { useState, useEffect } from 'react';
import { api } from '../services/api';
import PostCard from '../components/PostCard';
import TagFilter from '../components/TagFilter';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [selectedTag, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedTag) {
        data = await api.getPostsByTag(selectedTag, page);
      } else {
        data = await api.getPosts(page);
      }
      setPosts(data.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setPage(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Discover Stories
        </h1>
        <p className="text-gray-600">
          Explore the latest posts from our community
        </p>
      </div>

      <div className="mb-8">
        <TagFilter selectedTag={selectedTag} onTagSelect={handleTagSelect} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found for this tag</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
              Page {page + 1}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={posts.length < 20}
              className="px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
