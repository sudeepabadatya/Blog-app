import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import { storage } from "../utils/storage";
import { Sun, Moon, PlusCircle } from "lucide-react";
import { useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const { query, setQuery, categoryFilter, setCategoryFilter } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = storage.get(storage.keys.THEME, "light");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    storage.set(storage.keys.THEME, isDark ? "dark" : "light");
  };

  return (
   <nav className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
  <div className="w-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight">
          InfiniteFeed
        </Link>

        <div className="ml-auto flex items-center gap-3 w-full sm:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 sm:w-64 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          >
            {["All", "Sports", "Music", "Art", "Tech", "Travel", "Food"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Sun className="hidden dark:block" size={18} />
            <Moon className="dark:hidden" size={18} />
          </button>

          <NavLink
            to="/create"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            <PlusCircle size={18} /> Create
          </NavLink>

          {!isAuthenticated ? (
            <NavLink to="/signin" className="px-3 py-2 rounded-xl border">
              Sign in
            </NavLink>
          ) : (
            <button
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="px-3 py-2 rounded-xl border"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
