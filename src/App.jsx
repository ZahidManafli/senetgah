import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import Museuims from "./pages/Museuims";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./common/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Profile from "./pages/Profile";
import VoteArts from "./pages/VoteArts";
import GalleryPicker from "./components/GalleryPicker";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="museums" element={<Museuims />} />
        <Route path="profile" element={<Profile />} />
        <Route path="vote-arts" element={<VoteArts />} />
        <Route path="gallery" element={<GalleryPicker />} />
      </Route>

      {/* Public Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;