import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700 bg-gray-800 hover:scale-[1.02] transition-transform duration-200">

      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 text-white">
        <h3 className="text-xl font-bold">{movie.title}</h3>
        <p className="text-yellow-400 text-sm mt-1">
          ⭐ {movie.rating}/10
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="mt-4 inline-block bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-white text-sm"
        >
          View Details
        </Link>
      </div>

    </div>
  );
}
