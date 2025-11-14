import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { theme } = useTheme();
  const { login } = useAuth();   // ✅ hooks must be here, not inside functions

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token using AuthContext
      login(res.data.token);

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`flex justify-center items-center min-h-[80vh] transition-all duration-300
        ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}
      `}
    >
      <motion.form
        onSubmit={handleLogin}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`shadow-2xl rounded-xl p-8 w-96 border
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white"
          }
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className={`w-full border p-3 rounded mb-4 transition-all duration-200
            focus:ring-2 focus:ring-blue-500
            ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : ""
            }
          `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className={`w-full border p-3 rounded mb-6 transition-all duration-200
            focus:ring-2 focus:ring-blue-500
            ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : ""
            }
          `}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-all"
        >
          Login
        </motion.button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </motion.form>
    </motion.div>
  );
}
