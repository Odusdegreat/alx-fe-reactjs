import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an authentication hook

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
