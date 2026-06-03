import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function ProtectedRoutes({
  children,
}) {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-yellow-400 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
}

export default ProtectedRoutes;