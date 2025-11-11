import { useContext } from "react";
import { PostsContext } from "../context/PostsContextObject";

export const usePosts = () => useContext(PostsContext);
