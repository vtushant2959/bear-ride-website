import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ children, allowedRole }) {
  const { user, activeRole } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const adminBypass = localStorage.getItem("bearride_admin_bypass") === "true";
  if (allowedRole === "ADMIN" && (user.role === "ADMIN" || adminBypass)) return children;

  // Check against the active role (what dashboard they're currently in)
  if (activeRole !== allowedRole) {
    if (allowedRole === "ADMIN") return <Navigate to="/admin/access" />;
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;
