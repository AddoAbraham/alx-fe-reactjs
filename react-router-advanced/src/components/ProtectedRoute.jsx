import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = false; // toggle this for testing
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
