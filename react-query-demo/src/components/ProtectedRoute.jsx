import { Navigate } from "react-router-dom";

const isAuthenticated = false;

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
