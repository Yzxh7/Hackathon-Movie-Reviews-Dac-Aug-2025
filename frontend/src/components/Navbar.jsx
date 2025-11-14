import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();  
  return (
    <nav
      className={`px-6 py-4 shadow-md transition-all duration-300
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}
      `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Left: Branding */}
        <div
          className="text-2xl font-bold flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span>🎬</span>
          <span>MovieReview</span>
        </div>

       {/* RIGHT MENU */}
<div className="flex items-center space-x-6">

  {token ? (
    <>
      {/* Visible ONLY after login */}
      <Link to="/" className="hover:text-yellow-300 transition">
        Movies
      </Link>

      <Link to="/my-reviews" className="hover:text-yellow-300 transition">
        My Reviews
      </Link>

      <Link to="/shared" className="hover:text-yellow-300 transition">
        Shared
      </Link>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      {/* Visible ONLY when logged OUT */}
      <Link to="/login" className="hover:text-yellow-300 transition">
        Login
      </Link>

      <Link to="/signup" className="hover:text-yellow-300 transition">
        Signup
      </Link>
    </>
  )}

  {/* theme toggle */}
  <motion.button
    whileTap={{ scale: 0.85 }}
    onClick={toggleTheme}
    className={`ml-4 px-3 py-2 rounded-full transition border
        ${theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700 border-gray-600"
          : "bg-gray-200 hover:bg-gray-300 border-gray-400"
        }
      `}
  >
    {theme === "light" ? "🌙" : "☀️"}
  </motion.button>

</div>

      </div>
    </nav>
  );
}
