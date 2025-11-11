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

  const addPost = (data) => {
    const newPost = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...data,
    };

    setPosts((prev) => [newPost, ...prev]);
    toast.success("Post created");
    return newPost.id; 
  };

  const updatePost = (id, data) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    toast.success("Post updated");
  };

  const deletePost = (id) => {
  setPosts(prev => prev.filter(p => p.id !== id));
  setLikes(prev => {
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
