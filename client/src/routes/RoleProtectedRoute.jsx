import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function RoleProtectedRoute({
  children,
  allowedRole,
}) {

  const {
    user,
  } = useAuth();

  if (
    user?.role !==
    allowedRole
  ) {

    return (
      <Navigate
        to="/"
      />
    );
  }

  return children;
}

export default RoleProtectedRoute;