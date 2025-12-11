import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../utils/zodSchemas";
import { usePosts } from "../hooks/usePosts";

import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const { posts, updatePost } = usePosts();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    values: post ?? {
      title: "",
      description: "",
      content: "",
      category: "Sports",
    },
  });
  const onSubmit = (data) => {
    updatePost(id, data);
    navigate(`/post/${id}`);
  };

  if (!post)
    return <div className="max-w-2xl mx-auto p-4">Post not found.</div>;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        <input
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <textarea
          rows={8}
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
        <select
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          {...register("category")}
        >
          {["Sports", "Music", "Art", "Tech", "Travel", "Food"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white">
          Save
        </button>
      </form>
    </div>
  );
}
