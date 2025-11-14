import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function SharedReviews() {
  const [shared, setShared] = useState([]);

  useEffect(() => {
    api.get("/reviews/shared-with-me").then(res => setShared(res.data));
  }, []);

  return (
    <div>
      <h2>Reviews Shared With Me</h2>
      {shared.map((r) => (
        <div key={r.id}>
          <h4>{r.movie_title}</h4>
          <strong>{r.rating}</strong>
          <p>{r.comment}</p>
          <p>Shared By: {r.shared_by_name}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
