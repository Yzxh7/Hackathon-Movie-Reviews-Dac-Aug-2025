import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews/my").then(res => setReviews(res.data));
  }, []);

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.map(r => (
        <div key={r.id}>
          <h4>{r.movie_title}</h4>
          <strong>{r.rating}</strong>
          <p>{r.comment}</p>
          <button>Edit</button>
          <button>Delete</button>
          <button>Share</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
