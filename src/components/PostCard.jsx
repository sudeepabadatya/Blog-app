import { Link } from "react-router-dom";

import { usePosts } from "../hooks/usePosts";

import { Heart } from "lucide-react";

export default function PostCard({ post }) {
  const { toggleLike, likes } = usePosts();
  const liked = !!likes[post.id];

  return (
    <div
      className="group rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
          {post.category}
        </span>

        <button
          onClick={() => toggleLike(post.id)}
          className="p-1 rounded-full hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={liked ? "fill-current text-red-500" : ""}
          />
        </button>
      </div>

      <Link to={`/post/${post.id}`} className="block">
        <h3 className="font-semibold text-lg group-hover:underline">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {post.description}
        </p>
      </Link>
    </div>
  );
}

