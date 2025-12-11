import { useEffect, useMemo, useState } from "react";
import { PostsContext } from "./PostsContextObject";
import { storage } from "../utils/storage";
import { toast } from "react-hot-toast";

export default function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const p = storage.get(storage.keys.POSTS, []);
    const l = storage.get(storage.keys.LIKES, {});
    setPosts(p);
    setLikes(l);
  }, []);

  useEffect(() => {
    storage.set(storage.keys.POSTS, posts);
  }, [posts]);

  useEffect(() => {
    storage.set(storage.keys.LIKES, likes);
  }, [likes]);

  const getCurrentUser = () => {
    return storage.get(storage.keys.AUTH, null);
  };

  const addPost = (data) => {
    const currentUser = getCurrentUser();
    const newPost = {
      id: crypto?.randomUUID?.() ?? Date.now().toString(),
      createdAt: Date.now(),
      authorId: data.authorId ?? currentUser?.id ?? null,
      authorName:
        data.authorName ?? currentUser?.name ?? currentUser?.email ?? "Unknown",
      authorEmail: data.authorEmail ?? currentUser?.email ?? null,
      ...data,
    };

    setPosts((prev) => [newPost, ...prev]);
    toast.success("Post created");
    return newPost.id;
  };

  const updatePost = (id, data) => {
    const currentUser = getCurrentUser();
    const existing = posts.find((p) => p.id === id);
    if (!existing) {
      toast.error("Post not found");
      return null;
    }

    const isOwner =
      (currentUser?.id &&
        existing.authorId &&
        currentUser.id === existing.authorId) ||
      (currentUser?.email &&
        existing.authorEmail &&
        currentUser.email === existing.authorEmail);

    if (!isOwner) {
      toast.error("Not allowed to update this post");
      return null;
    }

    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    toast.success("Post updated");
    return id;
  };

  const deletePost = (id) => {
    const currentUser = getCurrentUser();
    const existing = posts.find((p) => p.id === id);
    if (!existing) {
      toast.error("Post not found");
      return;
    }

    const isOwner =
      (currentUser?.id &&
        existing.authorId &&
        currentUser.id === existing.authorId) ||
      (currentUser?.email &&
        existing.authorEmail &&
        currentUser.email === existing.authorEmail);

    if (!isOwner) {
      toast.error("Not allowed to delete this post");
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
    setLikes((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    toast.error("Post deleted");
  };

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = useMemo(() => {
    let list = [...posts];

    if (categoryFilter !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [posts, query, categoryFilter]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        filtered,
        addPost,
        updatePost,
        deletePost,
        toggleLike,
        likes,
        query,
        setQuery,
        categoryFilter,
        setCategoryFilter,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
