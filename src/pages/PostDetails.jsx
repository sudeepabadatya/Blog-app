import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = usePosts();
  const post = posts.find((p) => p.id === id);

  if (!post)
    return <div className="max-w-3xl mx-auto p-4">Post not found.</div>;
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
          {post.category}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {post.description}
      </p>
      <article className="prose dark:prose-invert max-w-none">
        {post.content}
      </article>
      <div className="flex gap-2 mt-6">
        <Link to={`/edit/${post.id}`} className="px-3 py-2 rounded-xl border">
          Edit
        </Link>
        <button
          onClick={() => {
            deletePost(post.id);
            navigate("/");
          }}
          className="px-3 py-2 rounded-xl border border-red-500 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
