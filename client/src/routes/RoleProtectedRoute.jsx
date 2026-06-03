import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  /* Allow admin bypass set from AdminAccess page */
  const adminBypass = localStorage.getItem("bearride_admin_bypass") === "true";

  if (allowedRole === "ADMIN" && (user.role === "ADMIN" || adminBypass)) {
    return children;
  }

  if (user.role !== allowedRole) {
    /* If trying to reach admin but not admin → send to access page */
    if (allowedRole === "ADMIN") return <Navigate to="/admin/access" />;
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;
