import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies").then((res) => setMovies(res.data));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">All Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>

            <p className="text-gray-600 h-16 overflow-hidden">
              {movie.description}
            </p>

            <Link 
              to={`/movie/${movie.id}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
