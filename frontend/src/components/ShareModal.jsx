import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function ShareModal({ review, onClose, onShare }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`w-full max-w-md p-6 rounded-xl border shadow-lg
          ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
        `}
      >
        <h3 className="text-xl font-bold mb-3">Share Review</h3>

        <p className="text-sm mb-3">
          Share your review for <strong>{review.movie_title}</strong>.
        </p>

        <input
          type="email"
          placeholder="Recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded border mb-4 dark:bg-gray-700 dark:border-gray-600"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onShare(email)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}
