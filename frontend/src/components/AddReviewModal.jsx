import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function AddReviewModal({
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
  onClose,
}) {
  const { theme } = useTheme();

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`p-6 rounded-xl shadow-lg w-full max-w-md border
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }
        `}
      >
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>

        {/* Rating */}
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1–5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className={`w-full p-3 rounded border mb-4
            ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300"
            }
          `}
        />

        {/* Comment */}
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`w-full p-3 rounded border h-28 mb-4
            ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300"
            }
          `}
        ></textarea>

        <div className="flex justify-between mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>

        </div>
      </motion.div>
    </div>
  );
}
