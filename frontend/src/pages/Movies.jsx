import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import EditReviewModal from "../components/EditReviewModal";
import ShareModal from "../components/ShareModal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function MyReviews() {
  const { theme } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [editing, setEditing] = useState(null); // review object or null
  const [sharing, setSharing] = useState(null); // review object or null
  const [confirmDelete, setConfirmDelete] = useState(null); // review object or null

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews/my"); // backend: GET /reviews/my
      setReviews(res.data);
    } catch (err) {
      console.error("Fetch my reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`); // backend: DELETE /reviews/:id
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Delete review:", err);
      alert("Delete failed");
    }
  };

  const handleEditSave = async (id, updated) => {
    try {
      const res = await api.put(`/reviews/${id}`, updated); // backend: PUT /reviews/:id
      setReviews((prev) => prev.map((r) => (r.id === id ? res.data : r)));
      setEditing(null);
    } catch (err) {
      console.error("Edit review:", err);
      alert("Update failed");
    }
  };

  const handleShare = async (reviewId, toEmail) => {
    try {
      await api.post("/reviews/share", { review_id: reviewId, to_email: toEmail }); // backend: POST /reviews/share
      alert("Shared successfully");
      setSharing(null);
    } catch (err) {
      console.error("Share review:", err);
      alert("Share failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen p-8 transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

        {loading ? (
          <p className="text-gray-400">Loading your reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">You haven't added any reviews yet.</p>
        ) : (
          <div className="grid gap-4">
            {reviews.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{r.movie_title || "Untitled"}</h3>
                    <p className="text-yellow-400 font-semibold">⭐ {r.rating} / 5</p>
                    <p className="mt-2 text-sm opacity-90">{r.comment}</p>
                    <p className="mt-2 text-xs text-gray-500">Posted: {new Date(r.created_at).toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => setEditing(r)}
                      className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setConfirmDelete(r)}
                      className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setSharing(r)}
                      className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EDIT MODAL */}
        {editing && (
          <EditReviewModal
            review={editing}
            onClose={() => setEditing(null)}
            onSave={(updated) => handleEditSave(editing.id, updated)}
          />
        )}

        {/* SHARE MODAL */}
        {sharing && (
          <ShareModal
            review={sharing}
            onClose={() => setSharing(null)}
            onShare={(email) => handleShare(sharing.id, email)}
          />
        )}

        {/* CONFIRM DELETE */}
        {confirmDelete && (
          <ConfirmDialog
            title="Delete review"
            description="Are you sure you want to delete this review? This action cannot be undone."
            onConfirm={() => handleDelete(confirmDelete.id)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </div>
    </motion.div>
  );
}
