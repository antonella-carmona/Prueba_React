import { useState, useEffect } from "react";
import { api } from "../services/api";
import PostCard from "../components/PostCard";
import TagFilter from "../components/TagFilter";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [selectedTag, page]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching posts...", { selectedTag, page });
      let data;
      if (selectedTag) {
        data = await api.getPostsByTag(selectedTag, page);
      } else {
        data = await api.getPosts(page);
      }
      console.log("Posts received:", data);
      setPosts(data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setPage(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
          Discover Stories
        </h1>
        <p className="text-blue-100 text-lg">
          Explore the latest posts from our community
        </p>
      </div>

      <div className="mb-8">
        <TagFilter selectedTag={selectedTag} onTagSelect={handleTagSelect} />
      </div>

      {error ? (
        <div className="text-center py-12 glass-effect rounded-2xl border border-red-300 bg-red-50 p-8">
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
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse glass-effect rounded-2xl p-4 border border-white/20"
            >
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 aspect-video rounded-xl mb-4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 glass-effect rounded-2xl border border-white/20 p-8">
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
          <p className="text-gray-700 text-lg font-medium">
            No posts found{selectedTag ? " for this tag" : ""}
          </p>
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
              className="px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed glass-effect border border-white/20 text-gray-700 hover:shadow-lg"
            >
              Previous
            </button>
            <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg">
              Page {page + 1}
            </span>
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

export default Home;
