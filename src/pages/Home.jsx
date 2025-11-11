import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";

export default function Home() {
  const { filtered } = usePosts();

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6">
      {filtered.length === 0 ? (
        <div className="border border-gray-300 dark:border-gray-700 rounded-2xl p-10 mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            No posts yet
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Click <span className="font-bold text-purple-500">+ Create</span> to write your first blog!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
