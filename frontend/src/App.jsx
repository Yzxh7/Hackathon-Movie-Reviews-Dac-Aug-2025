import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MyReviews from "./pages/MyReviews";
import SharedReviews from "./pages/SharedReviews";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      
      <Routes>

  {/* ⭐ PUBLIC ROUTES */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* ⭐ PROTECTED ROUTES */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Movies />
      </ProtectedRoute>
    }
  />

  <Route
    path="/movie/:id"
    element={
      <ProtectedRoute>
        <MovieDetails />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-reviews"
    element={
      <ProtectedRoute>
        <MyReviews />
      </ProtectedRoute>
    }
  />

  <Route
    path="/shared"
    element={
      <ProtectedRoute>
        <SharedReviews />
      </ProtectedRoute>
    }
  />

</Routes>

    </BrowserRouter>
  );
}

export default App;
