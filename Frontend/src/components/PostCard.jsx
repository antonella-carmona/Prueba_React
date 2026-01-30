import { useState } from "react";
import CommentsModal from "./CommentsModal";

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <article className="glass-effect rounded-2xl shadow-lg card-hover overflow-hidden border border-white/20">
        <div className="cursor-pointer" onClick={() => setShowComments(true)}>
          <div className="aspect-video w-full overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt={post.text}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.owner.picture}
                alt={`${post.owner.firstName} ${post.owner.lastName}`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.owner.firstName} {post.owner.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
              {post.text}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100/80 rounded-full hover:bg-blue-200/80 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center space-x-1">
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
                  <span>{post.likes}</span>
                </span>
                <span className="text-blue-600 font-medium hover:text-blue-700">
                  View comments →
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        postId={post.id}
      />
    </>
  );
};

export default PostCard;
