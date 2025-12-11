import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";

export default function CategoryPage() {
  const { name } = useParams();
  const { posts } = usePosts();
  const list = posts.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Category: {name}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}