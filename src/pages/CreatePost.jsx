import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../utils/zodSchemas";
import { usePosts } from "../hooks/usePosts";

import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { category: "Sports" },
  });

  const onSubmit = (data) => {
    const id = addPost(data);
    navigate(`/post/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        <input
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          placeholder="Short description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <textarea
          rows={8}
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          placeholder="Write your content..."
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
          Create
        </button>
      </form>
    </div>
  );
}
