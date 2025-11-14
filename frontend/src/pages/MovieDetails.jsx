import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import AddReviewModal from "../components/AddReviewModal";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [showModal, setShowModal] = useState(false);

  const { theme } = useTheme();

  const fetchDetails = async () => {
    try {
      const movieRes = await api.get(`/movies/${id}`);
      setMovie(movieRes.data);

      const reviewRes = await api.get(`/reviews/movie/${id}`);
      setReviews(reviewRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!movie)
    return (
      <div
        className={`min-h-screen flex justify-center items-center text-xl ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        Loading Movie Details...
      </div>
    );

  return (
    <div
      className={`min-h-screen p-10 transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Movie Poster */}
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={movie.poster}
          alt={movie.title}
          className="rounded-xl shadow-xl w-full"
        />

        {/* Movie Info */}
        <div>
          <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

          <p className="text-yellow-400 text-lg font-semibold mb-3">
            ⭐ {movie.rating} / 10
          </p>

          <p className="opacity-90 leading-relaxed mb-6">
            {movie.description}
          </p>

          <h3 className="text-2xl font-bold mb-4">Add Review</h3>

          {/* ADD REVIEW BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Add Review
          </motion.button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h3 className="text-3xl font-bold mb-6">Reviews</h3>

        {reviews.length === 0 ? (
          <p className="opacity-70 text-lg">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-5 mb-4 border rounded-xl shadow-sm bg-white 
              dark:bg-gray-800 dark:border-gray-700"
            >
              <h4 className="font-bold text-yellow-400">⭐ {r.rating} / 5</h4>
              <p className="mt-2">{r.comment}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* REVIEW MODAL */}
      {showModal && (
        <AddReviewModal
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          onSubmit={async () => {
            try {
              await api.post(`/reviews`, {
                movie_id: id,
                rating,
                comment,
              });

              setRating("");
              setComment("");
              setShowModal(false);
              fetchDetails(); // refresh reviews
            } catch (err) {
              console.error(err);
            }
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
