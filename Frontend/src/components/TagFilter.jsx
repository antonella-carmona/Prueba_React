import { useEffect, useState } from "react";
import { api } from "../services/api";

const TagFilter = ({ selectedTag, onTagSelect }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await api.getTags();
      setTags(data.data || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl shadow-lg border border-white/20 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
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
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedTag
              ? "bg-blue-600 text-white shadow-md scale-105"
              : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
          }`}
        >
          All Posts
        </button>
        {tags.slice(0, 15).map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTag === tag
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
