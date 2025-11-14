import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function EditReviewModal({ review, onClose, onSave }) {
  const { theme } = useTheme();
  const [rating, setRating] = useState(String(review.rating || ""));
  const [comment, setComment] = useState(review.comment || "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`w-full max-w-md p-6 rounded-xl border shadow-lg
          ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
        `}
      >
        <h3 className="text-xl font-bold mb-3">Edit Review</h3>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-3 rounded border mb-3 dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded border h-28 mb-4 dark:bg-gray-700 dark:border-gray-600"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave({ rating: Number(rating), comment })}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
