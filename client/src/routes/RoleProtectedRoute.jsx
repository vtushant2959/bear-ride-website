import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ children, allowedRole }) {
  const { user, activeRole, loading } = useAuth();

  // Wait for localStorage bootstrap before making any access decision.
  // Without this, activeRole is null for a brief instant and would
  // incorrectly redirect away from the dashboard.
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  const adminBypass = localStorage.getItem("bearride_admin_bypass") === "true";
  if (allowedRole === "ADMIN" && (user.role === "ADMIN" || adminBypass)) return children;

  // activeRole tells us which dashboard the user is currently operating in.
  // Fall back to user.role if activeRole hasn't been resolved yet.
  const effectiveRole = activeRole || user.role;

  if (effectiveRole !== allowedRole) {
    if (allowedRole === "ADMIN") return <Navigate to="/admin/access" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
