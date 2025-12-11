import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import SignIn from "./pages/SignIn";

import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { seedIfEmpty } from "./utils/storage";

export default function App() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>}/>
        <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
