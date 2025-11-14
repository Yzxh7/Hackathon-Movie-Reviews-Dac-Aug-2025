import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ConfirmDialog({ title, description, onConfirm, onCancel }) {
  const { theme } = useTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18 }}
        className={`w-full max-w-sm p-5 rounded-xl border shadow-lg
          ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
        `}
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}
