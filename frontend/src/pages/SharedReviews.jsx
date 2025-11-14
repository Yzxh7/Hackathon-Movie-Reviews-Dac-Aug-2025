import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SharedReviews() {
  const { theme } = useTheme();
  const [shared, setShared] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShared = async () => {
    try {
      const res = await api.get("/reviews/shared"); 
      // backend → GET /reviews/shared
      setShared(res.data);
    } catch (err) {
      console.error("Failed loading shared reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShared();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shared With Me</h1>

        {loading ? (
          <p className="text-gray-400">Loading shared reviews…</p>
        ) : shared.length === 0 ? (
          <p className="opacity-70 text-lg">
            No reviews have been shared with you yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {shared.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-xl shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
              >
                <div className="flex justify-between">
                  
                  {/* Left: Review Details */}
                  <div className="w-full">
                    <h2 className="text-lg font-bold">{r.movie_title}</h2>

                    <p className="text-yellow-400 font-semibold">
                      ⭐ {r.rating} / 5
                    </p>

                    <p className="mt-2 opacity-90">{r.comment}</p>

                    <p className="text-xs mt-3 opacity-60">
                      Shared by: {r.shared_by_email}
                    </p>

                    <p className="text-xs opacity-60">
                      On: {new Date(r.shared_at).toLocaleString()}
                    </p>

                    {/* View Movie button */}
                    <Link
                      to={`/movie/${r.movie_id}`}
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      View Movie
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
