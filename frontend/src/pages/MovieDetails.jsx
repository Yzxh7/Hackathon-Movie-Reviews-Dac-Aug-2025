import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const fetchDetails = async () => {
    const movieRes = await api.get(`/movies/${id}`);
    setMovie(movieRes.data);

    const reviewRes = await api.get(`/reviews/movie/${id}`);
    setReviews(reviewRes.data);
  };

  const addReview = async (e) => {
    e.preventDefault();
    await api.post(`/reviews`, { movie_id: id, rating, comment });
    setRating("");
    setComment("");
    fetchDetails(); // refresh reviews
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>

      <hr />

      <h3>Add Review</h3>
      <form onSubmit={addReview}>
        <input 
          type="number" 
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        /><br/>

        <textarea 
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        /><br/>

        <button type="submit">Submit Review</button>
      </form>

      <hr />

      <h3>Reviews</h3>

      {reviews.map((r) => (
        <div key={r.id}>
          <strong>{r.rating} / 5</strong>
          <p>{r.comment}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
