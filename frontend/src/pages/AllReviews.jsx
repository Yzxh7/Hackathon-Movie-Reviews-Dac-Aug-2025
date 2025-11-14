import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AllReviews() {
  const { theme } = useTheme();
  const [allReviews, setAllReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchAllReviews = async () => {
    try {
      const res = await api.get("/reviews/all"); // backend: GET /reviews/all
      setAllReviews(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to load all reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  // 🔍 search filter
  useEffect(() => {
    let updated = [...allReviews];

    if (search.trim() !== "") {
      updated = updated.filter((r) =>
        r.movie_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🔼 sort filter
    if (sort === "newest") {
      updated.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort === "oldest") {
      updated.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sort === "rating-high") {
      updated.sort((a, b) => b.rating - a.rating);
    } else if (sort === "rating-low") {
      updated.sort((a, b) => a.rating - b.rating);
    }

    setFiltered(updated);
  }, [search, sort, allReviews]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Reviews</h1>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by movie title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`p-3 rounded border w-full md:w-1/2
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }
            `}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`p-3 rounded border w-full md:w-48
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }
            `}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating-high">Rating: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
          </select>
        </div>

        {/* Reviews List */}
        {loading ? (
          <p className="text-gray-400">Loading all reviews…</p>
        ) : filtered.length === 0 ? (
          <p className="opacity-70 text-lg">No reviews found.</p>
        ) : (
          <div className="grid gap-4">
            {filtered.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-xl shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
              >
                <div className="flex justify-between">
                  <div className="w-full">
                    <h2 className="text-lg font-bold">{r.movie_title}</h2>

                    <p className="text-yellow-400 font-semibold">
                      ⭐ {r.rating} / 5
                    </p>

                    <p className="mt-2 opacity-90">{r.comment}</p>

                    <p className="text-xs mt-3 opacity-60">
                      Reviewed by: {r.reviewer_email}
                    </p>

                    <p className="text-xs opacity-60">
                      On: {new Date(r.created_at).toLocaleString()}
                    </p>

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
